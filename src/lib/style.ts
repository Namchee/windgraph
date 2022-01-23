interface UtilMap {
  target: RegExp[];
  default: string;
}

// TODO: implement better ways to map this
const containerUtils: UtilMap[] = [
  {
    target: [/\bw-\b/],
    default: 'w-screen',
  },
  {
    target: [/\bh-\b/],
    default: 'h-screen',
  },
  {
    target: [/\bp-\b/],
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
];

/**
 * Inject default container style if custom styles are not present
 *
 * @param {string} style user-provided CSS classes
 * @returns {string} user-provided CSS classes with fallback values
 */
export function injectContainerClass(style: string): string {
  let injected = style.trim();

  for (const utils of containerUtils) {
    const hasUtils = utils.target.some(p => p.test(style));

    if (!hasUtils) {
      injected = `${injected} ${utils.default}`;
    }
  }

  return injected;
}
