import chromium from 'chrome-aws-lambda';

import type { Page, ScreenshotOptions } from 'puppeteer';
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

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
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
  options?: PageOptions
): Promise<Buffer> {
  const page = await getPage();
  await page.setViewport({
    width: options?.dimension?.width as number,
    height: options?.dimension?.height as number,
  });
  await page.setContent(html, { waitUntil: 'networkidle2' });

  const ssOptions: ScreenshotOptions = {
    fullPage: true,
    type: options?.format === 'jpg' ? 'jpeg' : 'png',
  };

  if (!options?.compress) {
    ssOptions.quality = 70;
  }

  const file = (await page.screenshot(ssOptions)) as Buffer;

  return file;
}
