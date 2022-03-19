import imagemin from 'imagemin';
import imageminMozjpg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

const pluginOption = {
  jpeg: imageminMozjpg({
    quality: 70,
  }),
  png: imageminPngquant({
    quality: [0.5, 0.7],
  }),
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
  format: 'jpeg' | 'png'
): Promise<Buffer> {
  return imagemin.buffer(img, {
    plugins: [pluginOption[format]],
  });
}
