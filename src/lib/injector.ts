interface UtilMap {
  target: RegExp[];
  default: string;
}

type OpenGraphElement = 'container' | 'title' | 'subtitle' | 'image';

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
      default: 'grid place-items-center',
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
      target: [/\btracking-.+\b/],
      default: 'tracking-tight',
    },
    {
      target: [/\btext-(?!(left|center|right|justify))\b/],
      default: 'text-7xl',
    },
  ],
  subtitle: [
    {
      target: [/\btext-(left|center|right|justify)\b/],
      default: 'text-center',
    },
    {
      target: [/\btext-(?!(left|center|right|justify))\b/],
      default: 'text-2xl',
    },
  ],
  image: [
    {
      target: [/\bmax-w-.+\b/],
      default: 'max-w-sm',
    },
    {
      target: [/\bw-.+\b/],
      default: 'w-full',
    },
    {
      target: [/\bh-.+\b/],
      default: 'h-auto',
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
