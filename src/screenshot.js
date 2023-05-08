'use strict';

import puppeteer from 'puppeteer'
import path from 'path';

export async function getScreenshot (url, name) {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.goto(url);

  await page.setViewport({width: 1920, height: 1080});

  await page.screenshot({ path: path.resolve(__dirname, '..', 'public', 'images', `${name}.png`) });
  await browser.close();
}
