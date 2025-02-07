import React from 'react';
import { Separator } from './ui/separator';

const Footer = () => {
  return (
    <footer className="mt-8 pt-4">
      <Separator className="mb-4" />
      <div className="text-sm text-gray-500 space-y-2">
        <p>© 2024 Image Message Hub. Tous droits réservés.</p>
        <p>
          Conformément au RGPD, nous nous engageons à protéger vos données personnelles.
          Les images téléchargées sont temporairement stockées et automatiquement supprimées après utilisation.
        </p>
        <p>
          Cette application utilise des cookies techniques essentiels au fonctionnement du service.
          Pour toute question, contactez-nous à : contact@imagemessagehub.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;