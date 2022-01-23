import type { NextApiRequest, NextApiResponse } from 'next';
import type { OpenGraphContent } from '@/lib/types';
import { generateContent } from '@/lib/template';
import { captureScreen } from '@/lib/puppeteer';

/**
 * Sample route handler
 *
 * @param {NextApiRequest} req request object
 * @param {NextApiResponse} res response object
 * @returns {Promise<NextApiResponse>} response object that contains generated
 * open graph image
 */
async function og(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse> {
  const { query } = req;

  const content: OpenGraphContent = {
    title: query.title as string,
    subtitle: query.subtitle as string,
    titleClass: query['title-class'] as string,
    image: query.img as string,
    containerClass: query['container-class'] as string,
    fontFamily: query.font as string,
    subtitleClass: query['subtitle-class'] as string,
  };

  const width = query.width as string;
  const height = query.height as string;

  const html = generateContent(content);
  const img = await captureScreen(html, {
    dimension: {
      width: Number.parseInt(width as string, 10),
      height: Number.parseInt(height as string, 10),
    },
  });

  res.setHeader('X-Powered-By', 'Namchee');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Length', img.byteLength);

  return res.status(200).end(img);
}

export default og;
