
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image } from "lucide-react";

const Gallery = () => {
  const navigate = useNavigate();

  // Exemple de données de galerie
  const galleryItems = [
    { id: 1, title: "Image 1", date: "2024-02-20" },
    { id: 2, title: "Image 2", date: "2024-02-19" },
    { id: 3, title: "Image 3", date: "2024-02-18" },
    { id: 4, title: "Image 4", date: "2024-02-17" },
  ];

  return (
    <div className="container py-8 space-y-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Button>

      <h1 className="text-4xl title-gradient">Ma Galerie</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <Card key={item.id} className="p-4 space-y-4 hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <Image className="w-16 h-16 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
