import { generateContent } from './../../src/lib/template';
import { captureScreen } from './../../src/lib/puppeteer';
import { compressImage } from './../../src/lib/compress';
import { generatePageOptions } from './../../src/lib/utils';

import { VercelRequest, VercelResponse } from '@vercel/node';

import type { OpenGraphRequest, PageOptions } from './../../src/lib/types';

/**
 * Sample route handler
 *
 * @param {VercelRequest} req request object
 * @param {VercelResponse} res response object
 * @returns {Promise<VercelResponse>} response object that contains generated
 * open graph image
 */
async function og(
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse> {
  const { query } = req;

  const ogRequest: OpenGraphRequest = {
    title: query.title as string,
    subtitle: query.subtitle as string,
    titleClass: query['title-class'] as string,
    image: query.image as string,
    containerClass: query['container-class'] as string,
    subtitleClass: query['subtitle-class'] as string,
    imageClass: query['image-class'] as string,
    fontSans: query['font-sans'] as string,
    fontSerif: query['font-serif'] as string,
    fontMono: query['font-mono'] as string,
  };

  const html = await generateContent(ogRequest);
  const options: PageOptions = generatePageOptions(
    query as Record<string, string>
  );

  let img = await captureScreen(html, options);

  if (options.compress) {
    img = await compressImage(img, options.format as string);
  }

  res.setHeader('Content-Length', img.byteLength);
  res.setHeader('Content-Type', `image/${options.format}`);

  return res.status(200).end(img);
}

export default og;
