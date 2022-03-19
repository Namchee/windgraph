import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

/**
 * Perform image compression to PNG image end result
 *
 * @param {Buffer} img result image in `Buffer` format
 * @returns {Promise<Buffer>} compressed image
 */
export async function compressImage(img: Buffer): Promise<Buffer> {
  return imagemin.buffer(img, {
    plugins: [
      imageminPngquant({
        quality: [0.7, 0.75],
      }),
    ],
  });
}
