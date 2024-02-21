
import fetch from 'node-fetch';
import cron from 'node-cron';
import fs from 'fs';
//const fs = require('fs');

// Load URLs and their frequencies from urls.json
const urlsData = JSON.parse(fs.readFileSync('urls.json'));
const urls = urlsData.urls;

// Function to visit a URL
const visitUrl = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log(`Visited ${url} successfully.`);
        } else {
            console.error(`Failed to visit ${url}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error visiting ${url}: ${error.message}`);
    }
};

// Schedule cron jobs for each URL
for (const url in urls) {
    const frequencyInSeconds = urls[url];
    cron.schedule(`*/${frequencyInSeconds} * * * * *`, () => {
        visitUrl(url);
    });
}
