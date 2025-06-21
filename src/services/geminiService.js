import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Extract location from description using Gemini API
export async function extractLocation(description) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;
  const prompt = `Extract location from: ${description}`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  // Parse the location from the response
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

// Verify disaster image using Gemini API
export async function verifyImageWithGemini(image_url) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + GEMINI_API_KEY;
  const prompt = `Analyze image at ${image_url} for signs of manipulation or disaster context.`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  // Parse the verification result
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.toLowerCase().includes('authentic') ? 'verified' : 'suspicious';
}
