from flask import Flask, request, jsonify
import requests
from PIL import Image
import io

app = Flask(__name__)

# LLaVA - Modèle d'analyse d'image
Llava_API_URL = "http://127.0.0.1:11434/api/generate"  # Assure-toi que LLaVA tourne sur cette adresse

# Stockage des questions/réponses en mémoire (temporaire)
conversations = []

# Endpoint pour uploader une image et commencer l'analyse
@app.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "Aucune image envoyée."}), 400  # Si aucun fichier n'est envoyé
    file = request.files["image"]
    if not file:
        return jsonify({"error": "Fichier image vide."}), 400  # Si le fichier est vide
    
    try:
        image = Image.open(file)
        print(f"Image reçue : {file.filename}")
    except Exception as e:
        return jsonify({"error": f"Erreur lors de l'ouverture de l'image: {str(e)}"}), 500
    
    # Envoi de l'image à LLaVA pour générer une description
    image_bytes = io.BytesIO()
    image.save(image_bytes, format="JPEG")
    image_bytes.seek(0)

    try:
        response = requests.post(
            Llava_API_URL,
            files={"image": image_bytes},
            json={"model": "llava", "prompt": "Décris cette image."}
        )
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Erreur lors de l'appel à LLaVA: {str(e)}"}), 500

    if response.status_code == 200:
        description = response.json().get("response", "Aucune description générée.")
        conversations.append({"question": "Décris l'image", "response": description})
        return jsonify({"response": description})
    else:
        return jsonify({"error": "Erreur lors de l'analyse de l'image."}), 500


# Endpoint pour poser des questions à l'IA après l'analyse de l'image
@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.json
    question = data["question"]
    
    # Générer la réponse de l'IA
    response = requests.post(
        Llava_API_URL,
        json={"model": "llava", "prompt": question}
    )

    if response.status_code == 200:
        generated_response = response.json().get("response", "Pas de réponse générée.")
    else:
        generated_response = "Erreur lors de la génération de la réponse."
    
    # Stocker l'échange
    conversations.append({"question": question, "response": generated_response})

    return jsonify({"response": generated_response})

# Endpoint pour récupérer l'historique des questions/réponses
@app.route("/history", methods=["GET"])
def get_history():
    return jsonify(conversations)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
