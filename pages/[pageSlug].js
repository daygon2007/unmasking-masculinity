import Head from "next/head";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import parse from 'html-react-parser';
import Hero from "@/components/HomeHero";
import PodcastLinks from '@/components/PodcastLinks';
import { getPageSlugs, getSinglePage } from "@/lib/pages";
import { getMenu } from "@/lib/menu";

export async function getStaticProps({params}) {
    const pageData = await getSinglePage(params.pageSlug);
    const menu = await getMenu();
    console.log(pageData)

    return{
        props: {
            pageData,
            menu
        }
    }
}

export async function getStaticPaths() {
    const pageSlugs = await getPageSlugs();

    return{
        paths: pageSlugs.map((s) => (
            {
                params: {
                    pageSlug: s.slug
                }
            }
        )),
            fallback: false,
    }
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
                    case 'acf/hero':
                        return <Hero key={index} block={block} />;
                    // Add more cases for other block types
                    case 'acf/podcast-links':
                        return <PodcastLinks key={index} block={block} />;
                    default:
                        return null;
                }
            })}
            <Footer />
            </>
            

    )
}