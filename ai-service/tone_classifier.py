"""
Swag Vastra - Skin Tone Classifier
Uses MediaPipe Face Mesh + K-Means clustering to detect skin tone
"""

import cv2
import numpy as np
try:
    import mediapipe as mp
    from mediapipe.tasks import python
    from mediapipe.tasks.python import vision
    USE_NEW_API = True
except (ImportError, AttributeError):
    import mediapipe as mp
    USE_NEW_API = False
from sklearn.cluster import KMeans
from typing import Tuple, Dict

class SkinToneClassifier:
    def __init__(self):
        if USE_NEW_API:
            # New MediaPipe API (0.10.30+)
            try:
                from mediapipe import solutions
                self.mp_face_mesh = solutions.face_mesh
                self.face_mesh = self.mp_face_mesh.FaceMesh(
                    static_image_mode=True,
                    max_num_faces=1,
                    refine_landmarks=True,
                    min_detection_confidence=0.5
                )
                self.use_legacy = False
            except:
                # Fallback to simple face detection
                self.use_legacy = True
                self.face_cascade = cv2.CascadeClassifier(
                    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
                )
        else:
            # Old MediaPipe API
            self.mp_face_mesh = mp.solutions.face_mesh
            self.face_mesh = self.mp_face_mesh.FaceMesh(
                static_image_mode=True,
                max_num_faces=1,
                refine_landmarks=True,
                min_detection_confidence=0.5
            )
            self.use_legacy = False
        
        # Tone scale mapping
        self.tone_labels = {
            (1, 2): "Very Fair",
            (3, 4): "Fair",
            (5, 6): "Medium",
            (7, 8): "Dusky",
            (9, 10): "Deep"
        }
    
    def extract_skin_pixels(self, image_path: str) -> np.ndarray:
        """Extract skin pixels using MediaPipe Face Mesh or fallback method"""
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not load image: {image_path}")
        
        h, w, _ = image.shape
        
        if hasattr(self, 'use_legacy') and self.use_legacy:
            # Fallback: Use OpenCV face detection
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)
            
            if len(faces) == 0:
                raise ValueError("No face detected in image")
            
            # Get the largest face
            x, y, fw, fh = max(faces, key=lambda f: f[2] * f[3])
            
            # Create elliptical mask for face region
            mask = np.zeros((h, w), dtype=np.uint8)
            center = (x + fw // 2, y + fh // 2)
            axes = (fw // 2, fh // 2)
            cv2.ellipse(mask, center, axes, 0, 0, 360, 255, -1)
            
            # Extract skin pixels
            skin_pixels = image[mask == 255]
        else:
            # Use MediaPipe Face Mesh
            rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = self.face_mesh.process(rgb_image)
            
            if not results.multi_face_landmarks:
                raise ValueError("No face detected in image")
            
            # Get face landmarks
            face_landmarks = results.multi_face_landmarks[0]
            
            # Create mask from face mesh
            mask = np.zeros((h, w), dtype=np.uint8)
            points = []
            
            for landmark in face_landmarks.landmark:
                x = int(landmark.x * w)
                y = int(landmark.y * h)
                points.append([x, y])
            
            points = np.array(points, dtype=np.int32)
            cv2.fillConvexPoly(mask, points, 255)
            
            # Extract skin pixels
            skin_pixels = image[mask == 255]
        
        return skin_pixels
    
    def cluster_dominant_tone(self, skin_pixels: np.ndarray, k: int = 3) -> np.ndarray:
        """Use K-Means to find dominant skin tone"""
        # Convert to HSV
        hsv_pixels = cv2.cvtColor(
            skin_pixels.reshape(1, -1, 3), 
            cv2.COLOR_BGR2HSV
        ).reshape(-1, 3)
        
        # Apply K-Means clustering
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        kmeans.fit(hsv_pixels)
        
        # Find the cluster with most pixels (dominant tone)
        labels, counts = np.unique(kmeans.labels_, return_counts=True)
        dominant_cluster = labels[np.argmax(counts)]
        dominant_tone_hsv = kmeans.cluster_centers_[dominant_cluster]
        
        return dominant_tone_hsv
    
    def map_to_scale(self, hsv_tone: np.ndarray) -> Tuple[int, str]:
        """Map HSV tone to 1-10 scale"""
        # Extract V (brightness/value) channel - primary indicator
        v_value = hsv_tone[2]
        
        # Map V value (0-255) to 1-10 scale (inverted: darker = higher score)
        tone_score = int(10 - (v_value / 255.0) * 9)
        tone_score = max(1, min(10, tone_score))
        
        # Get label
        tone_label = "Unknown"
        for (min_val, max_val), label in self.tone_labels.items():
            if min_val <= tone_score <= max_val:
                tone_label = label
                break
        
        return tone_score, tone_label
    
    def analyze(self, image_path: str) -> Dict:
        """Complete analysis pipeline"""
        try:
            # Extract skin pixels
            skin_pixels = self.extract_skin_pixels(image_path)
            
            # Cluster to find dominant tone
            dominant_tone_hsv = self.cluster_dominant_tone(skin_pixels)
            
            # Map to scale
            tone_score, tone_label = self.map_to_scale(dominant_tone_hsv)
            
            # Convert HSV to RGB for display
            hsv_color = np.uint8([[dominant_tone_hsv]])
            rgb_color = cv2.cvtColor(hsv_color, cv2.COLOR_HSV2RGB)[0][0]
            
            return {
                "success": True,
                "tone_score": tone_score,
                "tone_label": tone_label,
                "dominant_color_rgb": rgb_color.tolist(),
                "dominant_color_hsv": dominant_tone_hsv.tolist()
            }
        
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }


if __name__ == "__main__":
    # Test the classifier
    classifier = SkinToneClassifier()
    result = classifier.analyze("test_image.jpg")
    print(result)
