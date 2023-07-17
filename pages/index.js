import Head from "next/head";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import parse from 'html-react-parser';
import HomeHero from "@/components/HomeHero";
import LogoBar from '@/components/LogoBar';
import { getHomePage } from "@/lib/pages";
import { getMenu } from "@/lib/menu";
import PodcastFeed from "@/components/PodcastFeed";
import { getFeed } from "@/lib/rss";
import RichText from "@/components/RichText";
import Subscribe from "@/components/MailChimpSubscribe";

export async function getStaticProps() {
    const pageData = await getHomePage();
    const menu = await getMenu();
    const podcastFeed = await getFeed();

    return {
        props: {
            pageData: pageData,
            menu: menu,
            feed: podcastFeed.items,
        }
    }
}

export default function Page({ pageData, menu, feed }) {
    const parsedHead = pageData?.seo?.fullHead ? parse(pageData?.seo?.fullHead) : null;
    const pageBlocks = (pageData && pageData.blocks) || [];
    


    return (
        <>
            <Head>
                {parsedHead.replace('podcast.jonathon-harrelson.com','unmasking-masculinity.com')}
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
                        return <Subscribe key={index} block={block} />
                    default:
                        return null;
                }
            })}
            
            <Footer />
        </>


    )
}