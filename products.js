'use strict';

const args = require('yargs').argv;
const {Scraper, Root, DownloadContent, OpenLinks, CollectContent} = require('nodejs-web-scraper');
const fs = require('fs');

if (!args.url) {
    console.error(`For usage ${__filename} you should set url parameter`);
    process.exit(-1);
}

const Parser = require('./app/parser');
const db = require('./app/models');

//const parser = new Parser(args.url);

const Category = db.category;
const ProductsList = db.productsList;

(async () => {
    const pages = [];
    const config = {
        baseSiteUrl: args.url,
        startUrl: args.url,
        filePath: './htdocs/images/',
        concurrency: 10,
        maxRetries: 3,
        logPath: './logs/'
    };

    await Category.findAll({
        raw: true,
        attributes: ['title', 'url']
    }).then((category) => {
        console.log(category);
    });

    /*
    const getPageObject = (pageObject) => {
        pages.push(pageObject);
    };

    const scraper = new Scraper(config);
    const root = new Root({
        pagination: {
            queryString: '.pagination .links a',
            begin: 1,
            end: 50
        }
    });
    const product = new CollectContent('#product-list-grid li', {
        name: '.product-block .name'
    });
    await scraper.scrape(root);
    fs.writeFile('./results/pages.json', JSON.stringify(pages), () => {});
     */
})();

