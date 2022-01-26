import { generateContent } from '@/lib/template';
import { captureScreen } from '@/lib/puppeteer';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { OpenGraphContent } from '@/lib/types';

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
    image: query.image as string,
    containerClass: query['container-class'] as string,
    fontFamily: query.font as string,
    subtitleClass: query['subtitle-class'] as string,
    imageClass: query['image-class'] as string,
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

  res.setHeader('X-Powered-By', 'Namchee');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Length', img.byteLength);
  // Cache for one month
  res.setHeader(
    'Cache-Control',
    'public, stale-while-revalidate=2629746, max-age=2629746'
  );

  return res.status(200).end(img);
}

export default og;
