const CronJob = require("cron").CronJob;
const puppeteer = require("puppeteer");
const CONSTANTS = require("../constants");
const _ = require("lodash");
const fs = require("fs");
const githubTopicService = require('./../services/githubTopicsService');
function initAllCronJobs() {
  getTrendingGITHUB();
}

function getTrendingGITHUB() {
  const job = new CronJob("*/0 */0 */1 * * *", function() {
    startTrendingGithubScrapping();
  });
  job.start();
}

async function startTrendingGithubScrapping() {
    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://github.com/topics");
  await page.waitFor(2 * 1000);
  await page.click(CONSTANTS.LOAD_MORE_TRENDING_SELECTOR);
  await page.waitFor(5 * 1000);

  var itemList1 = await page.evaluate(sel => {
    return document.getElementsByTagName(sel)[12].getElementsByTagName("li")
      .length;
  }, CONSTANTS.LIST_ITEM_TOPICS_GITHUB);

  await saveTrendingData(page, itemList1, 2, browser);

  var itemList2 = await page.evaluate(sel => {
    return document.getElementsByTagName(sel)[13].getElementsByTagName("li")
      .length;
  }, CONSTANTS.LIST_ITEM_TOPICS_GITHUB);

  await saveTrendingData(page, itemList2, 3, browser);

  browser.close();
}

async function saveTrendingData(page, count, pagination, browser) {
  for (var i = 1; i <= count; i++) {
    // change the index to the next child
    var titleSelector = CONSTANTS.LIST_ITEM_TOPICS_GITHUB_TITLE.replace("INDEX",i);
    titleSelector = titleSelector.replace("PAGINATION", pagination);
    var descSelector = CONSTANTS.LIST_ITEM_TOPICS_GITHUB_DESC.replace("INDEX",i);
    descSelector = descSelector.replace("PAGINATION", pagination);
    var imageSelector = CONSTANTS.LIST_ITEM_TOPICS_GITHUB_IMAGE.replace("INDEX",i);
    imageSelector = imageSelector.replace("PAGINATION", pagination);
    var title = await page.evaluate(sel => {
      var element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, titleSelector);
    var desc = await page.evaluate(sel => {
      var element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, descSelector);
    var image = await page.evaluate(sel => {
      var element = document.querySelector(sel);
      return element ? element.src : null;
    }, imageSelector);
    await downloadImage(image, title, browser);
    githubTopicService.saveTopic({"title": title, "desc" : desc});
  }
}

async function downloadImage(image, title, browser) {
    const page = await browser.newPage();
    try {
        if (image != null) {
            var viewSource = await page.goto(image);
            fs.writeFile(`./public/images/${title}.png`,
            viewSource.buffer(),
              function(err) {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
    } catch(e) {
        console.log(e);
    }
    
}

module.exports = {
  initAllCronJobs,
  startTrendingGithubScrapping
};
