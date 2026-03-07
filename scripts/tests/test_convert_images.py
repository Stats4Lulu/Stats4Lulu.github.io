"""Tests for convert_images."""
import sys
import os
import unittest
import pandas as pd

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from converter import convert_images


class TestConvertImages(unittest.TestCase):

    def test_basic_image(self):
        row = pd.Series({"image_1": "photo.jpg", "media": []})
        media = convert_images(row, ["image_1"])
        self.assertEqual(len(media), 1)
        self.assertEqual(media[0]["url"], "photo.jpg")
        self.assertEqual(media[0]["title"], "photo")
        self.assertEqual(media[0]["type"], "image")
        self.assertFalse(media[0]["sensitive"])

    def test_date_prefix_reformatted(self):
        row = pd.Series({"image_1": "2025-12-08 Sketch 1.jpg", "media": []})
        media = convert_images(row, ["image_1"])
        self.assertEqual(media[0]["url"], "08_12_2025_sketch_1.jpg")
        self.assertEqual(media[0]["title"], "Sketch 1")

    def test_sensitive_image(self):
        row = pd.Series({"image_1": "photo.jpg?sensitive=T", "media": []})
        media = convert_images(row, ["image_1"])
        self.assertTrue(media[0]["sensitive"])
        self.assertNotIn("?sensitive=T", media[0]["url"])

    def test_nan_skipped(self):
        row = pd.Series({"image_1": float("nan"), "media": []})
        media = convert_images(row, ["image_1"])
        self.assertEqual(media, [])

    def test_empty_string_skipped(self):
        row = pd.Series({"image_1": "  ", "media": []})
        media = convert_images(row, ["image_1"])
        self.assertEqual(media, [])

    def test_spaces_become_underscores(self):
        row = pd.Series({"image_1": "My Photo Name.png", "media": []})
        media = convert_images(row, ["image_1"])
        self.assertEqual(media[0]["url"], "my_photo_name.png")

    def test_preserves_existing_media(self):
        existing = [{"type": "youtube", "title": "Vid", "link": "https://yt.com"}]
        row = pd.Series({"image_1": "img.jpg", "media": existing})
        media = convert_images(row, ["image_1"])
        self.assertEqual(len(media), 2)
        self.assertEqual(media[0]["type"], "youtube")
        self.assertEqual(media[1]["type"], "image")


if __name__ == "__main__":
    unittest.main()
