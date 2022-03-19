<p align="center">
  <img src="./docs/banner.png" title="Windgraph" alt="Windgraph" />
</p>

Windgraph is a service that lets you generate a dynamic, Tailwind-powered Open Graph images that you can use either for SEO or just for social images.

Inspired by [Vercel's original og-image](https://github.com/vercel/og-image).

> Windgraph is still on active development. The API may change without prior notice.

## Features

- Markdown styling
- Sensible default styles
- Latest Tailwind features, including [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)
- Customizable fonts powered by [Google Fonts](https://fonts.google.com/)

## Open Graph Template

By default, windgraph will generate images in the following structure.

![Windgraph Template](./docs/skeleton.png)

## API

GET - `/api/og/<title>?<query>`

Generate an open graph image based on user's input and template.

### Parameters

Name | Description
---- | -----------
`title` | Image title, supports Markdown syntax. **REQUIRED**

### Query

Name | Description
---- | -----------
`subtitle` | Image subtitle, supports Markdown syntax.
`image` | Hero image, must be an URL that responds with an image.
`width` | Image width in pixels. Defaults to `1200`
`height` | Image height in pixels. Defauls to `630`
`container-class` | Tailwind CSS classes to be injected to main container. Defaults to `w-screen h-screen p-16 flex flex-col justify-center items-center`
`title-class` | Tailwind CSS classes to be injected to `title`. Defaults to `text-center text-7xl leading-relaxed`
`subtitle-class` | Tailwind CSS classes to be injected to `subtitle`. Defaults to `text-center text-2xl`
`image-class` | Tailwind CSS classes to be injected to `image`. Defaults to `w-full h-auto max-w-[40vh]`
`font-sans` | Sans serif fonts to be used. Defaults to Tailwind's default
`font-serif` | Serif fonts to be used. Defaults to Tailwind's default. Must be used with `font-serif` class.
`font-mono` | Monospaced fonts to be used. Defaults to Tailwind's default. Automatically used on code blocks.
`format` | Image format. Allowed values are `jpeg` and `png`. By default, `jpeg` is compressed to 80% quality. Defaults to `jpeg`
`compress` | Boolean value that represents if the image should be compressed or not. This parameter allows for finer compression compared to the default `jpeg` compression. Default to `false` 

## Showcase

`https://windgraph.vercel.app/api/og/**Hello**,%20I'm%20%60Windgraph%60?title-class=text-white&container-class=bg-gradient-to-b%20from-rose-400%20via-fuchsia-500%20to-indigo-500&subtitle=by%20Namchee&subtitle-class=text-white`

<img src="https://windgraph.vercel.app/api/og/**Hello**,%20I'm%20%60Windgraph%60?title-class=text-white&container-class=bg-gradient-to-b%20from-rose-400%20via-fuchsia-500%20to-indigo-500&subtitle=by%20Namchee&subtitle-class=text-white" title="Sample Windgraph request" />

## Advanced Usage

### Background Images 

You can use images or inline SVG as a background by utilizing Tailwind's [arbitrary values](https://v2.tailwindcss.com/docs/just-in-time-mode#arbitrary-value-support). For example: 

`https://windgraph.vercel.app/api/og/**Hello**,%20I'm%20%60Windgraph%60?title-class=text-white&container-class=bg-[url('https://raw.githubusercontent.com/Namchee/windgraph/master/docs/background.jpg')]&subtitle=by%20Namchee&subtitle-class=text-white`

<img src="https://windgraph.vercel.app/api/og/**Hello**,%20I'm%20%60Windgraph%60?title-class=text-white&container-class=bg-[url(%27https://raw.githubusercontent.com/Namchee/windgraph/master/docs/background.jpg%27)]%20bg-cover%20bg-fixed&subtitle=by%20Namchee&subtitle-class=text-white" />

### Plaintext Title

To avoid markdown processing, you can escape markdown characters by prepending it with `\` or `%5C`. For example:

`https://windgraph.vercel.app/api/og/%5C*%5C*Hello%5C*%5C*,%20I'm%20%60Windgraph%60?title-class=text-white&container-class=bg-gradient-to-b%20from-rose-400%20via-fuchsia-500%20to-indigo-500&subtitle=by%20Namchee&subtitle-class=text-white`

## Limitations

Besides the limit of Tailwind itself, there are two main limitations of using Windgraph:

### Static Template

Currently you cannot use any other image template other than the provided one. This will be addressed in future releases.

### URL Length Limitation

While there are no actual limitations for URL length according to [RFC 2616](http://www.faqs.org/rfcs/rfc2616.html), it's recommended to keep the URL length to 2048 characters at maximum. Bearing that in mind, you shouldn't add too much Tailwind classes or using too much arbitrary values.

## License

This project is licensed under the [MIT License](./LICENSE)

## Credits

- Background image in sample open graph is taken by <a href="https://unsplash.com/@jrkorpa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jr Korpa</a> on <a href="https://unsplash.com/s/photos/neon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
