import { Product } from "../types";

// Note: In a production app with a backend, we should call our own API
// instead of directly calling Google GenAI from the client to protect the key.
const BACKEND_URL = '/api';

export const getSmartRecommendations = async (viewedProducts: Product[], allProducts: Product[]): Promise<Product[]> => {
  try {
    if (viewedProducts.length === 0) return allProducts.slice(0, 3);
    
    const response = await fetch(`${BACKEND_URL}/ai/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ viewedProducts, allProducts })
    });

    if (!response.ok) throw new Error('Failed to fetch recommendations');
    
    const recommendations = await response.json();
    return recommendations;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    // Fallback logic
    const viewNames = viewedProducts.map(p => p.name.toLowerCase());
    return allProducts
      .filter(p => !viewNames.includes(p.name.toLowerCase()))
      .slice(0, 3);
  }
};

export const getPersonalizedGreeting = async (userName: string): Promise<string> => {
    try {
        const response = await fetch(`${BACKEND_URL}/ai/greet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName })
        });
        const data = await response.json();
        return data.greeting || `Welcome back to CosmicStore, ${userName}!`;
    } catch {
        return `Welcome back, ${userName}!`;
    }
}
