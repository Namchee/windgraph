import { describe, it, expect } from 'vitest';

import { HEIGHT, WIDTH } from '@/constant/api';

import { generatePageOptions } from '@/lib/utils';

describe('generatePageOptions', () => {
  it('should fallback to JPG if format does not exist', () => {
    const req = {};

    const opts = generatePageOptions(req);

    expect(opts.format).toBe('jpeg');
  });

  it('should fallback to JPG if format is illegal', () => {
    const req = {
      format: 'webp',
    };

    const opts = generatePageOptions(req);

    expect(opts.format).toBe('jpeg');
  });

  it('should fix illegal width and height', () => {
    const req = {
      width: '-1',
      height: '0',
      format: 'png',
    };

    const opts = generatePageOptions(req);

    expect(opts.dimension.width).toBe(WIDTH);
    expect(opts.dimension.height).toBe(HEIGHT);
  });
});
