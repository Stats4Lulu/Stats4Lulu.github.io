#!/usr/bin/env python3

import argparse
import os
import re
import pandas as pd
from typing import Any, Dict, List

def convert_media(row: pd.Series, link_cols: List[str], text_cols: List[str]):
    """Rewrites links and YouTube urls"""
    links, media = [], []
    for lcol, tcol in zip(link_cols, text_cols):
        url = row.get(lcol)
        text = str(row.get(tcol)).strip() if pd.notna(row.get(tcol)) else ""
        if pd.notna(url):
            if text:
                links.append({"title": text, "link": url})
            elif "youtube.com" in url:
                media.append({"title": "YouTube", "link": url, "type": "video"})
    return links, media


def convert_images(row: pd.Series, image_cols: List[str]):
    "Convert image columns into media items"
    media = list(row.get("media", []))
    for col in image_cols:
        val = row.get(col)
        if pd.notna(val) and str(val).strip():
            # clean up file name, so no more weird newlines at the end of image
            clean = str(val).replace("\n", "").replace("\r", "").strip()

            fname = re.sub(r"^\d{4}-\d{2}-\d{2}\s+", "", clean)
            url = fname.replace(" ", "_").lower().rstrip()
            media.append({"type": "image", "title": os.path.splitext(fname)[0], "url": url})
    return media


def make_event(row: pd.Series) -> Dict[str, Any]:
    return {
        "title": row.get("event_title"),
        "subtitle": row.get("event_name"),
        "content": row.get("event_description"),
        "media": row["media"] if isinstance(row.get("media"), list) else [],
    }


def main() -> None:
    "Main."
    parser = argparse.ArgumentParser()
    parser.add_argument("input_csv")
    parser.add_argument("output_json")
    args = parser.parse_args()

    df = pd.read_csv(args.input_csv)

    if "Status" in df.columns:
        df = df[df["Status"] == "PUBLISH"]

    df.columns = df.columns.str.lower().str.replace(" ", "_")

    link_cols = [f"link_{i}" for i in range(1, 6)]
    text_cols = [f"link_{i}_text" for i in range(1, 6)]
    image_cols = [f"image_{i}" for i in range(1, 6)]

    df[["links", "media"]] = df.apply(lambda cols: pd.Series(convert_media(cols, link_cols, text_cols)), axis=1)

    df["media"] = df.apply(lambda cols: convert_images(cols, image_cols), axis=1)

    df["events"] = df.apply(make_event, axis=1)

    drop_cols = {"month", "original_event_description","event_name", "event_description",
        "image1_url", "donations_agg", "letters_agg", "notes", "event_title",
         "media", *link_cols, *text_cols, *image_cols,}
    
    df.drop(columns=drop_cols, inplace=True)

    df = df.rename(columns={"item": "id"})

    df.to_json(args.output_json, orient="records", indent=2)


if __name__ == "__main__":
    main()
