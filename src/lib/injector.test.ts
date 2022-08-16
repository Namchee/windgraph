import { describe, it, expect } from 'vitest';

import {
  buildTemplate,
  injectClassToElement,
  injectDefaultClasses,
  injectFonts,
  injectScripts,
} from '@/lib/injector';

import { HERO_TEMPLATE } from '@/lib/template/hero';

import type { OpenGraphRequest, TemplateMap } from '@/lib/types';

describe('injectDefaultClasses', () => {
  describe('injectContainerClass', () => {
    it('should inject some fallback classes', () => {
      const input = 'p-24';
      const output = injectDefaultClasses(input, 'container');

      const classes = output.split(' ');
      expect(classes).toContain('w-screen');
      expect(classes).toContain('h-screen');
      expect(classes).not.toContain('p-16');
      expect(classes).toContain('p-24');
      expect(classes).toContain('grid');
      expect(classes).toContain('place-items-center');
      expect(classes).toContain('grid-rows-3');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectDefaultClasses(input, 'container');

      const classes = output.split(' ');
      expect(classes).toContain('w-screen');
      expect(classes).toContain('h-screen');
      expect(classes).toContain('p-16');
      expect(classes).toContain('grid');
      expect(classes).toContain('place-items-center');
      expect(classes).toContain('grid-rows-3');
    });

    it('should not inject any classes', () => {
      const input = 'w-full h-full p-48 flex justify-center items-center';
      const output = injectDefaultClasses(input, 'container');

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
      const output = injectDefaultClasses(input, 'title');

      const classes = output.split(' ');

      expect(classes).toContain('text-center');
      expect(classes).toContain('text-5xl');
      expect(classes).not.toContain('text-7xl');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectDefaultClasses(input, 'title');

      const classes = output.split(' ');
      expect(classes).toContain('text-center');
      expect(classes).toContain('text-7xl');
    });

    it('should not inject any classes', () => {
      const input =
        'text-4xl leading-loose tracking-wider text-red-500 text-left';
      const output = injectDefaultClasses(input, 'title');

      const classes = output.split(' ');

      expect(classes).toContain('text-left');
      expect(classes).toContain('text-red-500');
      expect(classes).toContain('text-4xl');
      expect(classes).toContain('leading-loose');
      expect(classes).toContain('tracking-wider');

      expect(classes).not.toContain('text-7xl');
    });
  });

  describe('injectSubtitleClass', () => {
    it('should inject some fallback classes', () => {
      const input = 'text-3xl';
      const output = injectDefaultClasses(input, 'subtitle');

      const classes = output.split(' ');

      expect(classes).toContain('text-center');
      expect(classes).toContain('text-3xl');
      expect(classes).not.toContain('text-2xl');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectDefaultClasses(input, 'subtitle');

      const classes = output.split(' ');
      expect(classes).toContain('text-center');
      expect(classes).toContain('text-3xl');
    });

    it('should not inject any classes', () => {
      const input = 'text-xl text-right text-gray-400';
      const output = injectDefaultClasses(input, 'subtitle');

      const classes = output.split(' ');

      expect(classes).toContain('text-right');
      expect(classes).toContain('text-gray-400');
      expect(classes).toContain('text-xl');

      expect(classes).not.toContain('text-2xl');
      expect(classes).not.toContain('text-center');
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

      expect(links).toMatch(
        /<link rel="preconnect" href="https:\/\/fonts.googleapis.com">/
      );
      expect(links).toMatch(
        /<link rel="preconnect" href="https:\/\/fonts.gstatic.com" crossorigin>/
      );
      expect(links).toMatch(
        /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">/
      );
      expect(links).toMatch(
        /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Hack:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">/
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

  describe('injectScripts', () => {
    it('should return empty string', () => {
      const content: OpenGraphRequest = {
        title: 'foo',
      };
      const output = injectScripts(content);

      expect(output).toBe('');
    });

    it('should inject custom fonts', () => {
      const content: OpenGraphRequest = {
        title: 'foo',
        fontSans: 'Open Sans',
        fontMono: 'Hack',
        fontSerif: 'Merriweather',
      };
      const output = injectScripts(content);

      expect(output).toMatch(/sans: \['Open Sans'\]/);
      expect(output).toMatch(/mono: \['Hack'\]/);
      expect(output).toMatch(/serif: \['Merriweather'\]/);
    });
  });

  describe('injectClassToElement', () => {
    it('should inject classes to element', () => {
      const el = '<p>Hello World!</p>';
      const className = 'text-dark';

      const got = injectClassToElement(el, className);

      expect(got).toBe('<p class="text-dark">Hello World!</p>');
    });

    it('should replace the default element', () => {
      const el = '<p>Hello World!</p>';
      const className = 'text-dark';

      const got = injectClassToElement(el, className, 'h1');

      expect(got).toBe('<h1 class="text-dark">Hello World!</h1>');
    });
  });
});

describe('buildTemplate', () => {
  it('should replace all string templates with correct values', () => {
    const base = HERO_TEMPLATE;
    const map: TemplateMap = {
      fonts: '',
      scripts: '<script></script>',
      container: 'flex justify-between',
      image: '<img src="test.png />',
      title: '<h1 class="text-2xl">Test</h1>',
      subtitle: '<h3 class="text-sm">Ting</h3>',
      footer: '<p>a</p>',
    };

    const result = buildTemplate(base, map);

    expect(result).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script></script>
  </head>

  <body>
    <div class="flex justify-between">
      <div class="row-start-2 flex flex-col items-center">
        <img src="test.png />
        <h1 class="text-2xl">Test</h1>
        <h3 class="text-sm">Ting</h3>
      </div>

      <div class="self-end row-start-3">
        <p>a</p>
      </div>
    </div>
  </body>
</html>`);
  });

  it('should replace all keys that are not present with an empty string', () => {
    const base = HERO_TEMPLATE;
    const map: Partial<TemplateMap> = {
      container: 'flex justify-between',
      title: '<h1 class="text-2xl">Test</h1>',
    };

    const result = buildTemplate(base, map);

    expect(result).toBe(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <script src="https://cdn.tailwindcss.com"></script>
    
  </head>

  <body>
    <div class="flex justify-between">
      <div class="row-start-2 flex flex-col items-center">
        
        <h1 class="text-2xl">Test</h1>
        
      </div>

      <div class="self-end row-start-3">
        
      </div>
    </div>
  </body>
</html>`);
  });
});
