import supabase from '../services/supabaseService.js';
import { extractLocation } from '../services/geminiService.js';
import { geocodeLocation } from '../services/geocodingService.js';
import { addAuditTrail } from '../utils/auditTrail.js';
import { getIO } from '../socket.js';

export async function createDisaster(req, res) {
  try {
    // Log incoming request
    console.log("POST /disasters body:", req.body);

    let { title, description, tags } = req.body;
    const owner_id = req.user?.id || "netrunnerX";

    // Ensure tags is an array
    if (typeof tags === "string") tags = tags.split(",").map(t => t.trim());
    if (!Array.isArray(tags)) tags = [];

    // Step 1: Extract location name using Gemini
    let location_name = "";
try {
  location_name = await extractLocation(description);
  if (!location_name) {
    console.warn("Gemini returned empty location; using fallback");
    location_name = "Unknown Location"; // or reject with a clear error
  }
} catch (err) {
  console.error("Gemini location extraction failed:", err);
  return res.status(400).json({ error: "Failed to extract location from description." });
}

    // Step 2: Geocode location name
    let coords;
    try {
      coords = await geocodeLocation(location_name);
      if (!coords || isNaN(coords.lat) || isNaN(coords.lon)) throw new Error("Invalid coordinates.");
      console.log("Geocoded coordinates:", coords);
    } catch (err) {
      console.error("Geocoding failed:", err);
      return res.status(400).json({ error: "Failed to geocode location name." });
    }

    // Step 3: Build audit trail
    const audit = addAuditTrail([], "create", owner_id);

    // Step 4: Insert into Supabase
    const { data, error } = await supabase
      .from('disasters')
      .insert([{
        title,
        location_name,
        location: `POINT(${coords.lon} ${coords.lat})`,
        description,
        tags,
        owner_id,
        audit_trail: audit
      }])
      .select('*'); // Requires SELECT policy!

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message || error });
    }

    getIO().emit('disaster_updated', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Unhandled error in createDisaster:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

export async function getDisasters(req, res) {
  try {
    const { tag } = req.query;
    let query = supabase.from('disasters').select('*');
    if (tag) query = query.contains('tags', [tag]);
    const { data, error } = await query;
    if (error) {
      console.error("Supabase getDisasters error:", error);
      return res.status(500).json({ error: error.message || error });
    }
    res.json(data);
  } catch (err) {
    console.error("Unhandled error in getDisasters:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

export async function updateDisaster(req, res) {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const owner_id = req.user?.id || "netrunnerX";
    const { data: disaster, error: fetchError } = await supabase.from('disasters').select('audit_trail').eq('id', id).single();
    if (fetchError) {
      console.error("Supabase fetch error in updateDisaster:", fetchError);
      return res.status(500).json({ error: fetchError.message || fetchError });
    }
    const audit = addAuditTrail(disaster.audit_trail, "update", owner_id);

    const { data, error } = await supabase
      .from('disasters')
      .update({ title, description, tags, audit_trail: audit })
      .eq('id', id)
      .select('*');
    if (error) {
      console.error("Supabase updateDisaster error:", error);
      return res.status(500).json({ error: error.message || error });
    }
    getIO().emit('disaster_updated', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error("Unhandled error in updateDisaster:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

export async function deleteDisaster(req, res) {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('disasters').delete().eq('id', id);
    if (error) {
      console.error("Supabase deleteDisaster error:", error);
      return res.status(500).json({ error: error.message || error });
    }
    getIO().emit('disaster_updated', { id, deleted: true });
    res.json({ success: true });
  } catch (err) {
    console.error("Unhandled error in deleteDisaster:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
