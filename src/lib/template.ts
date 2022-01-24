import { parse } from 'markdown-wasm';

import { injectClass } from '@/lib/injector';
import { sanitize } from '@/lib/sanitizer';

import type { OpenGraphContent } from '@/lib/types';

/**
 * Generate content based on provided user input
 *
 * @param {OpenGraphContent} content user-provided open graph input
 * @returns {string} HTML string
 */
export function generateContent(content: OpenGraphContent): string {
  const font = content.fontFamily
    ? `<link href="https://fonts.googleapis.com/css2?family=${content.fontFamily}:wght@400;700&display=swap" rel="stylesheet">`
    : '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">';

  const containerClass = injectClass(content.containerClass || '', 'container');
  const titleClass = injectClass(content.titleClass || '', 'title');
  const subtitleClass = injectClass(content.subtitleClass || '', 'subtitle');
  const imageClass = injectClass(content.imageClass || '', 'image');

  const titleContent = content.title ? sanitize(content.title) : '';
  const subtitleContent = content.subtitle ? sanitize(content.subtitle) : '';

  const title = titleContent
    ? `<h1 class="${titleClass}">${parse(titleContent)}</h1>`
    : '';
  const subtitle = subtitleContent
    ? `<h3 class="${subtitleClass}">${parse(subtitleContent)}</h3>`
    : '';
  const img = content.image
    ? `<img src="${content.image}" class="${imageClass}" />`
    : '';

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400&display=swap" rel="stylesheet">
      ${font}
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            fontFamily: {
              sans: ['${content.fontFamily || 'Inter'}'],
              mono: ['Inconsolata'],
            },
          },
        };
      </script>
      <style>
        code {
          @apply font-mono whitespace-pre-wrap;
        }
      </style>
    </head>

    <body>
      <div class="${containerClass}">
        ${img}
        ${title}
        ${subtitle}
      </div>
    </body>
  </html>`;
}
