// backend/src/utils/priorityClassifier.js

/**
 * Classifies the priority of a text based on keywords.
 * @param {string} text - The text to analyze (e.g., social post, report)
 * @returns {string} "urgent" | "high" | "normal"
 */
export function classifyPriority(text) {
  if (!text) return "normal";
  const lower = text.toLowerCase();
  if (lower.includes("sos") || lower.includes("urgent") || lower.includes("emergency") || lower.includes("need help")) {
    return "urgent";
  }
  if (lower.includes("help") || lower.includes("asap") || lower.includes("immediate")) {
    return "high";
  }
  return "normal";
}
