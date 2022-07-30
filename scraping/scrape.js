const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { sleep } = require('../utils/date');

const scrapePrntScr = async () => {
    const code = Math.random().toString(36).substring(2, 8)
    const url = `https://prnt.sc/${code}`;

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    const pageData = await page.evaluate(() => {
        return document.documentElement.innerHTML;
    });

    const $ = cheerio.load(pageData);
                    // "body > div.image-constrain.js-image-wrap > div > #screenshot-image";
    const elemSelector = "body > div.image-constrain.js-image-wrap > div > div > img";

    const result = $(elemSelector).attr("src")
    if(result == undefined || !result.startsWith('data:image/') || result.startsWith('data:image/jpeg;base64,/9j/')) {
      console.log('again in 3 seconds')
      await sleep(3000)
      await scrapePrntScr()
    } else {
        console.log('done');
        return result;
    }
}

const replaceBase64Text = (content) => {
    if (content.includes('png')) {
        return content.replace('data:image/png;base64,', '')
    } else if (content.includes('jpg')) {
        return content.replace('data:image/jpg;base64,', '');
    } else if (content.includes('webp')) {
        return content.replace('data:image/webp;base64,', '');
    }
}

const imgType = (content) => {
    if (content.includes('jpg') || content.includes('jpeg')) {
        return 'images/jpeg';
    } else if (content.includes('png')) {
        return 'images/png';
    } else if (content.includes('webp')) {
        return 'images/webp';
    }
}

module.exports = { imgType, replaceBase64Text, scrapePrntScr }