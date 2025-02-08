
import { useState } from "react";
import { Upload } from "lucide-react";

const ImageUpload = ({ onImageSelect }: { onImageSelect: (file: File) => void }) => {
  const [dragActive, setDragActive] = useState(false);

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
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  const acceptedFormats = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 
    'image/svg+xml', 'image/bmp', 'image/tiff'
  ].join(',');

  return (
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
  );
};

export default ImageUpload;
