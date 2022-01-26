import { describe, expect, it } from 'vitest';
import { generateContent } from '@/lib/template';

import type { OpenGraphContent } from '@/lib/types';

// Class injection are tested separately
describe('generateContent', () => {
  it('should generate normal template', () => {
    const content: OpenGraphContent = {
      title: 'Foo bar',
    };
    const template = generateContent(content);

    expect(template).toMatch(/h1/);
    expect(template).not.toMatch(/h3/);
    expect(template).not.toMatch(/img/);
  });

  it('should generate template with subtitles', () => {
    const content: OpenGraphContent = {
      title: 'Foo bar',
      subtitle: 'bar baz',
    };
    const template = generateContent(content);

    expect(template).toMatch(/h1/);
    expect(template).toMatch(/h3/);
    expect(template).not.toMatch(/img/);
  });

  it('should generate template with subtitles and images', () => {
    const content: OpenGraphContent = {
      title: 'Foo bar',
      subtitle: 'bar baz',
      image: 'skypack',
    };
    const template = generateContent(content);

    expect(template).toMatch(/h1/);
    expect(template).toMatch(/h3/);
    expect(template).toMatch(/img/);
  });

  it('should recognize custom fonts request', () => {
    const content: OpenGraphContent = {
      fontFamily: 'Open Sans',
    };
    const template = generateContent(content);

    expect(template).toMatch(
      '<link href="https://fonts.googleapis.com/css2?family=Open Sans:wght@400;700&display=swap" rel="stylesheet">'
    );
    expect(template).toMatch(
      '<link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400&display=swap" rel="stylesheet">'
    );
    expect(template).not.toMatch(
      '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">'
    );
  });
});
