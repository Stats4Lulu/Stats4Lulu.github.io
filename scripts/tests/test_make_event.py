"""Tests for make_event."""
import sys
import os
import unittest
import pandas as pd

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from converter import make_event


class TestMakeEvent(unittest.TestCase):

    def test_basic_event(self):
        row = pd.Series({
            "event_title": "Day 1",
            "event_name": "Opening",
            "event_description": "The trial began.",
            "media": [{"type": "image", "url": "pic.jpg", "title": "Pic", "sensitive": False}],
        })
        event = make_event(row)
        self.assertEqual(event["title"], "Day 1")
        self.assertEqual(event["subtitle"], "Opening")
        self.assertEqual(event["content"], "The trial began.")
        self.assertEqual(len(event["media"]), 1)
        self.assertNotIn("witnesses", event)

    def test_event_with_witnesses(self):
        row = pd.Series({
            "event_title": "Day 2",
            "event_name": "Hearing",
            "event_description": (
                "Description.\n\n"
                "John (NYPD):\n"
                "Connection to the Case: Officer\n"
                "Reason for Testifying: Report\n"
                "Cross Examination: Questioned"
            ),
            "media": [],
        })
        event = make_event(row)
        self.assertIn("witnesses", event)
        self.assertEqual(len(event["witnesses"]), 1)
        self.assertEqual(event["content"], "Description.")

    def test_no_media_gives_empty_list(self):
        row = pd.Series({
            "event_title": "Day 3",
            "event_name": "Closing",
            "event_description": "Done.",
            "media": None,
        })
        event = make_event(row)
        self.assertEqual(event["media"], [])


if __name__ == "__main__":
    unittest.main()
