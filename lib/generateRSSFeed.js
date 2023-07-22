import { Feed } from "feed";
import { getAllPosts } from "./posts";
import fs from 'fs';

export default async function generateRssFeed(){
    const allPosts = await getAllPosts();
    const site_url = 'https://www.unmasking-masculinity.com';

    const feedOptions = {
        title: 'Unmasking Masculinity Blog',
        description: 'Discover a wealth of knowledge, insights, and personal stories as we unravel the complexities of men&apos;s mental health, empowering you to break free from societal expectations and embrace a path of healing and growth.',
        id: site_url,
        link: site_url,
        image: `${site_url}/logo/logo-lightbg-stacked.png`,
        favicon: `${site_url}/favicon.png`,
        copyright: `All rights reserved ${new Date().getFullYear()}, Unmasking Masculinity`,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${site_url}/rss.xml`,
        },
    }
    const feed = new Feed(feedOptions);

    allPosts.nodes.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: `${site_url}/blog/${post.slug}`,
            link: `${site_url}/blog/${post.slug}`,
            description: post.description,
            date: new Date(post.date),
        });
    });

    fs.writeFileSync('./public/rss.xml', feed.rss2());
}

