# 🌪️ Disaster Response Coordination Platform

> **Completed MERN stack assignment** showcasing real-time disaster response coordination using AI, geospatial data, and external APIs.

---

## ✅ Submission Overview

This is my submission for the **Disaster Response Coordination Platform** assignment. It demonstrates:

- Complex backend architecture using Node.js, Express.js, Supabase, and real-time WebSockets.
- Smart integrations with AI tools like **Google Gemini** for location extraction and image verification.
- Real-time social media data handling (mocked or using Twitter/Bluesky).
- Location-based resource mapping using **Supabase Geospatial Queries**.
- A minimal frontend for testing all backend functionalities.
- Use of **AI coding tools (Cursor/Windsurf)** for rapid development and backend generation.

> ⏱️ Assignment Duration: Completed within 1 day (8–10 hours)

---

## 🚀 Objective Achieved

- Built a complete backend system to manage and monitor disasters.
- Implemented AI and geospatial integrations.
- Provided real-time updates using Socket.IO.
- Deployed the frontend on **Vercel** and backend on **Render**.

Live Demo: [Insert Live Frontend URL]  
Backend API: [Insert Live Backend URL]  
GitHub Repo: [Insert GitHub Repo URL]

---

## 🧰 Tech Stack

| Category        | Tech                          |
|----------------|-------------------------------|
| **Frontend**   | React / HTML / Tailwind CSS (minimal UI) |
| **Backend**    | Node.js, Express.js, Socket.IO |
| **Database**   | Supabase (PostgreSQL + PostGIS) |
| **APIs**       | Google Gemini API, Mapbox / Google Maps / OpenStreetMap, Twitter API / Bluesky / Mock |
| **Dev Tools**  | Cursor / Windsurf, Postman, Vercel + Render |

---

## 🧠 Key Features Implemented

### ✅ Disaster Data Management
- CRUD functionality for disasters.
- Tags, descriptions, and location fields.
- Audit trail using JSONB.

### ✅ Location Extraction + Geocoding
- Extracted locations from descriptions using **Gemini API**.
- Converted to `lat/lng` using **Mapbox API** (fallback options included).

### ✅ Real-Time Social Media Monitoring
- Used **mock Twitter API** for disaster-related posts.
- Extracted hashtags like `#floodrelief`, `urgent`, and `#earthquake`.

### ✅ Geospatial Resource Mapping
- Used **Supabase geospatial queries** to map nearby resources (within 10km).
- Types include shelters, hospitals, etc.

### ✅ Official Updates Aggregation
- Web scraped government/relief websites using **Cheerio**.
- Cached data in Supabase for performance and rate-limiting.

### ✅ Image Verification
- Verified images using **Gemini API** to detect manipulation or validate disaster context.

### ✅ Real-Time WebSocket Updates
- Broadcasted events like:
  - `disaster_updated`
  - `social_media_updated`
  - `resources_updated`

---

## 🗃️ Database Structure (Supabase)

### Tables Used
- `disasters`
- `reports`
- `resources`
- `cache`

### Optimizations
- Geospatial indexes on `location`
- GIN index on tags
- Audit trails stored in JSONB
- Caching logic with 1-hour TTL

---

## ⚙️ API Routes (Implemented)

- `POST /disasters`
- `GET /disasters?tag=...`
- `PUT /disasters/:id`
- `DELETE /disasters/:id`
- `GET /disasters/:id/social-media`
- `GET /disasters/:id/resources?lat=...&lon=...`
- `GET /disasters/:id/official-updates`
- `POST /disasters/:id/verify-image`
- `POST /geocode`

---

## 🖥️ Frontend (Minimal UI)

- Disaster creation form
- Report submission form
- Displays for disasters, resources, and social media posts
- Real-time WebSocket-driven updates
- Built to test every backend endpoint

---

## 💡 AI Tools Used (Cursor/Windsurf)

- Generated Express API routes
- WebSocket integration scaffolding
- Supabase query helpers
- Caching and geospatial logic

> Example: `Windsurf generated the Gemini API image verification route and cache logic.`

---

## 🧪 Sample Data Used

```json
{
  "title": "NYC Flood",
  "location_name": "Manhattan, NYC",
  "description": "Heavy flooding in Manhattan",
  "tags": ["flood", "urgent"],
  "owner_id": "netrunnerX"
}
```

---

## 📦 Deployment Details

- **Frontend**: [Vercel]https://disaster-frontend-neon.vercel.app/
- **Backend**: [Render]https://disasterbackend.onrender.com
- **Database**: [Supabase](https://supabase.com)

---

## 📝 Final Notes

- Implemented all core features within deadline.
- Used AI tools for smart backend development and rapid prototyping.
- Used mock APIs where real integrations were restricted (e.g., Twitter API).
- Caching and rate-limiting added for reliability.

---

## 🙌 Credits

**Developed by: Devansh Rai**

---
