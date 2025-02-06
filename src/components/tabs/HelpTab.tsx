const HelpTab = () => {
  return (
    <div className="space-y-4 text-left max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Comment utiliser l'application</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">1. Téléchargement d'image</h3>
          <p>Cliquez sur la zone de téléchargement ou glissez-déposez votre image.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">2. Sélection du modèle</h3>
          <p>Choisissez un modèle d'IA dans la liste déroulante des modèles disponibles.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">3. Message</h3>
          <p>Écrivez votre message dans le champ de texte prévu à cet effet.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">4. Génération</h3>
          <p>Cliquez sur "Générer avec IA" pour obtenir une réponse générée par l'IA.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpTab;