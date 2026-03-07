"""Tests for converter_images.py (the standalone file-renaming script)."""
import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "src", "assets"))
from converter_images import rename_images


class TestRenameImages(unittest.TestCase):

    def setUp(self):
        self.tmpdir = tempfile.mkdtemp()

    def _touch(self, name):
        """Create an empty file and return its Path."""
        p = Path(self.tmpdir) / name
        p.touch()
        return p

    def _files(self):
        """Return a sorted list of filenames in the temp directory."""
        return sorted(f.name for f in Path(self.tmpdir).iterdir())

    # --- core renaming ---

    def test_date_prefix_renamed(self):
        self._touch("2025-12-08 Sketch 1.jpg")
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), ["08_12_2025_sketch_1.jpg"])

    def test_spaces_become_underscores(self):
        self._touch("2025-01-15 My Photo Name.png")
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), ["15_01_2025_my_photo_name.png"])

    def test_no_date_prefix_skipped(self):
        self._touch("random_photo.jpg")
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), ["random_photo.jpg"])

    def test_non_image_ignored(self):
        self._touch("2025-12-08 Notes.txt")
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), ["2025-12-08 Notes.txt"])

    def test_multiple_files(self):
        self._touch("2025-12-01 Court Photo 1.jpg")
        self._touch("2025-12-01 Court Photo 2.jpg")
        self._touch("no_date.png")
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), [
            "01_12_2025_court_photo_1.jpg",
            "01_12_2025_court_photo_2.jpg",
            "no_date.png",
        ])

    def test_avif_extension(self):
        self._touch("2024-12-10 dickey_photo.avif")
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), ["10_12_2024_dickey_photo.avif"])

    def test_webp_extension(self):
        self._touch("2025-06-03 shackles.webp")
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), ["03_06_2025_shackles.webp"])

    # --- edge cases ---

    def test_empty_directory(self):
        rename_images(self.tmpdir)
        self.assertEqual(self._files(), [])

    def test_invalid_directory(self):
        # should just print error, not crash
        rename_images("/nonexistent/path/12345")

    def test_subdirectories_ignored(self):
        subdir = Path(self.tmpdir) / "2025-12-08 subdir"
        subdir.mkdir()
        rename_images(self.tmpdir)
        # subdirectory should remain untouched
        self.assertTrue(subdir.exists())


if __name__ == "__main__":
    unittest.main()
