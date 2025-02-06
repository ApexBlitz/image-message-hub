import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import MessageInput from "../components/MessageInput";
import Preview from "../components/Preview";
import ModelSelect from "../components/ModelSelect";
import { useToast } from "../components/ui/use-toast";
import { generateResponse } from "../services/ollamaService";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

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
          Image Message Hub
        </h1>

        <Tabs defaultValue="app" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="app">Application</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
          </TabsList>

          <TabsContent value="app" className="space-y-8">
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
          </TabsContent>

          <TabsContent value="about" className="space-y-4 text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">À propos du projet</h2>
            <p>
              Image Message Hub est une application web innovante qui combine le partage d'images
              avec la génération de texte assistée par intelligence artificielle.
            </p>
            <h3 className="text-xl font-semibold mt-4">Fonctionnalités principales</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Téléchargement d'images jusqu'à 5Mo</li>
              <li>Sélection de modèles d'IA via Ollama</li>
              <li>Génération de texte personnalisée</li>
              <li>Interface utilisateur intuitive</li>
            </ul>
          </TabsContent>

          <TabsContent value="help" className="space-y-4 text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Comment utiliser l'application</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">1. Téléchargement d'image</h3>
                <p>Cliquez sur la zone de téléchargement ou glissez-déposez votre image.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">2. Sélection du modèle</h3>
                <p>Choisissez un modèle d'IA dans la liste déroulante des modèles disponibles.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">3. Message</h3>
                <p>Écrivez votre message dans le champ de texte prévu à cet effet.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">4. Génération</h3>
                <p>Cliquez sur "Générer avec IA" pour obtenir une réponse générée par l'IA.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;