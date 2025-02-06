import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { fetchOllamaModels } from "../services/ollamaService";

interface ModelSelectProps {
  onModelSelect: (model: string) => void;
}

const ModelSelect = ({ onModelSelect }: ModelSelectProps) => {
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      const modelList = await fetchOllamaModels();
      setModels(modelList.map(model => model.name));
    };
    loadModels();
  }, []);

  return (
    <div className="w-full space-y-2">
      <label htmlFor="model-select" className="block text-sm font-medium text-gray-700">
        Modèle IA
      </label>
      <Select onValueChange={onModelSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez un modèle" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelect;