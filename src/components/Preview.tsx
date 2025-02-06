const Preview = ({
  imageUrl,
  message,
}: {
  imageUrl: string | null;
  message: string;
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
    </div>
  );
};

export default Preview;