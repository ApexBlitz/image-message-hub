const Preview = ({
  imageUrl,
  message,
  generatedText,
}: {
  imageUrl: string | null;
  message: string;
  generatedText?: string;
}) => {
  if (!imageUrl) return null;

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      </div>
      {message && (
        <div className="p-4 bg-surface rounded-lg">
          <p className="text-gray-800 whitespace-pre-wrap">{message}</p>
        </div>
      )}
      {generatedText && (
        <div className="p-4 bg-primary/10 rounded-lg">
          <h3 className="font-medium mb-2">Réponse de l'IA :</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Preview;