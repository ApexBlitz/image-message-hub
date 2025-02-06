interface OllamaModel {
  name: string;
}

interface OllamaResponse {
  model: string;
  response: string;
}

export const fetchOllamaModels = async (): Promise<OllamaModel[]> => {
  try {
    const response = await fetch('http://127.0.0.1:11434/api/tags');
    const data = await response.json();
    return data.models || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des modèles:', error);
    return [];
  }
};

export const generateResponse = async (model: string, prompt: string): Promise<string> => {
  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
      }),
    });
    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Erreur lors de la génération:', error);
    return 'Une erreur est survenue lors de la génération de la réponse.';
  }
};