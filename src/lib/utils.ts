import fetch from 'isomorphic-unfetch';

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