const CronJob = require("cron").CronJob;
const puppeteer = require("puppeteer");
const CONSTANTS = require("../constants");
const _ = require("lodash");
const fs = require("fs");
const githubTopicService = require('./../services/githubTopicsService');
const githubPopularTopicService = require('./../services/githubPopularTopicsService');
function initAllCronJobs() {
  getTrendingGITHUB();
  getPopularGITHUB();
}

function getTrendingGITHUB() {
  const job = new CronJob("*/0 */0 */1 * * *", function() {
    startTrendingGithubScrapping();
  });
  job.start();
}

function getPopularGITHUB() {
  const job = new CronJob("*/0 */0 */1 * * *", function() {
   startGithubPopularTopicsScrapping();
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
            var viewSourcedata =await viewSource.buffer();
            fs.writeFile(`./public/images/${title}.png`,
            viewSourcedata,
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

async function startGithubPopularTopicsScrapping(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://github.com/topics");
  await page.waitFor(5 * 1000);

  var itemList1 = await page.evaluate(sel => {
  return document.querySelector(sel).getElementsByTagName("li").length;
  }, CONSTANTS.LIST_POPULAR_TOPICS_GITHUB);
  await savePopularTopicsData(page, itemList1);

  browser.close();
}

async function savePopularTopicsData(page, count) {
  for (var i = 0; i <=count; i++) {
    var popularTitleSelector = CONSTANTS.LIST_POPULAR_TOPICS_GITHUB_TITLE.replace("INDEX",i);
    var popularTitle = await page.evaluate(sel => {
      var element = document.querySelector(sel);
      return element ? element.getAttribute("href") : null;
    }, popularTitleSelector);
    if(popularTitle !=  null)
    {
      popularTitle = popularTitle.replace("/topics/", '');
      await githubPopularTopicService.savePopularTopic({"title": popularTitle});
    }
  }
}



module.exports = {
  initAllCronJobs,
  startTrendingGithubScrapping,
  startGithubPopularTopicsScrapping
};
