import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Sample route handler
 *
 * @param {NextApiRequest} req request object
 * @param {NextApiResponse} res response object
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json({ name: 'John Doe' });
}
