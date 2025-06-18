from flask import Flask, request, jsonify, send_from_directory
from datetime import datetime

app = Flask(__name__)

data_log = []

@app.route("/api/data", methods=["POST"])
def receive_data():
    data = request.json
    data["timestamp"] = datetime.now().isoformat()
    data_log.append(data)
    print("Принятые данные:", data)
    return jsonify({"status": "OK"}), 200

@app.route("/api/latest")
def latest_data():
    return jsonify(data_log[-1] if data_log else {})

@app.route("/api/history")
def history():
    return jsonify(data_log)

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/script.js")
def script():
    return send_from_directory(".", "script.js")

@app.route("/styles.css")
def styles():
    return send_from_directory(".", "styles.css")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)