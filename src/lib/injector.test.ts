import { describe, it, expect } from 'vitest';

import { injectClass } from '@/lib/injector';

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
      expect(classes).toContain('grid');
      expect(classes).toContain('place-items-center');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectClass(input, 'container');

      const classes = output.split(' ');
      expect(classes).toContain('w-screen');
      expect(classes).toContain('h-screen');
      expect(classes).toContain('p-16');
      expect(classes).toContain('grid');
      expect(classes).toContain('place-items-center');
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
      expect(classes).not.toContain('grid');
      expect(classes).not.toContain('place-items-center');
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
      expect(classes).toContain('tracking-tight');
    });

    it('should inject all fallback classes', () => {
      const input = '';
      const output = injectClass(input, 'title');

      const classes = output.split(' ');
      expect(classes).toContain('text-center');
      expect(classes).toContain('text-7xl');
      expect(classes).toContain('leading-relaxed');
      expect(classes).toContain('tracking-tight');
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
      expect(classes).not.toContain('tracking-tight');
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
      expect(classes).toContain('text-2xl');
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
});
