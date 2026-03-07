"""Tests for parse_witnesses."""
import sys
import os
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from converter import parse_witnesses


class TestParseWitnesses(unittest.TestCase):

    def test_plain_text_returns_unchanged(self):
        text = "Some regular description with no witness data."
        cleaned, witnesses = parse_witnesses(text)
        self.assertEqual(cleaned, text)
        self.assertEqual(witnesses, [])

    def test_non_string_returns_unchanged(self):
        self.assertEqual(parse_witnesses(None), (None, []))
        self.assertEqual(parse_witnesses(42), (42, []))

    def test_empty_string_returns_unchanged(self):
        cleaned, witnesses = parse_witnesses("")
        self.assertEqual(cleaned, "")
        self.assertEqual(witnesses, [])

    def test_single_witness_parsed(self):
        text = (
            "Some event description here.\n\n"
            "Sergeant Chris McLaughlin (NYPD):\n"
            "Connection to the Case: Responded to the scene\n"
            "Reason for Testifying: Describe what he observed\n"
            "Cross Examination: Defense questioned his timeline"
        )
        cleaned, witnesses = parse_witnesses(text)
        self.assertEqual(len(witnesses), 1)
        self.assertEqual(witnesses[0]["name"], "Sergeant Chris McLaughlin")
        self.assertEqual(witnesses[0]["title"], "NYPD")
        self.assertEqual(witnesses[0]["connection"], "Responded to the scene")
        self.assertEqual(witnesses[0]["testimony"], "Describe what he observed")
        self.assertEqual(witnesses[0]["crossExamination"], "Defense questioned his timeline")
        self.assertEqual(cleaned, "Some event description here.")

    def test_witness_without_title(self):
        text = (
            "John Smith:\n"
            "Connection to the Case: Eyewitness\n"
            "Reason for Testifying: Saw everything\n"
            "Cross Examination: None"
        )
        _, witnesses = parse_witnesses(text)
        self.assertEqual(witnesses[0]["name"], "John Smith")
        self.assertEqual(witnesses[0]["title"], "")

    def test_multiple_witnesses(self):
        text = (
            "Opening remarks.\n\n"
            "Officer Jane Doe (FBI):\n"
            "Connection to the Case: Lead investigator\n"
            "Reason for Testifying: Present evidence\n"
            "Cross Examination: Challenged methodology\n\n"
            "More description.\n\n"
            "Dr. Bob Lee:\n"
            "Connection to the Case: Expert witness\n"
            "Reason for Testifying: Forensic analysis\n"
            "Cross Examination: Questioned credentials\n\n"
            "Final notes."
        )
        cleaned, witnesses = parse_witnesses(text)
        self.assertEqual(len(witnesses), 2)
        self.assertEqual(witnesses[0]["name"], "Officer Jane Doe")
        self.assertEqual(witnesses[1]["name"], "Dr. Bob Lee")
        self.assertIn("Opening remarks", cleaned)
        self.assertIn("More description", cleaned)
        self.assertIn("Final notes", cleaned)
        self.assertNotIn("Connection to the Case", cleaned)

    def test_missing_fields_default_to_empty(self):
        text = (
            "Jane Roe (DA):\n"
            "Connection to the Case: Prosecutor"
        )
        _, witnesses = parse_witnesses(text)
        self.assertEqual(witnesses[0]["testimony"], "")
        self.assertEqual(witnesses[0]["crossExamination"], "")


if __name__ == "__main__":
    unittest.main()
