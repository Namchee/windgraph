import { describe, vi, it, expect, afterEach } from 'vitest';

import { compressImage } from '@/lib/compress';

const bufferFn = vi.fn();

vi.mock('imagemin', () => ({
  default: {
    buffer: () => bufferFn(),
  },
}));

vi.mock('imagemin-mozjpeg', () => ({
  default: vi.fn(),
}));

vi.mock('imagemin-pngquant', () => ({
  default: vi.fn(),
}));

describe('compressImage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should compress the image in jpeg format', async () => {
    const img = Buffer.from('', 'ascii');

    await compressImage(img, 'jpeg');

    expect(bufferFn).toHaveBeenCalledTimes(1);
  });

  it('should compress the image in png format', async () => {
    const img = Buffer.from('', 'ascii');

    await compressImage(img, 'png');

    expect(bufferFn).toHaveBeenCalledTimes(1);
  });
});
