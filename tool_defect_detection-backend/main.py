from flask import Flask, request, jsonify
from flask_cors import cross_origin
import image_processing
import util

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'images/input_images'
util.create_if_does_not_exist(app.config['UPLOAD_FOLDER'])

file_num = 1


@app.route("/im_size", methods=["POST"])
@cross_origin()
def process_image():
    global file_num
    file = request.files['image']
    _, filepath = util.save_img(file, app.config['UPLOAD_FOLDER'], file_num)
    file_num += 1
    is_accepted = image_processing.driver(filepath)
    return jsonify({
        'msg': 'success',
        'accepted': is_accepted,
        'imageId': file_num - 1})


@app.route("/connect", methods=["GET"])
@cross_origin()
def get_uuid():
    generated_id = util.generate_unique_id()
    app.config['UPLOAD_FOLDER'] = 'images/input_images/' + generated_id
    util.create_if_does_not_exist(app.config['UPLOAD_FOLDER'])
    return jsonify({
        'sessionId': generated_id
    })


if __name__ == "__main__":
    app.run(debug=True)
