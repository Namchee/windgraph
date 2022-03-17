import fetch from 'isomorphic-unfetch';

import { HEIGHT, WIDTH } from './../constant/api';

import type { PageOptions } from './types';

/**
 * Check if the provided image url directs to an image resource
 *
 * @param {string} url provided image url
 * @returns {Promise<boolean>} whether if the provided URL responds
 * with an image or not
 */
export async function isValidImage(url: string): Promise<boolean> {
  try {
    const parsedUrl = new URL(url);
    const result = await fetch(parsedUrl.toString());

    return (
      result.ok &&
      Boolean(result.headers.get('Content-Type')) &&
      (result.headers.get('Content-Type') as string).startsWith('image')
    );
  } catch (err) {
    return false;
  }
}

/**
 * Validate user request and perform auto correction with
 * default values
 *
 * @param {Record<string, string>} req open graph request
 * @returns {PageOptions} options for screen capture
 */
export function generatePageOptions(req: Record<string, string>): PageOptions {
  return {
    dimension: {
      width: Number.parseInt(req.width, 10) || WIDTH,
      height: Number.parseInt(req.height, 10) || HEIGHT,
    },
    format: ['jpg', 'jpeg'].includes(req.format) ? 'jpg' : 'png',
    compress: Boolean(req.compress),
  };
}
