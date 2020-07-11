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
    const configs = [];
    const getPageObject = (pageObject) => {
        console.log(pageObject);
        pages.push(pageObject);
    };
    const config = {
        baseSiteUrl: args.url,
        startUrl: args.url,
        filePath: './htdocs/images/',
        concurrency: 10,
        maxRetries: 3,
        timeout: 180000,
        delay: 1200,
        logPath: './logs/'
    };

    let resCategories = [];
    await Category.findAll({
        raw: true,
        attributes: ['title', 'url', 'id']
    }).then((categories) => {
        resCategories = categories;
    }).catch((reason) => {
        console.error(reason);
    });

    await (() => {
        resCategories.forEach((category) => {
            if (!! category.url) {
                config.baseSiteUrl = category.url;
                config.startUrl = category.url;
                configs.push(config);
            }
        });
    })();

    await (() => {
        configs.forEach((configItem) => {
            const scraper = new Scraper(configItem);
            const root = new Root({
                pagination: {
                    queryString: 'page',
                    begin: 1,
                    end: 5
                }
            });
            const jobAds = new OpenLinks('#product-list-grid .product-block .name a', {
                name: 'Product page',
                getPageObject
            });
            const title = new CollectContent('h1', {name: 'title'});
            root.addOperation(jobAds);
            jobAds.addOperation(title);

            scraper.scrape(root);
            fs.appendFile(
                'results/products.json',
                JSON.stringify(pages),
                (err) => {
                    console.error(err);
                });
        });
    })();

    /*

    const product = new CollectContent('#product-list-grid li', {
        name: '.product-block .name'
    });
    await scraper.scrape(root);
    fs.writeFile('./results/pages.json', JSON.stringify(pages), () => {});
     */
})();

