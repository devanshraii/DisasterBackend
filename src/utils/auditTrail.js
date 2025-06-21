// backend/src/utils/auditTrail.js

/**
 * Adds a new audit trail entry to the audit_trail array.
 * @param {Array} trail - The existing audit trail (or [] if new)
 * @param {string} action - The action performed (e.g., "create", "update", "delete")
 * @param {string} user_id - The user performing the action
 * @returns {Array} The updated audit trail array
 */
export function addAuditTrail(trail = [], action, user_id) {
  const entry = {
    action,
    user_id,
    timestamp: new Date().toISOString()
  };
  // Ensure trail is always an array
  const currentTrail = Array.isArray(trail) ? trail : [];
  return [...currentTrail, entry];
}
