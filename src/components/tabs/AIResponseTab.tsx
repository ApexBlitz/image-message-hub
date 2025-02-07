import { ScrollArea } from "../ui/scroll-area";

interface HistoryEntry {
  message: string;
  response: string;
  timestamp: Date;
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
      {generatedText && (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Dernière réponse</h2>
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-gray-800 whitespace-pre-wrap">{generatedText}</p>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Historique des réponses</h2>
          <ScrollArea className="h-[400px]">
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

export default AIResponseTab;