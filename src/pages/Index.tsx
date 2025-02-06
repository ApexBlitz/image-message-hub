import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import MessageInput from "../components/MessageInput";
import Preview from "../components/Preview";
import ModelSelect from "../components/ModelSelect";
import { useToast } from "../components/ui/use-toast";
import { generateResponse } from "../services/ollamaService";
import { Button } from "../components/ui/button";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [generatedText, setGeneratedText] = useState("");
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "L'image ne doit pas dépasser 5Mo",
        variant: "destructive",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    toast({
      title: "Succès",
      description: "Image téléchargée avec succès",
    });
  };

  const handleGenerate = async () => {
    if (!selectedModel) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un modèle",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await generateResponse(selectedModel, message);
      setGeneratedText(response);
      toast({
        title: "Succès",
        description: "Texte généré avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la génération du texte",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Partagez votre image
        </h1>
        
        <div className="max-w-2xl mx-auto space-y-8">
          <ImageUpload onImageSelect={handleImageSelect} />
          <ModelSelect onModelSelect={setSelectedModel} />
          <MessageInput onMessageChange={setMessage} />
          <Button 
            onClick={handleGenerate}
            className="w-full"
            disabled={!selectedModel || !message}
          >
            Générer avec IA
          </Button>
          <Preview imageUrl={imageUrl} message={message} generatedText={generatedText} />
        </div>
      </div>
    </div>
  );
};

export default Index;