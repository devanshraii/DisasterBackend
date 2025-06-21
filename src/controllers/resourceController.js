import supabase from '../services/supabaseService.js';
import { getIO } from '../socket.js';

// GET /disasters/:id/resources?lat=...&lon=...
export async function getResources(req, res) {
  try {
    const { id } = req.params;
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

    // Find resources within 10km of the given point for this disaster
    const { data, error } = await supabase
      .rpc('nearby_resources', {
        disaster_id: id,
        point: `POINT(${lon} ${lat})`,
        radius: 10000 // meters
      });
    if (error) return res.status(500).json({ error });

    getIO().emit('resources_updated', data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
