import Head from "next/head";
import Navigation from "@/components/nav";
import { getPostList } from "@/lib/posts";
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
import Subscribe from "@/components/MailChimpSubscribe";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "@/components/NewsletterForm";
import GeneralHero from "@/components/GeneralHero";
import generateRssFeed from "@/lib/generateRSSFeed";

export async function getStaticProps() {
    const allPosts = await getPostList();
    const pageData = await getBlogPage();
    const menu = await getMenu();
    const podcastFeed = await getFeed();
    await generateRssFeed();

    return {
        props: {
            allPosts: allPosts,
            pageData: pageData,
            menu: menu,
            feed: podcastFeed.items,
        }
    }
}

export default function BlogHome({ allPosts, pageData, menu }) {

    const parsedHead = pageData?.seo?.fullHead ? parse(pageData?.seo?.fullHead.replaceAll('podcast.jonathon-harrelson.com', 'unmasking-masculinity.com')) : null;
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
                    case 'acf/general-hero':
                        return <GeneralHero key={index} block={block} />;
                    // Add more cases for other block types
                    case 'acf/logo-bar':
                        return <LogoBar key={index} block={block} />;
                    case 'acf/podcast-feed':
                        return <PodcastFeed key={index} block={block} feed={feed} />
                    case 'acf/rich-text':
                        return <RichText key={index} block={block} />
                    case 'acf/mailchimp-subscribe':
                        return <Subscribe key={index} block={block} />
                    default:
                        return null;
                }
            })}

            <div className="container py-5">
                <div className="row">
                    {
                        posts.nodes.map((post) => (
                            <Card post={post} key={post.slug} />
                        ))
                    }
                    <LoadMore posts={posts} setPosts={setPosts} />
                </div>
            </div>
            <div className="subscribe-section bg-grey-light" id="">
                <div className="container">
                    <div className="row py-5 justify-content-center">
                        <div className="col-md-6 text-center">
                            <div className="col-12 mb-5">
                                <h2 className="mt-0 text-center">Subscribe to our newsletter</h2>
                                <p>Unlock the power of emotional well-being and join our newsletter to receive exclusive insights, resources, and support for men&apos;s mental health, empowering you to embrace vulnerability and thrive.</p>
                            </div>
                            <MailchimpSubscribe
                                url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
                                render={(props) => {
                                    const { subscribe, status, message } = props || {};
                                    return (
                                        <NewsletterForm
                                            status={status}
                                            message={message}
                                            onValidated={formData => subscribe(formData)}
                                        />
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}