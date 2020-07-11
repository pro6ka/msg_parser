'use strict';

const args = require('yargs').argv;
const {Scraper, Root, DownloadContent, OpenLinks, CollectContent} = require('nodejs-web-scraper');
const fs = require('fs');

if (!args.url) {
    console.error(`For usage ${__filename} you should set url parameter`);
    process.exit(-1);
}

// const server = require('./server').routes().run();
const Parser = require('./app/parser');
const db = require('./app/models');

const parser = new Parser(args.url);

const Category = db.category;

(async () => {
    const config = {
        baseSiteUrl: args.url,
        startUrl: args.url,
        filePath: './htdocs/images/',
        concurrency: 10,
        maxRetries: 3,
        logPath: './logs/'
    };

    const sections = [];

    const getPageObject = (pageObject) => {
        sections.push(pageObject);
    };

    const scraper = new Scraper(config);
    const root = new Root();

    const category = new OpenLinks('.main-navigation-left .a-href.a-href-level-1', {name: 'category', getPageObject});
    const categoryName = new CollectContent('h1', {name: 'categoryName'});

    root.addOperation(category);
    category.addOperation(categoryName);

    await scraper.scrape(root);
    
    // write to db
    sections.forEach((section) => {
        Category.create({
            published: 1,
            title: section.categoryName,
            is_root: 1,
            description: section.categoryName,
            createdAt: Date.now(),
            updaedAt: Date.now(),
        }).then((sectionData) => {
            console.log(sectionData);
        });
        console.log('==section==');
        console.log(section);
        console.log('==//section==');
    });

    fs.writeFile('./results/categories.json', JSON.stringify(sections), () => {});
})();
