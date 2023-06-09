import requests
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from extract import data
app = Flask(__name__)
CORS(app, support_credentials=True)

# fail = jsonify({"success": False, 'message': "fail"})


def read_webpage(url):
    try:
        response = requests.get(url, allow_redirects=True, stream=True)
        response.raise_for_status()
        content = response.text
        return content
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return e


@app.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def display():
    try:
        return render_template('example.html')
    except Exception:
        print("Error occurred while rendering")
        return jsonify({"success": False, 'message': "fail"})


@app.route('/doc', methods=['GET'])
@cross_origin(supports_credentials=True)
def displayDoc():
    try:
        return render_template('index.html')
    except Exception:
        print("Error occurred while rendering")
        return jsonify({"success": False, 'message': "fail"})


@app.route('/api/file', methods=['POST'])
@cross_origin(supports_credentials=True)
def uploadFile():
    try:
        if request.method == 'POST':
            f = request.files['file']
            print(f)
            f.save("templates/"+secure_filename('index.html'))
            print("file saved")
            return jsonify(data())
        else:
            raise Exception
    except Exception:
        return jsonify({"success": False, 'message': "fail"})


@app.route('/api/link', methods=['POST'])
@cross_origin(supports_credentials=True)
def receiveLink():
    try:
        if request.method == 'POST':
            link = request.form['link']
            content = read_webpage(link)
            # print(content)
            file = open("templates/index.html", 'w', encoding="utf8")
            file.write(content)
            print(link)
            # print(file.read())
            file.close()
            return jsonify(data())
        else:
            raise Exception
    except Exception:
        print("Failed to save file")
        return jsonify({"success": False, 'message': "fail"})

# data()


if __name__ == '__main__':
    app.run(port=8000, debug=True)
