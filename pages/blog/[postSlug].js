import Head from "next/head";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import { getPostSlugs, getSinglePost } from "@/lib/posts";
import parse from 'html-react-parser';
import BlogHero from "@/components/blog_hero";
import { getMenu } from "@/lib/menu";
import DisqusComments from "@/components/DisqusComments";

export async function getStaticProps({ params }) {
    const postData = await getSinglePost(params.postSlug);
    const menu = await getMenu();
     return {
        props: {
            postData,
            menu
        }
    }
}

export async function getStaticPaths() {
    const postSlugs = await getPostSlugs();

    return {
        paths: postSlugs.map((s) => (
            {
                params: {
                    postSlug: s.slug
                }
            }
        )
        ),
        fallback: false
    }
}

export default function Post({postData, menu}) {
    const parsedHead = postData.seo.fullHead ? parse(postData.seo.fullHead.replaceAll('podcast.jonathon-harrelson.com', 'unmasking-masculinity.com')) : null;
    return (
        <>
        <Head>
            {parsedHead}
            <meta name="robots" content={`${postData.seo.metaRobotsNoindex}, ${postData.seo.metaRobotsNofollow}`} />
        </Head>
        <Navigation menu={menu} />
        <BlogHero data={postData} />
        <div className="container">
            <div className="row">
                <div className="col-12" dangerouslySetInnerHTML={{__html: postData.content}}></div>
                <div className="col-12 mt-5">
                    <DisqusComments post={postData} />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}