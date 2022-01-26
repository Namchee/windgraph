/* c8 ignore start */
import { rest } from 'msw';

export const handlers = [
  rest.get('https://foo.bar/test.png', (req, res, ctx) =>
    res(ctx.status(200), ctx.set('Content-Type', 'image/png'))
  ),

  rest.get('https://foo.bar/foo.jpeg', (req, res, ctx) => res(ctx.status(404))),

  rest.get('https://foo.bar/baz.html', (req, res, ctx) =>
    res(ctx.status(200), ctx.set('Content-Type', 'text/html'))
  ),
];
/* c8 ignore end */
