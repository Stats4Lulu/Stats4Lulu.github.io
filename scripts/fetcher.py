import os
import re
import csv
import argparse

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import gspread


def parse_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-csv", "-o", default="output.csv",
                        help="path for the CSV file to save")
    parser.add_argument("--folder-id", "-F", 
                        default="16xY6iTFvDchQ0quMzDYHwIlhgeFl5U0u", # not the S4L dir!
                        help="Google Drive folder ID")
    parser.add_argument("--dest", "-d", default="images", help="path for images directory")
    return parser.parse_args()


def save_csv(worksheet, outputfile) -> None:
    rows = worksheet.get_all_records()

    if not rows: return None

    with open(outputfile, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)


def download_drive_folder(service, folder_id, destination) -> None:
    os.makedirs(destination, exist_ok=True)
    page_token = None

    while True:
        resp = service.files().list(q=f"'{folder_id}' in parents",
                            fields="nextPageToken files(id, name)").execute()
        
        for f in resp.get("files"):
            clean_name = re.sub(r"^\d{4}-\d{2}-\d{2}\s*", "", 
                                f["name"]).replace(" ", "_").lower()
            path = os.path.join(destination, clean_name)

            req = service.files().get_media(fileId=f['id'])
            with open(path, "wb") as fh:
                downloader = MediaIoBaseDownload(fh, req)
                done = False
                while not done:
                    # status is redundant!
                    status, done = downloader.next_chunk()
        page_token = resp.get("nextPageToken")
        if not page_token: break


if __name__ == "__main__":
    args = parse_arguments()

    scopes = ["https://www.googleapis.com/auth/spreadsheets", 
              "https://www.googleapis.com/auth/drive.readonly"]
    
    creds = Credentials.from_service_account_file("service_account.json", scopes=scopes)
    gspread_client = gspread.authorize(creds)
    drive = build("drive", "v3", credentials=creds)

    sheet = gspread_client.open_by_key("1MSdl4xOpoyPGVrg8CbT8qn3cCwPTmbwP1beL-ikPl0o")
    worksheet = sheet.worksheet("LM_Events")

    save_csv(worksheet, args.output_csv)
    download_drive_folder(drive, folder_id=args.folder_id, destination=args.dest)
