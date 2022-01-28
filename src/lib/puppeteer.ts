import chromium from 'chrome-aws-lambda';

import { HEIGHT, WIDTH } from '@/constant/api';

import type { Page } from 'puppeteer';
import type { PageOptions } from '@/lib/types';

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
    width: options?.dimension?.width || WIDTH,
    height: options?.dimension?.height || HEIGHT,
  });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const file = (await page.screenshot({
    fullPage: true,
  })) as Buffer;

  return file;
}
