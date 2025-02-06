const AboutTab = () => {
  return (
    <div className="space-y-4 text-left max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">À propos du projet</h2>
      <p>
        Image Message Hub est une application web innovante qui combine le partage d'images
        avec la génération de texte assistée par intelligence artificielle.
      </p>
      <h3 className="text-xl font-semibold mt-4">Fonctionnalités principales</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Téléchargement d'images jusqu'à 5Mo</li>
        <li>Sélection de modèles d'IA via Ollama</li>
        <li>Génération de texte personnalisée</li>
        <li>Interface utilisateur intuitive</li>
      </ul>
    </div>
  );
};

export default AboutTab;