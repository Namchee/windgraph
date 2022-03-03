import { generateContent } from './../../src/lib/template';
import { captureScreen } from './../../src/lib/puppeteer';

import { VercelRequest, VercelResponse } from '@vercel/node';

import type { OpenGraphContent } from '@/lib/types';

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

  const content: OpenGraphContent = {
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

  const width = query.width as string;
  const height = query.height as string;

  const html = await generateContent(content);
  const img = await captureScreen(html, {
    dimension: {
      width: Number.parseInt(width as string, 10),
      height: Number.parseInt(height as string, 10),
    },
  });

  res.setHeader('Content-Length', img.byteLength);

  return res.status(200).end(img);
}

export default og;
