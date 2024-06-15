const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");
const Ad = require("../models/Ad.js"); // Импортируйте модель Ad вместо Movie

const scrapeOLX = async () => {
  try {
    const res = await fetch(
      "https://www.olx.kz/moda-i-stil/zhenskaya-odezhda/",
    );
    const data = await res.text();
    const $ = cheerio.load(data);
    let newAds = 0;

    const cards = $("div.listing-grid-container.css-d4ctjd")
      .find('div[data-testid="listing-grid"]')
      .children();

    const adPromises = cards
      .map(async (i, element) => {
        const title = $(element).find("h6").text();
        const price = $(element).find('p[data-testid="ad-price"]').text();
        const url = $(element).find("a").attr("href");

        if (title && price && url) {
          const adExists = await Ad.findOne({ url: "olx.kz" + url });
          if (!adExists) {
            const ad = new Ad({ title, price, url: "olx.kz" + url });
            await ad.save();
            return true;
          }
        }
        return false;
      })
      .get();

    const results = await Promise.all(adPromises);
    newAds = results.filter((result) => result).length;

    console.log(`New ads found: ${newAds}`);
    return newAds;
  } catch (error) {
    console.error("Error in scrapeOLX:", error);
    return 0;
  }
};

module.exports = scrapeOLX;
