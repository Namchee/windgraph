import type { OpenGraphRequest } from './types';

interface UtilMap {
  target: RegExp[];
  default: string;
}

type OpenGraphElement = 'container' | 'title' | 'subtitle' | 'image' | 'footer';

const utilsMap: Record<OpenGraphElement, UtilMap[]> = {
  container: [
    {
      target: [/\bw-.+\b/],
      default: 'w-screen',
    },
    {
      target: [/\bh-.+\b/],
      default: 'h-screen',
    },
    {
      target: [/\bp-.+\b/],
      default: 'p-16',
    },
    {
      target: [
        /\bblock\b/,
        /\binline-block\b/,
        /\binline\b/,
        /\bflow-root\b/,
        /\bhidden\b/,
        /\bflex\b/,
        /\binline-flex\b/,
        /\bgrid\b/,
        /\binline-grid\b/,
      ],
      default: 'grid grid-rows-3 place-items-center',
    },
  ],
  title: [
    {
      target: [/\btext-(left|center|right|justify)\b/],
      default: 'text-center',
    },
    {
      target: [/\bleading-.+\b/],
      default: 'leading-relaxed',
    },
    {
      target: [
        /\btext-([\d.]+)?(xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|px|rem|em|ch|vh|vw|ex)\b/,
      ],
      default: 'text-7xl',
    },
  ],
  subtitle: [
    {
      target: [/\btext-(left|center|right|justify)\b/],
      default: 'text-center',
    },
    {
      target: [
        /\btext-([\d.]+)?(xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|px|rem|em|ch|vh|vw|ex)\b/,
      ],
      default: 'text-3xl',
    },
  ],
  footer: [
    {
      target: [/\btext-(left|center|right|justify)\b/],
      default: 'text-center',
    },
    {
      target: [
        /\btext-([\d.]+)?(xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|px|rem|em|ch|vh|vw|ex)\b/,
      ],
      default: 'text-sm',
    },
  ],
  image: [
    {
      target: [/\bw-.+\b/],
      default: 'w-32',
    },
    {
      target: [/\bh-.+\b/],
      default: 'h-32',
    },
    {
      target: [/\bmb-.+\b/],
      default: 'mb-4',
    },
  ],
};

/**
 * Inject default container style if custom styles are not present
 *
 * @param {string} style user-provided CSS classes
 * @param {OpenGraphElement} el element type to be applied
 * @returns {string} user-provided CSS classes with fallback values
 */
export function injectClass(style: string, el: OpenGraphElement): string {
  let injected = style.trim();

  for (const utils of utilsMap[el]) {
    const hasUtils = utils.target.some(p => p.test(style));

    if (!hasUtils) {
      injected = `${injected} ${utils.default}`;
    }
  }

  return injected.trim();
}

/**
 * Dynamically generated Google Fonts links based on user input
 *
 * @param {OpenGraphRequest} content user input
 * @returns {string[]} list of font links
 */
export function injectFonts(content: OpenGraphRequest): string[] {
  return Object.entries(content)
    .filter(([key, value]) => key.startsWith('font') && Boolean(value))
    .map(
      font =>
        `<link href="https://fonts.googleapis.com/css2?family=${font[1]}:wght@400;700&display=swap" rel="stylesheet">`
    );
}

/**
 * Dynamically generate Tailwind config based on user-input
 *
 * @param {OpenGraphRequest} content user input
 * @returns {string} Tailwind config as a string
 */
export function injectTailwindConfig(content: OpenGraphRequest): string {
  const fonts = Object.entries(content).filter(
    ([key, value]) => key.startsWith('font') && Boolean(value)
  );

  if (!fonts.length) {
    return '';
  }

  return `tailwind.config = {
    theme: {
      fontFamily: {
        ${fonts
          .map(
            ([key, value]) =>
              `${key.replace('font', '').toLowerCase()}: ['${value}']`
          )
          .join(',\n')}
      }
    }
  }`;
}
