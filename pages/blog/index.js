import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/nav";
import {getPostList} from "@/lib/posts";
import Hero from "@/components/HomeHero";
import Card from "@/components/card";
import Footer from "@/components/footer";
import LoadMore from "@/components/LoadMore";
import { useState } from "react";
import { getBlogPage } from "@/lib/pages";
import parse from 'html-react-parser';
import { getMenu } from "@/lib/menu";

export async function getStaticProps() {
    const allPosts = await getPostList();
    const pageData = await getBlogPage();
    const menu = await getMenu();
    
    return {
        props: {
            allPosts: allPosts,
            pageData: pageData,
            menu: menu
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
                    case 'acf/hero':
                        return <Hero key={index} block={block} />;
                    // Add more cases for other block types
                    case 'acf/podcast-links':
                        return <PodcastLinks key={index} block={block} />;
                    default:
                        return null;
                }
            })}
        
        <div className="container">
            <div className="row">
                {
                    posts.nodes.map((post) => (
                        <Card post={post} />
                    ))
                }
                <LoadMore posts={posts} setPosts={setPosts} />
            </div>
        </div>
        <Footer />
        </>
    )
}