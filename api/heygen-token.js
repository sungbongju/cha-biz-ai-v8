// api/heygen-token.js — Vercel Serverless
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;
  if (!HEYGEN_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': HEYGEN_API_KEY
      }
    });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
