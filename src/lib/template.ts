import { parse } from 'markdown-wasm';

import {
  buildTemplate,
  injectClassToElement,
  injectDefaultClasses,
  injectFonts,
  injectScripts,
} from './injector';
import { sanitize } from './sanitizer';
import { isValidImage } from './utils';

import type { OpenGraphRequest } from './types';
import { TEMPLATES } from './template';

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
  const scripts = injectScripts(content);

  const template = TEMPLATES[content.template || 'blank'];

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

  return buildTemplate(template);
}
