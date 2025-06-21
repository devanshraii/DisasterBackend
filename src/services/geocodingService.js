

import fetch from 'node-fetch';

/**
 * Geocode a location name using OpenStreetMap Nominatim (no API key required)
 * @param {string} locationName
 * @returns {Promise<{lat: number, lon: number}>}
 */
export async function geocodeLocation(locationName) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'DisasterResponsePlatform/1.0 (your@email.com)' }
  });
  const data = await response.json();
  if (data.length > 0) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }
  throw new Error('Location not found');
}
