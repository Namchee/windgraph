import fetch from 'isomorphic-unfetch';

import { describe, it, beforeAll, afterEach, afterAll, expect } from 'vitest';

import { imgMockServer } from '@/mocks/server';
import { isValidImage, validateQuery } from '@/lib/utils';
import { OpenGraphRequest } from './types';

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

describe('validateQuery', () => {
  it('should fallback to JPG if format does not exist', () => {
    const req: OpenGraphRequest = {};

    validateQuery(req);

    expect(req.format).toBe('jpg');
  });

  it('should fallback to JPG if format is illegal', () => {
    const req: OpenGraphRequest = {
      format: 'webp',
    };

    validateQuery(req);

    expect(req.format).toBe('jpg');
  });

  it('should not modify anything', () => {
    const req: OpenGraphRequest = {
      format: 'png',
    };

    validateQuery(req);

    expect(req.format).toBe('png');
  });
});
