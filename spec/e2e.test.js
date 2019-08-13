

const puppeteer = require('puppeteer');

const pageUrl = 'http://localhost:3000';
let page;
let browser;
const width = 1440;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe('Inital page view is correct', () => {
  test('portfolio-view component is rendered to DOM', async () => {
    await page.goto(pageUrl, { waituntil: 'networkidle2' });
    const portfolioView = await page.$('#portfolio-overview');
    expect(portfolioView).toBeTruthy();
  })
  test('market-overview-panel component is rendered to DOM', async () => {
    const portfolioView = await page.$('#market-overview-panel');
    expect(portfolioView).toBeTruthy();
  })
  test('stock-comparison component is rendered to DOM', async () => {
    const portfolioView = await page.$('#stock-comparison-container');
    expect(portfolioView).toBeTruthy();
  })

})

describe('Porfolio View Component', () => {
  test('Net Worth div is appended to DOM', async () => {
    const netWorth = await page.$eval('.portfolio-column-1', el => el.innerHTML);
    expect(netWorth).toEqual('<strong>Current Net Worth:&nbsp;</strong>$7,393.38');
  })
})
