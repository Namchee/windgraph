import { BLANK_TEMPLATE } from './blank';
import { HERO_TEMPLATE } from './hero';
import { IMAGE_LEFT } from './image-left';
import { IMAGE_RIGHT } from './image-right';

const TEMPLATES: Record<string, string> = {
  'hero': HERO_TEMPLATE,
  'blank': BLANK_TEMPLATE,
  'image-left': IMAGE_LEFT,
  'image-right': IMAGE_RIGHT,
};

/**
 * Get the template string for open graph generation by key
 *
 * @param {string} key template identifier
 * @returns {string} HTML template for open graph generation, will return `blank`
 * if the key is not recognized
 */
export function getTemplate(key: string): string {
  if (key in TEMPLATES) {
    return TEMPLATES[key];
  }

  return TEMPLATES.blank;
}
