import { describe, it, expect } from 'vitest';

import { injectClass, injectFonts, injectTailwindConfig } from '@/lib/injector';

import type { OpenGraphRequest } from '@/lib/types';

describe('injectClass', () => {
  describe('injectContainerClass', () => {
    it('should inject some fallback classes', () => {
      const input = 'p-24';
      const output = injectClass(input, 'container');

      const classes = output.split(' ');
      expect(classes).toContain('w-screen');
      expect(classes).toContain('h-screen');
      expect(classes).not.toContain('p-16');
      expect(classes).toContain('p-24');
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-col');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('items-center');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectClass(input, 'container');

      const classes = output.split(' ');
      expect(classes).toContain('w-screen');
      expect(classes).toContain('h-screen');
      expect(classes).toContain('p-16');
      expect(classes).toContain('flex');
      expect(classes).toContain('flex-col');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('items-center');
    });

    it('should not inject any classes', () => {
      const input = 'w-full h-full p-48 flex justify-center items-center';
      const output = injectClass(input, 'container');

      const classes = output.split(' ');
      expect(classes).toContain('w-full');
      expect(classes).toContain('h-full');
      expect(classes).toContain('p-48');
      expect(classes).toContain('flex');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('items-center');

      expect(classes).not.toContain('w-screen');
      expect(classes).not.toContain('h-screen');
      expect(classes).not.toContain('p-16');
      expect(classes).not.toContain('flex-col');
    });
  });

  describe('injectTitleClass', () => {
    it('should inject some fallback classes', () => {
      const input = 'text-5xl';
      const output = injectClass(input, 'title');

      const classes = output.split(' ');

      expect(classes).toContain('text-center');
      expect(classes).toContain('text-5xl');
      expect(classes).not.toContain('text-7xl');
      expect(classes).toContain('leading-relaxed');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectClass(input, 'title');

      const classes = output.split(' ');
      expect(classes).toContain('text-center');
      expect(classes).toContain('text-7xl');
      expect(classes).toContain('leading-relaxed');
    });

    it('should not inject any classes', () => {
      const input =
        'text-4xl leading-loose tracking-wider text-red-500 text-left';
      const output = injectClass(input, 'title');

      const classes = output.split(' ');

      expect(classes).toContain('text-left');
      expect(classes).toContain('text-red-500');
      expect(classes).toContain('text-4xl');
      expect(classes).toContain('leading-loose');
      expect(classes).toContain('tracking-wider');

      expect(classes).not.toContain('text-7xl');
      expect(classes).not.toContain('leading-relaxed');
    });
  });

  describe('injectSubtitleClass', () => {
    it('should inject some fallback classes', () => {
      const input = 'text-3xl';
      const output = injectClass(input, 'subtitle');

      const classes = output.split(' ');

      expect(classes).toContain('text-center');
      expect(classes).toContain('text-3xl');
      expect(classes).not.toContain('text-2xl');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectClass(input, 'subtitle');

      const classes = output.split(' ');
      expect(classes).toContain('text-center');
      expect(classes).toContain('text-3xl');
    });

    it('should not inject any classes', () => {
      const input = 'text-xl text-right text-gray-400';
      const output = injectClass(input, 'subtitle');

      const classes = output.split(' ');

      expect(classes).toContain('text-right');
      expect(classes).toContain('text-gray-400');
      expect(classes).toContain('text-xl');

      expect(classes).not.toContain('text-2xl');
      expect(classes).not.toContain('text-center');
    });
  });

  describe('injectImageClass', () => {
    it('should inject some fallback classes', () => {
      const input = 'w-xl';
      const output = injectClass(input, 'image');

      const classes = output.split(' ');

      expect(classes).toContain('max-w-[40vh]');
      expect(classes).toContain('w-xl');
      expect(classes).not.toContain('w-full');
      expect(classes).toContain('h-auto');
      expect(classes).toContain('mb-8');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectClass(input, 'image');

      const classes = output.split(' ');

      expect(classes).toContain('max-w-[40vh]');
      expect(classes).toContain('w-full');
      expect(classes).toContain('h-auto');
      expect(classes).toContain('mb-8');
    });

    it('should not do anything', () => {
      const input = 'max-w-lg w-56 h-24 mb-12';
      const output = injectClass(input, 'image');

      const classes = output.split(' ');

      expect(classes).toContain('max-w-lg');
      expect(classes).toContain('w-56');
      expect(classes).toContain('h-24');
      expect(classes).toContain('mb-12');
    });
  });
});

describe('injectFonts', () => {
  it('should generate sans and mono variants', () => {
    const content: OpenGraphRequest = {
      title: 'foo',
      fontSans: 'Inter',
      fontMono: 'Hack',
    };

    const links = injectFonts(content);

    expect(links.length).toBe(2);
    expect(links).toContain(
      `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">`
    );
    expect(links).toContain(
      `<link href="https://fonts.googleapis.com/css2?family=Hack:wght@400;700&display=swap" rel="stylesheet">`
    );
  });

  it('should return empty array', () => {
    const content: OpenGraphRequest = {
      title: 'foo',
    };

    const links = injectFonts(content);

    expect(links.length).toBe(0);
  });
});

describe('injectTailwindConfig', () => {
  it('should return empty string', () => {
    const content: OpenGraphRequest = {
      title: 'foo',
    };
    const output = injectTailwindConfig(content);

    expect(output).toBe('');
  });

  it('should inject custom fonts', () => {
    const content: OpenGraphRequest = {
      title: 'foo',
      fontSans: 'Open Sans',
      fontMono: 'Hack',
      fontSerif: 'Merriweather',
    };
    const output = injectTailwindConfig(content);

    expect(output).toMatch(/sans: \['Open Sans'\]/);
    expect(output).toMatch(/mono: \['Hack'\]/);
    expect(output).toMatch(/serif: \['Merriweather'\]/);
  });
});
