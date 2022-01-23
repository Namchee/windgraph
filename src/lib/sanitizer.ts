const entities: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;',
};

/**
 * Sanitize content into HTML entities
 *
 * @param {string} str raw HTML contents
 * @returns {string} escaped HTML contents
 */
export function sanitize(str: string): string {
  return str.replace(/[&<>"']/g, key => entities[key]);
}
