import supabase from '../services/supabaseService.js';

/**
 * Checks the Supabase cache table for a valid (non-expired) value.
 * @param {string} key - Cache key (should be unique per API call/input)
 * @returns {Promise<any|null>} - Cached value or null if expired/missing
 */
export async function getCache(key) {
  const { data, error } = await supabase
    .from('cache')
    .select('value, expires_at')
    .eq('key', key)
    .single();

  if (error || !data) return null;
  if (new Date(data.expires_at) < new Date()) return null;
  return data.value;
}

/**
 * Sets a value in the Supabase cache table with a TTL (default 1 hour)
 * @param {string} key - Cache key
 * @param {any} value - Value to cache (will be stored as JSON)
 * @param {number} ttlSeconds - Time-to-live in seconds (default 3600)
 */
export async function setCache(key, value, ttlSeconds = 3600) {
  const expires_at = new Date(Date.now() + ttlSeconds * 1000).toISOString();
  await supabase.from('cache').upsert({
    key,
    value,
    expires_at
  });
}
