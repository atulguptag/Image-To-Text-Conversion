from flask import Flask, render_template, request, jsonify
from PIL import Image
import pytesseract

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['image']

    if file:
        # Perform image to text conversion using pytesseract
        text = image_to_text(file)
        
        return jsonify(text)

    return jsonify({'error': 'Invalid request'})

def image_to_text(image):
    image = Image.open(image)
    text = pytesseract.image_to_string(image)
    return text.strip()

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)