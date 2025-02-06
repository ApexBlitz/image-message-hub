import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import MessageInput from "../components/MessageInput";
import Preview from "../components/Preview";
import { useToast } from "../components/ui/use-toast";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Partagez votre image
        </h1>
        
        <div className="max-w-2xl mx-auto space-y-8">
          <ImageUpload onImageSelect={handleImageSelect} />
          <MessageInput onMessageChange={setMessage} />
          <Preview imageUrl={imageUrl} message={message} />
        </div>
      </div>
    </div>
  );
};

export default Index;