import supabase from '../services/supabaseService.js';
import { extractLocation } from '../services/geminiService.js';
import { geocodeLocation } from '../services/geocodingService.js';

import { addAuditTrail } from '../utils/auditTrail.js';
import { getIO } from '../socket.js';

export async function createDisaster(req, res) {
  try {
    const { title, description, tags } = req.body;
    const owner_id = req.user.id;
    const location_name = await extractLocation(description);
    const coords = await geocodeLocation(location_name);
    const audit = addAuditTrail([], "create", owner_id);

    const { data, error } = await supabase
      .from('disasters')
      .insert([{
        title, location_name, location: `POINT(${coords.lon} ${coords.lat})`,
        description, tags, owner_id, audit_trail: audit
      }])
      .select('*');
    if (error) return res.status(500).json({ error });
    getIO().emit('disaster_updated', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getDisasters(req, res) {
  const { tag } = req.query;
  let query = supabase.from('disasters').select('*');
  if (tag) query = query.contains('tags', [tag]);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error });
  res.json(data);
}

export async function updateDisaster(req, res) {
  const { id } = req.params;
  const { title, description, tags } = req.body;
  const owner_id = req.user.id;
  const { data: disaster } = await supabase.from('disasters').select('audit_trail').eq('id', id).single();
  const audit = addAuditTrail(disaster.audit_trail, "update", owner_id);

  const { data, error } = await supabase
    .from('disasters')
    .update({ title, description, tags, audit_trail: audit })
    .eq('id', id)
    .select('*');
  if (error) return res.status(500).json({ error });
  getIO().emit('disaster_updated', data[0]);
  res.json(data[0]);
}

export async function deleteDisaster(req, res) {
  const { id } = req.params;
  const { error } = await supabase.from('disasters').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  getIO().emit('disaster_updated', { id, deleted: true });
  res.json({ success: true });
}
