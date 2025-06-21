// import fetch from 'node-fetch';
// import * as cheerio from 'cheerio';
// import supabase from '../services/supabaseService.js';

// // GET /disasters/:id/official-updates
// export async function getOfficialUpdates(req, res) {
//   try {
//     const { id } = req.params;
//     const cacheKey = `official_updates_${id}`;
//     // Check cache
//     const { data: cached } = await supabase
//       .from('cache')
//       .select('*')
//       .eq('key', cacheKey)
//       .single();
//     if (cached && new Date(cached.expires_at) > new Date()) {
//       return res.json(cached.value);
//     }

//     // Example: scrape FEMA (replace with real URLs as needed)
//     const url = 'https://www.fema.gov/disaster-feed';
//     const response = await fetch(url);
//     const html = await response.text();
//     const $ = cheerio.load(html);
//     const updates = [];
//     $('.disaster-update').each((i, el) => {
//       updates.push({
//         title: $(el).find('h2').text(),
//         date: $(el).find('.date').text()
//       });
//     });

//     // Cache response
//     await supabase.from('cache').upsert({
//       key: cacheKey,
//       value: updates,
//       expires_at: new Date(Date.now() + 3600 * 1000)
//     });
//     res.json(updates);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }
// backend/src/controllers/updateController.js

export async function getOfficialUpdates(req, res) {
  try {
    // Mock data (replace or expand as needed)
    const updates = [
      {
        title: "Flood Relief Operations Intensified in Mumbai",
        date: "2025-06-20",
        agency: "National Disaster Response Force",
        url: "https://ndrf.gov.in/updates/mumbai-flood-2025"
      },
      {
        title: "FEMA Declares Emergency for New York Flooding",
        date: "2025-06-18",
        agency: "FEMA",
        url: "https://www.fema.gov/disaster/12345"
      },
      {
        title: "Red Cross Sets Up Shelters in Kathmandu",
        date: "2025-06-15",
        agency: "Red Cross",
        url: "https://www.redcross.org/news/kathmandu-shelters"
      },
      {
        title: "Cyclone Relief: Food and Water Distribution in Odisha",
        date: "2025-06-10",
        agency: "Odisha State Disaster Management Authority",
        url: "https://osdma.org/updates/cyclone-relief-2025"
      },
      {
        title: "UNICEF Provides Emergency Kits for Children in Flood Zones",
        date: "2025-06-08",
        agency: "UNICEF",
        url: "https://www.unicef.org/press-releases/flood-relief-2025"
      }
    ];
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
