
import ImageUpload from "../ImageUpload";
import ImageSearch from "../ImageSearch";
import MessageInput from "../MessageInput";
import Preview from "../Preview";
import ModelSelect from "../ModelSelect";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface HistoryEntry {
  message: string;
  response: string;
  timestamp: Date;
}

interface AppTabProps {
  onImageSelect: (file: File) => void;
  onModelSelect: (model: string) => void;
  onMessageChange: (message: string) => void;
  onGenerate: () => void;
  selectedModel: string;
  message: string;
  imageUrl: string | null;
  generatedText: string;
  history: HistoryEntry[];
}

const AppTab = ({
  onImageSelect,
  onModelSelect,
  onMessageChange,
  onGenerate,
  selectedModel,
  message,
  imageUrl,
  generatedText,
  history,
}: AppTabProps) => {
  const handleImageUrlSelect = (url: string) => {
    // Convertir l'URL en File via un fetch
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        onImageSelect(file);
      });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Téléverser une image</TabsTrigger>
          <TabsTrigger value="search">Rechercher une image</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <ImageUpload onImageSelect={onImageSelect} />
        </TabsContent>
        <TabsContent value="search">
          <ImageSearch onImageSelect={handleImageUrlSelect} />
        </TabsContent>
      </Tabs>

      <ModelSelect onModelSelect={onModelSelect} />
      <MessageInput onMessageChange={onMessageChange} />
      <Button 
        onClick={onGenerate}
        className="w-full"
        disabled={!selectedModel || !message}
      >
        Réponse de l'IA
      </Button>
      <Preview imageUrl={imageUrl} message={message} generatedText={generatedText} />
      
      {history.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Historique des réponses</h3>
          <ScrollArea className="h-[300px] rounded-md border p-4">
            {history.map((entry, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">
                  {entry.timestamp.toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Message :</strong>
                  <p className="text-gray-700">{entry.message}</p>
                </div>
                <div>
                  <strong>Réponse :</strong>
                  <p className="text-gray-700">{entry.response}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default AppTab;
