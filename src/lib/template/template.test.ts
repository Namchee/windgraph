import { describe, it, expect } from 'vitest';
import { getTemplate } from './template';

import { BLANK_TEMPLATE } from './blank';
import { HERO_TEMPLATE } from './hero';

describe('getTemplate', () => {
  it('should return hero template', () => {
    const key = 'hero';
    const template = getTemplate(key);

    expect(template).toBe(HERO_TEMPLATE);
  });

  it('should return blank template', () => {
    const key = 'ERROR';
    const template = getTemplate(key);

    expect(template).toBe(BLANK_TEMPLATE);
  });
});
