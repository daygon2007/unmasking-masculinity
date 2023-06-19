import Parser from "rss-parser";

const feedUrl = 'https://anchor.fm/s/e2d645d8/podcast/rss';

export async function getFeed() {
  let parser = new Parser();

  let feed = await parser.parseURL(feedUrl);

  return feed;
}