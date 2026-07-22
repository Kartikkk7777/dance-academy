/**
 * Escapes HTML entities in a string to prevent XSS/injection.
 * This replaces characters that could be used to inject HTML or scripts.
 *
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Sanitizes an object by escaping all string values.
 * Non-string values are passed through unchanged.
 *
 * @param {Object} obj - The object whose string values should be escaped.
 * @returns {Object} A new object with all string values escaped.
 */
export function sanitizeObject(obj) {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = typeof value === 'string' ? escapeHtml(value) : value;
  }
  return sanitized;
}
