const LegalTab = () => {
  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Mentions Légales</h2>
      
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-semibold">Propriété Intellectuelle</h3>
          <p className="mt-2">
            Tous les droits de propriété intellectuelle relatifs à cette application, y compris les droits d'auteur,
            sont réservés. Toute reproduction ou utilisation non autorisée est strictement interdite.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Protection des Données</h3>
          <p className="mt-2">
            Conformément au RGPD, nous nous engageons à protéger vos données personnelles.
            Les images téléchargées sont temporairement stockées et automatiquement supprimées après utilisation.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Utilisation de l'IA</h3>
          <p className="mt-2">
            Cette application utilise Ollama pour la génération de texte. Les modèles d'IA sont
            hébergés localement sur votre machine. Nous ne sommes pas responsables des contenus générés.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Cookies</h3>
          <p className="mt-2">
            Cette application utilise des cookies techniques essentiels au fonctionnement du service.
            Aucun cookie publicitaire ou de traçage n'est utilisé.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Contact</h3>
          <p className="mt-2">
            Pour toute question concernant vos droits ou l'utilisation de vos données,
            vous pouvez nous contacter à l'adresse : contact@imagemessagehub.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalTab;