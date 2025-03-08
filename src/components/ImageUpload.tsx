import { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";

const ImageUpload = ({ onImageSelect }: { onImageSelect: (file: File) => void }) => {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<File | null>(null); // Image de l'utilisateur
  const [response, setResponse] = useState<string>(""); // Réponse de l'IA pour la description de l'image
  const [question, setQuestion] = useState<string>(""); // Question posée à l'IA
  const [answer, setAnswer] = useState<string>(""); // Réponse de l'IA à la question posée

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
        setImage(file);  // Enregistrer l'image dans le state
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        alert("Veuillez télécharger une image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5 Mo maximum
        alert("L'image est trop grande. Taille maximale : 5 Mo.");
        return;
      }
      onImageSelect(file);
      setImage(file);  // Enregistrer l'image dans le state 
    }
  };
  

  const handleUpload = async () => { 
    if (!image) {
      setResponse("Aucune image sélectionnée.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", image);
  
    console.log("Envoi de l'image : ", formData);
  
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data.response); // Affiche la réponse de l'IA
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      setResponse("Erreur lors de l'upload de l'image.");
    }
  };
  
  

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value); // Mettre à jour la question à poser
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;
  
    try {
      const res = await axios.post("http://localhost:5000/ask", { question });
      setResponse(res.data.response); // Affiche la réponse de l'IA
    } catch (error) {
      console.error("Erreur lors de la génération du texte:", error);
      setResponse("Erreur lors de la génération du texte.");
    }
  };
  

  const acceptedFormats = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 
    'image/svg+xml', 'image/bmp', 'image/tiff'
  ].join(',');

  return (
    <div className="p-4">
      <div
        className={`relative w-full h-64 border-2 border-dashed rounded-lg transition-colors ${
          dragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={acceptedFormats}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Glissez une image ou cliquez pour sélectionner
            </p>
            <p className="text-xs text-gray-500">
              Formats acceptés : JPG, PNG, GIF, WebP, SVG, BMP, TIFF
            </p>
            <p className="text-xs text-gray-500">
              Taille maximale : 5 Mo
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Analyser l'image
      </button>

      {response && (
        <div className="mt-4">
          <h3>Description de l'image :</h3>
          <p>{response}</p>
        </div>
      )}

      {/* Interface pour poser des questions après avoir analysé l'image */}
      {response && (
        <div className="mt-4">
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Posez une question sur l'image"
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleQuestionSubmit}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Poser la question
          </button>

          {answer && (
            <div className="mt-4">
              <h3>Réponse de l'IA :</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
