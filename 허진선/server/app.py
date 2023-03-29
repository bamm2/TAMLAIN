from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_SUPPORTS_CREDENTIALS"] = True


@app.route("/", methods=['GET'])
def test():
    return "test"


@app.route("/recomm", methods=['OPTIONS', 'POST'])
def recomm_place():
    return "test"


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
