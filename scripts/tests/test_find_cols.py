"""Tests for find_cols."""
import sys
import os
import unittest
import pandas as pd

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from converter import find_cols


class TestFindCols(unittest.TestCase):

    def test_finds_matching_cols(self):
        cols = pd.Index(["link_1", "link_2", "link_1_text", "other"])
        result = find_cols(cols, r"link_\d+$")
        self.assertEqual(result, ["link_1", "link_2"])

    def test_sorted_numerically(self):
        cols = pd.Index(["link_10", "link_2", "link_1"])
        result = find_cols(cols, r"link_\d+$")
        self.assertEqual(result, ["link_1", "link_2", "link_10"])

    def test_no_matches(self):
        cols = pd.Index(["foo", "bar"])
        result = find_cols(cols, r"link_\d+$")
        self.assertEqual(result, [])

    def test_image_pattern(self):
        cols = pd.Index(["image_1", "image_2", "image_1_url"])
        result = find_cols(cols, r"image_\d+$")
        self.assertEqual(result, ["image_1", "image_2"])


if __name__ == "__main__":
    unittest.main()
