import Head from "next/head";
import Navigation from "@/components/nav";
import {getPostList} from "@/lib/posts";
import HomeHero from "@/components/HomeHero";
import Card from "@/components/card";
import Footer from "@/components/footer";
import LoadMore from "@/components/LoadMore";
import { useState } from "react";
import { getBlogPage } from "@/lib/pages";
import parse from 'html-react-parser';
import { getMenu } from "@/lib/menu";
import LogoBar from '@/components/LogoBar';
import PodcastFeed from "@/components/PodcastFeed";
import { getFeed } from "@/lib/rss";
import RichText from "@/components/RichText";
import MailchimpSubscribe from "@/components/MailChimpSubscribe";

export async function getStaticProps() {
    const allPosts = await getPostList();
    const pageData = await getBlogPage();
    const menu = await getMenu();
    const podcastFeed = await getFeed();
    
    return {
        props: {
            allPosts: allPosts,
            pageData: pageData,
            menu: menu,
            feed: podcastFeed.items,
        }
    }
}

export default function BlogHome({ allPosts, pageData, menu }){

    const parsedHead = pageData?.seo?.fullHead ? parse(pageData?.seo?.fullHead) : null;
    const pageBlocks = (pageData && pageData.blocks) || [];

    const [posts, setPosts] = useState(allPosts);
    return (
        <>
        <Head>
                {parsedHead}
                <meta name="robots" content={`${pageData?.seo?.metaRobotsNoindex}, ${pageData?.seo?.metaRobotsNofollow}`} />
        </Head>
        <Navigation menu={menu} />
            {pageBlocks.map((block, index) => {
                const name = block.name;

                switch (name) {
                    case 'acf/home-hero':
                        return <HomeHero key={index} block={block} />;
                    // Add more cases for other block types
                    case 'acf/logo-bar':
                        return <LogoBar key={index} block={block} />;
                    case 'acf/podcast-feed':
                        return <PodcastFeed key={index} block={block} feed={feed} />
                    case 'acf/rich-text':
                        return <RichText key={index} block={block} />
                    case 'acf/mailchimp-subscribe':
                        return <MailchimpSubscribe key={index} block={block} />
                    default:
                        return null;
                }
            })}
        
        <div className="container">
            <div className="row">
                {
                    posts.nodes.map((post) => (
                        <Card post={post} key={post.slug} />
                    ))
                }
                <LoadMore posts={posts} setPosts={setPosts} />
            </div>
        </div>
        <Footer />
        </>
    )
}