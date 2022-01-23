import { describe, it, expect } from 'vitest';

import { injectContainerClass } from '@/lib/style';

describe('injectContainerClass', () => {
  it('should inject some fallback classes', () => {
    const input = 'p-24';
    const output = injectContainerClass(input);

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
    const output = injectContainerClass(input);

    const classes = output.split(' ');
    expect(classes).toContain('w-screen');
    expect(classes).toContain('h-screen');
    expect(classes).toContain('p-16');
    expect(classes).toContain('grid');
    expect(classes).toContain('place-items-center');
  });

  it('should not inject any classes', () => {
    const input = 'w-full h-full p-48 flex justify-center items-center';
    const output = injectContainerClass(input);

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
