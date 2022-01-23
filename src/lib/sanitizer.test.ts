import { describe, it, expect } from 'vitest';

import { sanitize } from '@/lib/sanitizer';

describe('sanitize', () => {
  it.concurrent('should sanitize escapable inputs', () => {
    const input = '<script>alert("XSS");</script>';
    const output = sanitize(input);

    expect(output).toBe('&lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt;');
  });

  it.concurrent('should do nothing', () => {
    const input = '**Hello** World';
    const output = sanitize(input);

    expect(output).toBe(input);
  });
});
