import { HEIGHT, WIDTH } from './../constant/api';

import type { PageOptions } from './types';

/**
 * Validate user request and perform auto correction with
 * default values
 *
 * @param {Record<string, string>} req open graph request
 * @returns {PageOptions} options for screen capture
 */
export function generatePageOptions(req: Record<string, string>): PageOptions {
  const width = Number.parseInt(req.width, 10);
  const height = Number.parseInt(req.height, 10);

  return {
    dimension: {
      width: !width || width < 0 ? WIDTH : width,
      height: !height || height < 0 ? HEIGHT : height,
    },
    format: req.format === 'png' ? 'png' : 'jpeg',
    compress: 'compress' in req || Boolean(req.compress),
  };
}
