import { useState } from "react";

const MessageInput = ({ onMessageChange }: { onMessageChange: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onMessageChange(e.target.value);
  };

  return (
    <div className="w-full space-y-2">
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Votre message
      </label>
      <textarea
        id="message"
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        placeholder="Écrivez votre message ici..."
        value={message}
        onChange={handleChange}
      />
    </div>
  );
};

export default MessageInput;