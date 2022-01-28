import { parse } from 'markdown-wasm';

import { injectClass } from '@/lib/injector';
import { sanitize } from '@/lib/sanitizer';
import { getFontLinks, isValidImage } from '@/lib/utils';

import type { OpenGraphContent } from '@/lib/types';

/**
 * Generate content based on provided user input
 *
 * @param {OpenGraphContent} content user-provided open graph input
 * @returns {string} HTML string
 */
export async function generateContent(
  content: OpenGraphContent
): Promise<string> {
  const fonts = getFontLinks(content);
  const font = content.fontFamily
    ? `<link href="https://fonts.googleapis.com/css2?family=${content.fontFamily}:wght@400;700&display=swap" rel="stylesheet">`
    : '';

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
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      ${font}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            fontFamily: {
              sans: ['${content.fontFamily || 'Inter'}'],
            },
          },
        };
      </script>
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
