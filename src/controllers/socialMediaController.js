import supabase from '../services/supabaseService.js';
import { getIO } from '../socket.js';

// GET /disasters/:id/social-media
export async function getSocialMedia(req, res) {
  try {
    const { id } = req.params;
    const cacheKey = `social_media_${id}`;
    // Check cache
    const { data: cached } = await supabase
      .from('cache')
      .select('*')
      .eq('key', cacheKey)
      .single();
    if (cached && new Date(cached.expires_at) > new Date()) {
      return res.json(cached.value);
    }

    // Mock data (replace with Twitter/Bluesky API if available)
    const socialMedia = [
      { post: "#floodrelief Need food in NYC", user: "citizen1", priority: "urgent" },
      { post: "Evacuation ongoing in Brooklyn", user: "citizen2", priority: "normal" }
    ];

    // Cache response
    await supabase.from('cache').upsert({
      key: cacheKey,
      value: socialMedia,
      expires_at: new Date(Date.now() + 3600 * 1000)
    });

    getIO().emit('social_media_updated', socialMedia);
    res.json(socialMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
