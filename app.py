from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    return send_from_directory(app.root_path, "runner.html")

@app.route("/runner")
def runner():
    return send_from_directory(app.root_path, "runner.html")

@app.route("/planner")
def planner():
    return send_from_directory(app.root_path, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
