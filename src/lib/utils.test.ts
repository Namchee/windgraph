import fetch from 'isomorphic-unfetch';

import { describe, it, beforeAll, afterEach, afterAll, expect } from 'vitest';

import { imgMockServer } from '@/mocks/server';
import { isValidImage } from './utils';

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
