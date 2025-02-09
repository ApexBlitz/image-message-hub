
export const translations = {
  fr: {
    app: "Application",
    about: "À propos",
    help: "Aide",
    legal: "Légal",
    aiResponse: "Réponse IA",
    title: "Image Message Hub",
    yourMessage: "Votre message",
    selectModel: "Sélectionner un modèle",
    uploadImage: "Télécharger une image",
    generate: "Générer",
    success: "Succès",
    error: "Erreur",
    imageUploaded: "Image téléchargée avec succès",
    imageTooLarge: "L'image ne doit pas dépasser 5Mo",
    selectModelFirst: "Veuillez sélectionner un modèle",
    textGenerated: "Texte généré avec succès",
    generationError: "Erreur lors de la génération du texte",
    lightMode: "Mode clair",
    darkMode: "Mode sombre"
  },
  en: {
    app: "Application",
    about: "About",
    help: "Help",
    legal: "Legal",
    aiResponse: "AI Response",
    title: "Image Message Hub",
    yourMessage: "Your message",
    selectModel: "Select a model",
    uploadImage: "Upload image",
    generate: "Generate",
    success: "Success",
    error: "Error",
    imageUploaded: "Image uploaded successfully",
    imageTooLarge: "Image must not exceed 5MB",
    selectModelFirst: "Please select a model",
    textGenerated: "Text generated successfully",
    generationError: "Error while generating text",
    lightMode: "Light mode",
    darkMode: "Dark mode"
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
