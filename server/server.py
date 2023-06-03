from flask import Flask, flash, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import os
import gitext
from flask_cors import CORS
import json
import check
app = Flask(__name__)
CORS(app)


@app.route("/upload", methods=["POST"])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        print(f)
        f.save(secure_filename('file.txt'))
        Result = []
        check.loopAllFiles(Result)
        print(Result)
        return jsonify({'res': Result, 'status': True})
    return jsonify({'res': 'Failed To Upload', 'status': False})


@app.route('/code', methods=['GET', 'POST'])
def code():
    data = request.data.decode('utf-8')
    codeData = json.loads(data)['code']
    print(codeData)
    if codeData != '':
        file = open('file.txt', 'w')
        file.write(codeData)
        file.close()
        Result = []
        check.loopAllFiles(Result)
        print(Result)
        return jsonify({'res': Result, 'status': True})
    return jsonify({"sucess": False, 'message': "fail"})


@app.route('/', methods=['GET', 'POST'])
def display():
    return "welcome to detecto"


@app.route('/github', methods=["POST", "GET"])
def Github():
    data = request.data.decode('utf-8')
    repo = json.loads(data)['repo']
    print(repo)
    if repo != '':
        gitext.search(repo)
        return jsonify({"sucess": True, 'message': "done"})
    return jsonify({"sucess": False, 'message': "fail"})


@app.route('/result', methods=['POST', 'GET'])
def previous():
    Result = []
    check.loopAllFiles(Result)
    print(Result)
    return jsonify({'res': Result, 'status': True})


if __name__ == '__main__':
    app.run(port=8000, debug=True)
