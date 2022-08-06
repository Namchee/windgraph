import { parse } from 'markdown-wasm';

import {
  injectClassToElement,
  injectDefaultClasses,
  injectFonts,
  injectTailwindConfig,
} from './injector';
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
  const config = injectTailwindConfig(content);
  const scripts = config ? `<script>${config}</script>` : '';

  const containerClass = injectDefaultClasses(
    content.containerClass || '',
    'container'
  );
  const titleClass = injectDefaultClasses(content.titleClass || '', 'title');
  const subtitleClass = injectDefaultClasses(
    content.subtitleClass || '',
    'subtitle'
  );
  const imageClass = injectDefaultClasses(content.imageClass || '', 'image');
  const footerClass = injectDefaultClasses(content.footerClass || '', 'footer');

  const titleContent = content.title ? sanitize(content.title) : '';
  const subtitleContent = content.subtitle ? sanitize(content.subtitle) : '';
  const footerContent = content.footer ? sanitize(content.footer) : '';

  let contentImage = '';

  if (content.image) {
    const isValid = await isValidImage(content.image);

    if (isValid) {
      contentImage = content.image;
    }
  }

  const title = titleContent
    ? injectClassToElement(parse(titleContent), titleClass, 'h1')
    : '';
  const subtitle = subtitleContent
    ? injectClassToElement(parse(subtitleContent), subtitleClass, 'h3')
    : '';
  const img = contentImage
    ? `<img src="${contentImage}" class="${imageClass}" />`
    : '';
  const footer = footerContent
    ? injectClassToElement(parse(footerContent), footerClass, 'p')
    : '';

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${fonts}
      <script src="https://cdn.tailwindcss.com"></script>
      ${scripts}
    </head>

    <body>
      <div class="${containerClass}">
        <div class="row-start-2 flex flex-col items-center">
          ${img}
          ${title}
          ${subtitle}
        </div>

        <div class="self-end row-start-3">
          ${footer}
        </div>
      </div>
    </body>
  </html>`;
}
