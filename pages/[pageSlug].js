import { getPageSlugs, getSinglePage } from "@/lib/pages";
import Head from "next/head";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import parse from 'html-react-parser';
import HomeHero from "@/components/HomeHero";
import LogoBar from '@/components/LogoBar';
import { getMenu } from "@/lib/menu";
import PodcastFeed from "@/components/PodcastFeed";
import { getFeed } from "@/lib/rss";
import RichText from "@/components/RichText";
import MailchimpSubscribe from "@/components/MailChimpSubscribe";

export async function getStaticProps({params}) {
    const pageData = await getSinglePage(params.pageSlug);
    const menu = await getMenu();
    const podcastFeed = await getFeed();

    return{
        props: {
            pageData: pageData,
            menu: menu,
            feed: podcastFeed.items,
        }
    }
}

export async function getStaticPaths() {
    const pageSlugs = await getPageSlugs();

    const filteredPaths = pageSlugs.filter((slug) => slug.slug !== 'blog' && slug.slug !== 'home');
    console.log(filteredPaths);

    const paths = filteredPaths.map((s) => ({
        params: { pageSlug: s.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}



export default function Page({ pageData, menu }) {
    const parsedHead = pageData?.seo?.fullHead ? parse(pageData?.seo?.fullHead) : null;
    const pageBlocks = (pageData && pageData.blocks) || [];


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
            <Footer />
            </>
            

    )
}