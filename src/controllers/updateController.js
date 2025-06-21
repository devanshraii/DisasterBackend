import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import supabase from '../services/supabaseService.js';

// GET /disasters/:id/official-updates
export async function getOfficialUpdates(req, res) {
  try {
    const { id } = req.params;
    const cacheKey = `official_updates_${id}`;
    // Check cache
    const { data: cached } = await supabase
      .from('cache')
      .select('*')
      .eq('key', cacheKey)
      .single();
    if (cached && new Date(cached.expires_at) > new Date()) {
      return res.json(cached.value);
    }

    // Example: scrape FEMA (replace with real URLs as needed)
    const url = 'https://www.fema.gov/disaster-feed';
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const updates = [];
    $('.disaster-update').each((i, el) => {
      updates.push({
        title: $(el).find('h2').text(),
        date: $(el).find('.date').text()
      });
    });

    // Cache response
    await supabase.from('cache').upsert({
      key: cacheKey,
      value: updates,
      expires_at: new Date(Date.now() + 3600 * 1000)
    });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
