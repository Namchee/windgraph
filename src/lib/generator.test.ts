import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { generateContent } from '@/lib/generator';

import type { OpenGraphRequest } from '@/lib/types';
import { imgMockServer } from '@/mocks/server';

// Class injection are tested separately
describe('generateContent', () => {
  beforeAll(() => {
    global.fetch = fetch;
    imgMockServer.listen();
  });

  afterEach(() => {
    imgMockServer.resetHandlers();
  });

  afterAll(() => {
    imgMockServer.close();
  });

  it.concurrent('should generate normal template', async () => {
    const content: OpenGraphRequest = {
      title: 'Foo bar',
    };
    const template = await generateContent(content);

    expect(template).toMatch(/h1/);
    expect(template).not.toMatch(/h3/);
    expect(template).not.toMatch(/img/);
  });

  it.concurrent('should generate template with subtitles', async () => {
    const content: OpenGraphRequest = {
      title: 'Foo bar',
      subtitle: 'bar baz',
    };
    const template = await generateContent(content);

    expect(template).toMatch(/h1/);
    expect(template).toMatch(/h3/);
    expect(template).not.toMatch(/img/);
  });

  it.concurrent(
    'should generate template with subtitles and images',
    async () => {
      const content: OpenGraphRequest = {
        title: 'Foo bar',
        subtitle: 'bar baz',
        image: 'https://foo.bar/test.png',
      };
      const template = await generateContent(content);

      expect(template).toMatch(/h1/);
      expect(template).toMatch(/h3/);
      expect(template).toMatch(/img/);
    }
  );

  it.concurrent('should recognize custom fonts request', async () => {
    const content: OpenGraphRequest = {
      title: 'foo',
      fontSans: 'Open Sans',
      fontMono: 'Hack',
    };
    const template = await generateContent(content);

    expect(template).toMatch(
      '<link href="https://fonts.googleapis.com/css2?family=Open Sans:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">'
    );
    expect(template).toMatch(
      '<link href="https://fonts.googleapis.com/css2?family=Hack:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">'
    );
  });
});
