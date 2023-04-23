import os
from werkzeug.utils import secure_filename
from PIL import Image
import random
import uuid
import random


def save_img(file, upload_folder, file_num):
    img = Image.open(file.stream)

    # Save the image to a file
    filename = secure_filename(file.filename)
    ext = os.path.splitext(filename)[1]
    if ext not in ['.jpg', '.jpeg', '.png', '.gif']:
        ext = '.jpeg'
    filename = f"image{file_num}{ext}"
    filepath = os.path.join(upload_folder, filename)
    img.save(filepath)
    return img, filepath


def create_if_does_not_exist(dir):
    if not os.path.exists(dir):
        os.makedirs(dir)


def generate_unique_id():
    # Load existing unique IDs from file
    filename = "existing_ids.txt"
    if os.path.exists(filename):
        with open(filename, "r") as f:
            existing_ids = set(line.strip() for line in f)
    else:
        existing_ids = set()

    # Generate a new unique ID
    while True:
        new_id = str(uuid.uuid4().hex)[:16]
        if new_id not in existing_ids:
            break

    # Add the new ID to the set of existing IDs
    existing_ids.add(new_id)

    # Write the updated set of existing IDs back to file
    with open(filename, "w") as f:
        f.write("\n".join(existing_ids))

    # Divide the ID into 4 groups with '-' in between each group
    return f"{new_id[:4]}-{new_id[4:8]}-{new_id[8:12]}-{new_id[12:]}"
