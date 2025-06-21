import { verifyImageWithGemini } from '../services/geminiService.js';
import supabase from '../services/supabaseService.js';

// POST /disasters/:id/verify-image
export async function verifyImage(req, res) {
  try {
    const { id } = req.params;
    const { image_url } = req.body;
    if (!image_url) return res.status(400).json({ error: "image_url required" });

    const cacheKey = `verify_image_${id}_${image_url}`;
    // Check cache
    const { data: cached } = await supabase
      .from('cache')
      .select('*')
      .eq('key', cacheKey)
      .single();
    if (cached && new Date(cached.expires_at) > new Date()) {
      return res.json(cached.value);
    }

    // Call Gemini API
    const status = await verifyImageWithGemini(image_url);

    // Cache response
    await supabase.from('cache').upsert({
      key: cacheKey,
      value: { status },
      expires_at: new Date(Date.now() + 3600 * 1000)
    });
    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
