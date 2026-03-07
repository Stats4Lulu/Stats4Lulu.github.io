"""Tests for convert_media."""
import sys
import os
import unittest
import pandas as pd

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from converter import convert_media


def _row(data: dict) -> pd.Series:
    return pd.Series(data)


class TestConvertMedia(unittest.TestCase):

    def test_basic_link(self):
        row = _row({"link_1": "https://example.com", "link_1_text": "Example"})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertEqual(len(links), 1)
        self.assertEqual(links[0], {"title": "Example", "link": "https://example.com", "sensitive": False})

    def test_sensitive_ampersand(self):
        row = _row({"link_1": "https://example.com?foo=1&sensitive=T", "link_1_text": "Ex"})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertTrue(links[0]["sensitive"])
        self.assertNotIn("&sensitive=T", links[0]["link"])

    def test_sensitive_question_mark(self):
        row = _row({"link_1": "https://example.com?sensitive=T", "link_1_text": "Ex"})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertTrue(links[0]["sensitive"])
        self.assertNotIn("?sensitive=T", links[0]["link"])

    def test_youtube_detected(self):
        row = _row({"link_1": "https://youtube.com/watch?v=abc", "link_1_text": "Video"})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertEqual(len(media), 1)
        self.assertEqual(media[0]["type"], "youtube")
        self.assertEqual(media[0]["title"], "Video")

    def test_youtu_be_detected(self):
        row = _row({"link_1": "https://youtu.be/abc", "link_1_text": ""})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertEqual(media[0]["type"], "youtube")
        self.assertEqual(media[0]["title"], "YouTube")

    def test_twitter_detected(self):
        row = _row({"link_1": "https://x.com/user/status/123", "link_1_text": "Tweet"})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertEqual(media[0]["type"], "twitter")

    def test_old_twitter_detected(self):
        row = _row({"link_1": "https://twitter.com/user/status/123", "link_1_text": ""})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertEqual(media[0]["type"], "twitter")
        self.assertEqual(media[0]["title"], "Twitter")

    def test_nan_url_skipped(self):
        row = _row({"link_1": float("nan"), "link_1_text": "Oops"})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertEqual(links, [])
        self.assertEqual(media, [])

    def test_no_text_no_link_entry(self):
        row = _row({"link_1": "https://youtube.com/watch?v=abc", "link_1_text": ""})
        links, media = convert_media(row, ["link_1"], ["link_1_text"])
        self.assertEqual(links, [])
        self.assertEqual(len(media), 1)

    def test_multiple_links(self):
        row = _row({
            "link_1": "https://a.com", "link_1_text": "A",
            "link_2": "https://b.com", "link_2_text": "B",
        })
        links, media = convert_media(row, ["link_1", "link_2"], ["link_1_text", "link_2_text"])
        self.assertEqual(len(links), 2)
        self.assertEqual(links[0]["title"], "A")
        self.assertEqual(links[1]["title"], "B")


if __name__ == "__main__":
    unittest.main()
