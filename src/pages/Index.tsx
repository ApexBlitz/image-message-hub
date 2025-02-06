import { useState } from "react";
import { useToast } from "../components/ui/use-toast";
import { generateResponse } from "../services/ollamaService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import AppTab from "../components/tabs/AppTab";
import AboutTab from "../components/tabs/AboutTab";
import HelpTab from "../components/tabs/HelpTab";
import LegalTab from "../components/tabs/LegalTab";

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="app">Application</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
            <TabsTrigger value="legal">Légal</TabsTrigger>
          </TabsList>

          <TabsContent value="app">
            <AppTab 
              onImageSelect={handleImageSelect}
              onModelSelect={setSelectedModel}
              onMessageChange={setMessage}
              onGenerate={handleGenerate}
              selectedModel={selectedModel}
              message={message}
              imageUrl={imageUrl}
              generatedText={generatedText}
            />
          </TabsContent>

          <TabsContent value="about">
            <AboutTab />
          </TabsContent>

          <TabsContent value="help">
            <HelpTab />
          </TabsContent>

          <TabsContent value="legal">
            <LegalTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;