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
  { post: "#floodrelief Need food in NYC", user: "Amit Patel", priority: "urgent" },
  { post: "Evacuation ongoing in Brooklyn", user: "Emily Johnson", priority: "normal" },
  { post: "Power outage in Lower East Side, any updates?", user: "Riya Sharma", priority: "normal" },
  { post: "SOS: Trapped in apartment, water rising fast!", user: "Vikram Singh", priority: "urgent" },
  { post: "Volunteers needed at Red Cross shelter, Manhattan", user: "Lucas Martin", priority: "high" },
  { post: "Flooded roads near Queens, avoid the area!", user: "Priya Agarwal", priority: "normal" },
  { post: "Urgent: Medical supplies required at relief camp", user: "Sarah Williams", priority: "urgent" },
  { post: "Can someone help evacuate elderly residents on 5th Ave?", user: "Neha Verma", priority: "high" },
  { post: "Update: Food and water distribution at Central Park", user: "Mohammed Ali", priority: "normal" },
  { post: "Need help: Family stranded on rooftop in Jersey City", user: "David Smith", priority: "urgent" },
  { post: "Shelter open at Brooklyn High School", user: "Sonal Gupta", priority: "normal" },
  { post: "#earthquake Damage reported in Kathmandu valley", user: "Akshay Kumar", priority: "high" },
  { post: "Immediate rescue needed in Patan, buildings collapsed!", user: "Anna Müller", priority: "urgent" },
  { post: "Looking for missing relatives near Tribhuvan Airport", user: "Vishal Mehra", priority: "high" },
  { post: "Relief camp set up at Jawalakhel", user: "Samantha Lee", priority: "normal" },
  { post: "Urgent: Clean drinking water needed, contamination risk", user: "Rahul Sinha", priority: "urgent" },
  { post: "Volunteer doctors required at field hospital", user: "Elena Rossi", priority: "high" },
  { post: "Flood waters receding, cleanup starting in Dadar", user: "Shubham Joshi", priority: "normal" },
  { post: "Need blankets and warm clothes at shelter", user: "Isabella Garcia", priority: "high" },
  { post: "Stay safe! Follow official updates for evacuation info", user: "Arjun Desai", priority: "normal" }
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
