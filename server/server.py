import requests
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
from flask_cors import CORS
import extract
app = Flask(__name__)
CORS(app)


def read_webpage(url):
    try:
        response = requests.get(url, allow_redirects=True, stream=True)
        response.raise_for_status()
        content = response.text
        return content
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return e


def data():
    try:
        images = extract.extract_images()
        links = extract.extract_links()
        text = extract.extract_text()
        script = extract.extract_javascript()
        graph = extract.create_html_tree()
        return jsonify({
            "success": True,
            "message": "done",
            "images": images,
            "links": links,
            "text": text,
            "script": script,
            "graph": graph
        })
    except Exception:
        print("Error occurred while extracting")
        return jsonify({
            "success": False,
            "message": "Error occurred while extracting"
        })


@app.route('/', methods=['GET'])
def display():
    try:
        return render_template('index.html')
    except Exception:
        print("Error occurred while rendering")
        return Exception


@app.route('/api/file', methods=['POST'])
def uploadFile():
    try:
        if request.method == 'POST':
            f = request.files['file']
            print(f)
            f.save("templates/"+secure_filename('index.html'))
            print("file saved")
            return data()
        else:
            raise Exception
    except Exception:
        return jsonify({"success": False, 'message': "fail"})


@app.route('/api/link', methods=['POST'])
def receiveLink():
    try:
        if request.method == 'POST':
            link = request.form['link']
            content = read_webpage(link)
            # print(content)
            file = open("templates/index.html", 'w', encoding="utf8")
            file.write(content)
            return data()
        else:
            raise Exception
    except Exception:
        print("Failed to save file")
        return jsonify({"success": False, 'message': "fail"})

# data()

if __name__ == '__main__':
    app.run(port=8000, debug=True)
