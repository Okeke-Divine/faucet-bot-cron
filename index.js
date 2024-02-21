import fetch from 'node-fetch';
import cron from 'node-cron';
import fs from 'fs';

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

// Visit all URLs immediately upon script launch
for (const url in urls) {
    visitUrl(url);
}

// Schedule cron jobs for each URL [time based [in seconds]]
for (const url in urls) {
    const frequencyInSeconds = urls[url];
    cron.schedule(`*/${frequencyInSeconds} * * * * *`, () => {
        visitUrl(url);
    }, {
        scheduled: true, // Schedule the job now
        timezone: 'UTC', // Change the timezone if needed
    });
}
