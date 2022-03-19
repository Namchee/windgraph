import { parse } from 'markdown-wasm';

import { injectClass, injectFonts, injectTailwindConfig } from './injector';
import { sanitize } from './sanitizer';
import { isValidImage } from './utils';

import type { OpenGraphRequest } from './types';

/**
 * Generate content based on provided user input
 *
 * @param {OpenGraphRequest} content user-provided open graph input
 * @returns {string} HTML string
 */
export async function generateContent(
  content: OpenGraphRequest
): Promise<string> {
  const fonts = injectFonts(content);
  const preconnect = fonts.length
    ? [
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      ]
    : [];
  const config = injectTailwindConfig(content);
  const scripts = config ? `<script>${config}</script>` : '';

  const containerClass = injectClass(content.containerClass || '', 'container');
  const titleClass = injectClass(content.titleClass || '', 'title');
  const subtitleClass = injectClass(content.subtitleClass || '', 'subtitle');
  const imageClass = injectClass(content.imageClass || '', 'image');

  const titleContent = content.title ? sanitize(content.title) : '';
  const subtitleContent = content.subtitle ? sanitize(content.subtitle) : '';

  let contentImage = '';

  if (content.image) {
    const isValid = await isValidImage(content.image);

    if (isValid) {
      contentImage = content.image;
    }
  }

  const title = titleContent
    ? `<h1 class="${titleClass}">${parse(titleContent)}</h1>`
    : '';
  const subtitle = subtitleContent
    ? `<h3 class="${subtitleClass}">${parse(subtitleContent)}</h3>`
    : '';
  const img = contentImage
    ? `<img src="${contentImage}" class="${imageClass}" />`
    : '';

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${preconnect.join('\n')}
      ${fonts.join('\n')}
      <script src="https://cdn.tailwindcss.com"></script>
      ${scripts}
    </head>

    <body>
      <div class="${containerClass}">
        ${img}
        <div>
          ${title}
          ${subtitle}
        </div>
      </div>
    </body>
  </html>`;
}
