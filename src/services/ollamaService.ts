
interface OllamaModel {
  name: string;
}

interface OllamaResponse {
  model: string;
  response: string;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  eval_count: number;
  eval_duration: number;
}

interface GenerateResponse {
  text: string;
  stats: {
    tokensUsed: number;
    duration: number;
  };
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

export const generateResponse = async (model: string, prompt: string): Promise<GenerateResponse> => {
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
    
    return {
      text: data.response,
      stats: {
        tokensUsed: data.prompt_eval_count + data.eval_count,
        duration: data.total_duration,
      }
    };
  } catch (error) {
    console.error('Erreur lors de la génération:', error);
    throw error;
  }
};
