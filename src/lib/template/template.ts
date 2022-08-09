import { OpenGraphRequest } from '../types';
import { BLANK_TEMPLATE } from './blank';
import { HERO_TEMPLATE } from './hero';

export abstract class Template {
  public constructor(protected readonly req: OpenGraphRequest) {}
}

const TEMPLATES: Record<string, string> = {
  hero: HERO_TEMPLATE,
  blank: BLANK_TEMPLATE,
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
