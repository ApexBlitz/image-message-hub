import ImageUpload from "../ImageUpload";
import MessageInput from "../MessageInput";
import Preview from "../Preview";
import ModelSelect from "../ModelSelect";
import { Button } from "../ui/button";

interface AppTabProps {
  onImageSelect: (file: File) => void;
  onModelSelect: (model: string) => void;
  onMessageChange: (message: string) => void;
  onGenerate: () => void;
  selectedModel: string;
  message: string;
  imageUrl: string | null;
  generatedText: string;
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
}: AppTabProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <ImageUpload onImageSelect={onImageSelect} />
      <ModelSelect onModelSelect={onModelSelect} />
      <MessageInput onMessageChange={onMessageChange} />
      <Button 
        onClick={onGenerate}
        className="w-full"
        disabled={!selectedModel || !message}
      >
        Générer avec IA
      </Button>
      <Preview imageUrl={imageUrl} message={message} generatedText={generatedText} />
    </div>
  );
};

export default AppTab;