#!/usr/bin/env python3
"""Renames images: '2025-12-08 Sketch 1.jpg' -> '08_12_2025_sketch_1.jpg'"""

import re
from pathlib import Path

ext = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".avif", ".svg"}
dates = re.compile(r"^(\d{4})-(\d{2})-(\d{2})\s+(.+)$")


def rename_images(directory="images"):
    """Renames images: '2025-12-08 Sketch 1.jpg' -> '08_12_2025_sketch_1.jpg'"""
    folder = Path(directory)
    if not folder.is_dir():
        print(f"Error: '{directory}' is not a valid directory")
        return

    renamed = 0
    skipped = 0

    for f in folder.iterdir():
        if not f.is_file() or f.suffix.lower() not in ext:
            continue

        m = dates.match(f.name)
        if not m:
            print(f"Skipped (no date prefix): {f.name}")
            skipped += 1
            continue

        year, month, day, rest = m.groups()
        new_name = f"{day}_{month}_{year}_{rest.replace(' ', '_').lower()}"

        try:
            f.rename(f.parent / new_name)
            print(f"Renamed: {f.name} -> {new_name}")
            renamed += 1
        except Exception as e:
            print(f"Error renaming {f.name}: {e}")


if __name__ == "__main__":
    import sys
    rename_images(sys.argv[1] if len(sys.argv) > 1 else "images")