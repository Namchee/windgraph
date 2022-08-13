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

import type { OpenGraphRequest, TemplateMap } from './types';

import { getTemplate } from './template/template';

/**
 * Generate content based on provided user input
 *
 * @param {OpenGraphRequest} content user-provided open graph input
 * @returns {string} HTML string
 */
export async function generateContent(
  content: OpenGraphRequest
): Promise<string> {
  const template: string = getTemplate(content.template || 'blank');
  const templateMap: Partial<TemplateMap> = {
    fonts: injectFonts(content),
    scripts: injectScripts(content),
  };

  const containerClass = injectDefaultClasses(
    content.containerClass || '',
    'container'
  );
  const titleClass = injectDefaultClasses(content.titleClass || '', 'title');
  const subtitleClass = injectDefaultClasses(
    content.subtitleClass || '',
    'subtitle'
  );
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
    ? `<img src="${contentImage}" class="${content.imageClass || ''}" />`
    : '';
  const footer = footerContent
    ? injectClassToElement(parse(footerContent), footerClass, 'p')
    : '';

  templateMap.container = containerClass;
  templateMap.title = title;
  templateMap.subtitle = subtitle;
  templateMap.image = img;
  templateMap.footer = footer;

  return buildTemplate(template, templateMap);
}
