'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

require('dotenv').config();

const parserTools = require('./tools');
const categoryConfig = require('../../category.config');

module.exports = class Parser {

    constructor(url) {
        this.url = url;
        this.tools = parserTools();
    }

    /**
     * get list of root categories
     *
     * @returns {Promise<{result: any}>}
     */
    async getCategories() {
        const page = await this.getPage(this.url);
        const selector = '#menu-left .main-navigation-left > li';
        const result = await page.evaluate(selector => {
            const categories = [];
            Array.prototype.forEach.call(document.querySelectorAll(selector), (item, i) => {
                if (i > 1) {
                    const href = item.querySelector('a').href;
                    categories.push({
                        published: true,
                        title: item.innerText,
                        url: href,
                        parent: false,
                        is_root: true,
                        description: '',
                        image: ''
                    });
                }
            });
            return categories
        }, selector);
        page.close();
        return {result};
    }

    /**
     * get page object
     *
     * @param url {string}
     * @returns {Promise<Page>}
     */
    async getPage(url) {
        const browser = await puppeteer.launch({
            headless: process.env.HEADLESS ? process.env.HEADLESS : true,
            devtools: true,
            ignoreHTTPSErrors: true,
            args: [
            ]
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 952,
            deviceScaleFactor: 1,
        });
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            // timeout: this.tools.getTimeout(10, 50)
            timeout: 0
        });
        return page;
    }

    /**
     *
     * @param url {string}
     * @returns {{result: any}}
     */
    async getCategory(url) {
        console.log('===url===');
        console.log(url);
        console.log('===//url===');
        const page = await this.getPage(this.url);
        page.on('console', consoleObj => console.log(consoleObj.text()));
        const selector = 'ul.product-grid > li';
        const result = await page.evaluate(selector => {
            const products = [];
            Array.prototype.forEach.call(document.querySelectorAll(selector), (item, i) => {
                console.log(item.querySelector('.name.b1c-name a').innerText);
                products.push({
                    test: i,
                    item: item
                });
                /*
                products.push({
                    url: item.querySelector('.name.b1c-name a').href,
                    title: item.querySelector('.name.blc-name a').innerText,
                    preview: item.querySelector('.image > a > img').src
                });
                 */
            });
            // console.log(products);
            return products;
        }, selector);
        page.close();
        // console.log('~~~~~~');
        // console.log(result);
        // console.log('~~~~~~');
        return {result};
    }
};
