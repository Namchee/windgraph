import chromium from 'chrome-aws-lambda';

import type { Page, ScreenshotOptions } from 'puppeteer-core';
import type { PageOptions } from './types';

let page: Page;

/**
 * Get singleton page for screenshot purpose
 *
 * @returns {Promise<Page>} Puppeteer webpage
 */
async function getPage(): Promise<Page> {
  // Re-use the page if exists
  if (page) {
    return page;
  }

  const options = process.env.AWS_REGION
    ? {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      }
    : {
        args: [],
        defaultViewport: chromium.defaultViewport,
        executablePath:
          // Change this accordingly
          process.platform === 'win32'
            ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
        ignoreHTTPSErrors: true,
      };

  const browser = await chromium.puppeteer.launch(options);
  const pages = await browser.pages();

  if (pages) {
    page = pages[0];
  } else {
    const newPage = await browser.newPage();
    page = newPage;
  }

  return page;
}

/**
 * Render an HTML content as a webpage screen and
 * capture it.
 *
 * @param {string} html HTML content to be captured
 * @param {PageOptions} options page rendering options
 * @returns {Promise<Buffer>} image file
 */
export async function captureScreen(
  html: string,
  options: PageOptions
): Promise<Buffer> {
  const page = await getPage();
  await page.setViewport({
    width: options.dimension.width as number,
    height: options.dimension.height as number,
  });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const ssOptions: ScreenshotOptions = {
    type: options.format,
  };

  if (options.format === 'jpeg') {
    ssOptions.quality = options.compress ? 70 : 90;
  }

  const file = (await page.screenshot(ssOptions)) as Buffer;

  return file;
}
