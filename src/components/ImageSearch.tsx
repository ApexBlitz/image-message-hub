
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Image } from "lucide-react";
import { Card } from "./ui/card";

interface ImageSearchProps {
  onImageSelect: (url: string) => void;
}

const ImageSearch = ({ onImageSelect }: ImageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Exemple de données d'images pour la démonstration
  const sampleImages = [
    { id: 1, url: "https://source.unsplash.com/photo-1488590528505-98d2b5aba04b", title: "Tech 1" },
    { id: 2, url: "https://source.unsplash.com/photo-1518770660439-4636190af475", title: "Tech 2" },
    { id: 3, url: "https://source.unsplash.com/photo-1487058792275-0ad4aaf24ca7", title: "Tech 3" },
    { id: 4, url: "https://source.unsplash.com/photo-1581091226825-a6a2a5aee158", title: "Tech 4" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Rechercher une image..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sampleImages
          .filter(img => img.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((image) => (
            <Card
              key={image.id}
              className="group cursor-pointer overflow-hidden"
              onClick={() => onImageSelect(image.url)}
            >
              <div className="aspect-square relative">
                <img
                  src={image.url}
                  alt={image.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Image className="h-4 w-4" />
                    Sélectionner
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ImageSearch;
