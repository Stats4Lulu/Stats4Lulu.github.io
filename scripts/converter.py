#!/usr/bin/env python3

import argparse
import os
import re
import pandas as pd
from typing import Any, Dict, List

def convert_media(row: pd.Series, link_cols: List[str], text_cols: List[str]) -> tuple:
    """Rewrites links and YouTube/Twitter urls"""
    links, media = [], []
    
    for lcol, tcol in zip(link_cols, text_cols):
        url = row.get(lcol)
        text = str(row.get(tcol)).strip() if pd.notna(row.get(tcol)) else ""
        
        if pd.notna(url):
            sensitive = ("&sensitive=T" in url) or ("?sensitive=T" in url)
            clean_url = url.replace("&sensitive=T", "").replace("?sensitive=T", "")
            
            if text:
                links.append({"title": text, "link": clean_url, "sensitive": sensitive})
            
            # check for media types regardless of whether it was added as a text link
            if "youtube.com" in url or "youtu.be" in url:
                media.append({"title": text if text else "YouTube", 
                "link": clean_url, "type": "youtube", "sensitive": sensitive})
            elif "x.com" in url or "twitter.com" in url:
                media.append({"title": text if text else "Twitter", "link": clean_url, 
                "type": "twitter", "sensitive": sensitive})
    
    return links, media

def parse_witnesses(text: str) -> tuple:
    """Parses structured witness blocks from event descriptions.
    
    Expected format per witness (separated by blank lines (wonky but works)):
        Name (/ title):
        Connection to the case: [...]
        Reason for testifying: [...]
        Cross examination: [...]
    """
    if not isinstance(text, str) or "Connection to the Case:" not in text:
        return text, []

    witnesses, remaining = [], []

    for block in re.split(r"\n\n+", text.replace("\r\n", "\n")):

        # non-witness blocks
        if "Connection to the Case:" not in block:
            remaining.append(block)
            continue

        lines = block.strip().splitlines()
        name = lines[0].rstrip(":")

        # Extract title from parentheses... e.g. "John Smith (NYPD)" -> "NYPD"
        title_match = re.search(r"\((.+?)\)$", name)
        if title_match:
            title = title_match.group(1)
            name = name[:title_match.start()].strip()
        else:
            title = ""

        # Parse key:value lines into a dict
        fields = {}
        for line in lines[1:]:
            if ":" in line:
                key, _, value = line.partition(":")
                fields[key.strip()] = value.strip()
                
        witnesses.append({
            "name": name,
            "title": title,
            "connection": fields.get("Connection to the Case", ""),
            "testimony": fields.get("Reason for Testifying", ""),
            "crossExamination": fields.get("Cross Examination", ""),
        })

    if not witnesses:
        return text, []

    return "\n\n".join(remaining).strip(), witnesses


def convert_images(row: pd.Series, image_cols: List[str]) -> list:
    """Convert image columns into media items"""
    media = list(row.get("media", []))

    for col in image_cols:
        val = row.get(col)

        if not (pd.notna(val) and str(val).strip()):
            continue

        clean = str(val).replace("\n", "").replace("\r", "").strip()
        sensitive = "?sensitive=T" in clean
        clean = clean.replace("?sensitive=T", "")

        # "2025-12-08 Sketch 1.jpg" -> url: "08_12_2025_sketch_1.jpg", title: "Sketch 1"
        date_match = re.match(r"^(\d{4})-(\d{2})-(\d{2})\s+(.+)$", clean)

        if date_match:
            year, month, day, rest = date_match.groups()
            url = f"{day}_{month}_{year}_{rest.replace(' ', '_').lower()}"
            title = os.path.splitext(rest)[0]
        else:
            url = clean.replace(" ", "_").lower()
            title = os.path.splitext(clean)[0]

        media.append({"type": "image", "title": title, "url": url, "sensitive": sensitive})
    
    return media

def make_event(row: pd.Series) -> Dict[str, Any]:
    """Make an event from a row"""
    original_content = row.get("event_description")
    content, witnesses = parse_witnesses(original_content)
    
    event = {
        "title": row.get("event_title"),
        "subtitle": row.get("event_name"),
        "content": content,
        "media": row["media"] if isinstance(row.get("media"), list) else [],
    }
    
    if witnesses:
        event["witnesses"] = witnesses
        
    return event

def find_cols(cols: pd.Index, pattern: str) -> List[str]:
    """Find columns matching a pattern"""
    return sorted([c for c in cols if re.match(pattern, c)], key=lambda c: int(c.split("_")[1]))

def main() -> None:
    """Main!"""
    parser = argparse.ArgumentParser()
    parser.add_argument("input_csv")
    parser.add_argument("output_json")
    args = parser.parse_args()
    
    df = pd.read_csv(args.input_csv)
    if "Status" in df.columns:
        df = df[df["Status"] == "PUBLISH"]
    
    df.columns = df.columns.str.lower().str.replace(" ", "_")
    
    link_cols = find_cols(df.columns, r"link_\d+$")
    text_cols = find_cols(df.columns, r"link_\d+_text$")
    image_cols = find_cols(df.columns, r"image_\d+$")
    
    df[["links", "media"]] = df.apply(lambda cols: pd.Series(convert_media(cols, link_cols, text_cols)), axis=1)
    df["media"] = df.apply(lambda cols: convert_images(cols, image_cols), axis=1)
    df["events"] = df.apply(make_event, axis=1)
    
    drop_cols = {"month", "original_event_description", "event_name", "event_description",
                 "image1_url", "donations_agg", "letters_agg", "notes", "event_title",
                 "media", *link_cols, *text_cols, *image_cols}
    df.drop(columns=drop_cols, inplace=True)
    df = df.rename(columns={"item": "id"})
    
    df.to_json(args.output_json, orient="records", indent=2)

if __name__ == "__main__":
    main()