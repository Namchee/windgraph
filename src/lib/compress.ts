import { ImagePool } from '@squoosh/lib';

const encodeOptions = {
  mozjpeg: {
    quality: 70,
  },
  oxipng: {
    level: 4,
  },
};

/**
 * Perform image compression to image end result
 *
 * @param {Buffer} img result image in `Buffer` format
 * @param {string} format image format
 * @returns {Promise<Buffer>} compressed image
 */
export async function compressImage(
  img: Buffer,
  format: string
): Promise<Buffer> {
  const imagePool = new ImagePool();

  const image = imagePool.ingestImage(img);
  await image.decoded;

  await image.encode(encodeOptions);

  let result = image.encodedWith.mozjpeg;

  if (format === 'png') {
    result = image.encodedWith.oxipng;
  }

  const encoded = await result;

  const resultBuffer = Buffer.from(encoded.binary, 'binary');

  await imagePool.close();

  return resultBuffer;
}
