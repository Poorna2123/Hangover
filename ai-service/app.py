"""
Flask API wrapper for Skin Tone Classifier
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from tone_classifier import SkinToneClassifier

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

classifier = SkinToneClassifier()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "ai-tone-classifier"})

@app.route('/analyze', methods=['POST'])
def analyze_tone():
    if 'image' not in request.files:
        return jsonify({"success": False, "error": "No image provided"}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"success": False, "error": "Empty filename"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Analyze the image
        result = classifier.analyze(filepath)
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify(result)
    
    return jsonify({"success": False, "error": "Invalid file type"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
