import fetch from 'isomorphic-unfetch';

import { describe, it, beforeAll, afterEach, afterAll, expect } from 'vitest';

import { HEIGHT, WIDTH } from '@/constant/api';

import { imgMockServer } from '@/mocks/server';
import { isValidImage, generatePageOptions } from '@/lib/utils';

describe('isValidImage', () => {
  beforeAll(() => {
    global.fetch = fetch;
    imgMockServer.listen();
  });

  afterEach(() => {
    imgMockServer.resetHandlers();
  });

  afterAll(() => {
    imgMockServer.close();
  });

  it.concurrent('should return true', async () => {
    const result = await isValidImage('https://foo.bar/test.png');
    expect(result).toBe(true);
  });

  it.concurrent(
    'should return false when image cannot be fetched',
    async () => {
      const result = await isValidImage('https://foo.bar/foo.jpeg');
      expect(result).toBe(false);
    }
  );

  it.concurrent(
    'should return false when response is not a supported image',
    async () => {
      const result = await isValidImage('https://foo.bar/baz.html');
      expect(result).toBe(false);
    }
  );

  it.concurrent('should return false when url is invalid', async () => {
    const result = await isValidImage('ganteng');
    expect(result).toBe(false);
  });
});

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
