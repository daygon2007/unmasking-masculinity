import Parser from "rss-parser";

const feedUrl = 'https://feeds.buzzsprout.com/1145324.rss';

export async function getFeed() {
  let parser = new Parser();

  let feed = await parser.parseURL(feedUrl);

  return feed;
}