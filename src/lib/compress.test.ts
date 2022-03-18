import { describe, vi, it, expect, afterEach } from 'vitest';

import { compressImage } from '@/lib/compress';

const encodeFn = vi.fn();
const closeFn = vi.fn();

vi.mock('@squoosh/lib', () => ({
  ImagePool: vi.fn(() => ({
    ingestImage: () => ({
      decoded: Promise.resolve(),
      encode: encodeFn,
      encodedWith: {
        mozjpeg: {
          binary: '\xff\xfa\xc3\x4e',
        },
        oxipng: {
          binary: '\xff\xfa\xc3\x4d',
        },
      },
    }),
    close: closeFn,
  })),
}));

describe('compressImage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should compress the image in jpeg format', async () => {
    const img = Buffer.from('', 'ascii');

    await compressImage(img, 'jpeg');

    expect(encodeFn).toHaveBeenCalledTimes(1);
    expect(closeFn).toHaveBeenCalledTimes(1);
  });

  it('should compress the image in png format', async () => {
    const img = Buffer.from('', 'ascii');

    await compressImage(img, 'png');

    expect(encodeFn).toHaveBeenCalledTimes(1);
    expect(closeFn).toHaveBeenCalledTimes(1);
  });
});
