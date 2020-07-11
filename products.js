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

(async () => {
    const config = {
        baseSiteUrl: args.url,
        startUrl: args.url,
        filePath: './htdocs/images/',
        concurrency: 10,
        maxRetries: 3,
        logPath: './logs/'
    };
})();

