
import { ScrollArea } from "../ui/scroll-area";

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

const AIResponseTab = ({ 
  generatedText,
  history 
}: { 
  generatedText: string;
  history: HistoryEntry[];
}) => {
  if (!generatedText && history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">
          Aucune réponse générée pour le moment. Utilisez l'onglet Application pour générer une réponse.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {history.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Rapport d'utilisation IA</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-sm text-gray-600 mb-1">Nombre total de requêtes</h3>
              <p className="text-2xl font-bold">{history.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-sm text-gray-600 mb-1">Tokens totaux utilisés</h3>
              <p className="text-2xl font-bold">
                {history.reduce((acc, curr) => acc + curr.stats.tokensUsed, 0)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-sm text-gray-600 mb-1">Temps moyen de réponse</h3>
              <p className="text-2xl font-bold">
                {(history.reduce((acc, curr) => acc + curr.stats.duration, 0) / history.length).toFixed(2)}ms
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Historique détaillé</h2>
          <ScrollArea className="h-[400px]">
            {history.map((entry, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-gray-500">
                    {entry.timestamp.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Modèle: {entry.stats.modelName}
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Message :</strong>
                  <p className="text-gray-700">{entry.message}</p>
                </div>
                <div className="mb-2">
                  <strong>Réponse :</strong>
                  <p className="text-gray-700">{entry.response}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="text-gray-600">
                    Tokens utilisés: {entry.stats.tokensUsed}
                  </div>
                  <div className="text-gray-600">
                    Durée: {entry.stats.duration}ms
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default AIResponseTab;
