import { parse } from 'markdown-wasm';

import { OpenGraphContent } from '@/lib/types';

/**
 * Generate content based on provided user input
 *
 * @param {OpenGraphContent} content user-provided open graph input
 * @returns {string} HTML string
 */
export function generateContent(content: OpenGraphContent): string {
  const img = content.image ? `<img src=${content.image} />` : '';
  const font = content.fontFamily
    ? `<link href="https://fonts.googleapis.com/css2?family=${content.fontFamily}:wght@400;700&display=swap" rel="stylesheet">`
    : '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">';

  let containerClass =
    content.containerClass || 'w-screen h-screen grid place-items-center p-12';
  const titleClass =
    content.titleClass || 'text-6xl leading-relaxed tracking-tight';
  const subtitleClass = content.subtitleClass || 'mt-4 text-2xl';

  const title = content.title
    ? `<h1 class="${titleClass}">${parse(content.title)}</h1>`
    : '';
  const subtitle = content.subtitle
    ? `<h3 class=${subtitleClass}>${parse(content.subtitle)}</h3>`
    : '';

  if (!containerClass.includes('w-screen h-screen')) {
    containerClass = `${containerClass} w-screen h-screen`;
  }

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
