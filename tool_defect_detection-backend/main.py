from flask import Flask, request, jsonify
from flask_cors import cross_origin
from PIL import Image
import os
from werkzeug.utils import secure_filename
import image_processing

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'images/input_images'

file_num = 1


@app.route("/im_size", methods=["POST"])
@cross_origin()
def process_image():
    global file_num
    file = request.files['image']
    # Read the image via file.stream
    img = Image.open(file.stream)

    # Save the image to a file
    filename = secure_filename(file.filename)
    ext = os.path.splitext(filename)[1]
    if ext not in ['.jpg', '.jpeg', '.png', '.gif']:
        ext = '.jpeg'
    filename = f"image{file_num}{ext}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img.save(filepath)
    file_num += 1
    is_accepted = image_processing.driver(filepath)
    return jsonify({
        'msg': 'success',
        'size': [img.entropy(), img.height],
        'accepted': is_accepted,
        'imageId': file_num - 1})


if __name__ == "__main__":
    app.run(debug=True)
