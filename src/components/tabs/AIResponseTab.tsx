const AIResponseTab = ({ generatedText }: { generatedText: string }) => {
  if (!generatedText) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">
          Aucune réponse générée pour le moment. Utilisez l'onglet Application pour générer une réponse.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Réponse de l'IA</h2>
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-gray-800 whitespace-pre-wrap">{generatedText}</p>
        </div>
      </div>
    </div>
  );
};

export default AIResponseTab;