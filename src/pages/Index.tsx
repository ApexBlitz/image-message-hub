
import { useState } from "react";
import { useToast } from "../components/ui/use-toast";
import { generateResponse } from "../services/ollamaService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";
import AppTab from "../components/tabs/AppTab";
import AboutTab from "../components/tabs/AboutTab";
import HelpTab from "../components/tabs/HelpTab";
import LegalTab from "../components/tabs/LegalTab";
import AIResponseTab from "../components/tabs/AIResponseTab";
import Footer from "../components/Footer";

interface HistoryEntry {
  message: string;
  response: string;
  timestamp: Date;
  stats: {
    duration: number;
    tokensUsed: number;
    modelName: string;
  };
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("app");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [generatedText, setGeneratedText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { toast } = useToast();

  const handleHomeClick = () => {
    setActiveTab("app");
  };

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

    const startTime = Date.now();

    try {
      const response = await generateResponse(selectedModel, message);
      const duration = Date.now() - startTime;
      
      const newEntry: HistoryEntry = {
        message,
        response: response.text,
        timestamp: new Date(),
        stats: {
          duration: duration,
          tokensUsed: response.stats.tokensUsed || 0,
          modelName: selectedModel,
        }
      };
      
      setGeneratedText(response.text);
      setHistory(prev => [newEntry, ...prev]);
      
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
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container flex-grow py-8 space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" className="rounded-full" onClick={handleHomeClick}>
            <Home className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl font-bold text-center text-gray-900 flex-grow">
            Image Message Hub
          </h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="app">Application</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
            <TabsTrigger value="legal">Légal</TabsTrigger>
            <TabsTrigger value="ai-response">Réponse IA</TabsTrigger>
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
              history={history}
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

          <TabsContent value="ai-response">
            <AIResponseTab generatedText={generatedText} history={history} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Index;

