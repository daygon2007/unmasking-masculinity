import Head from "next/head";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import { getMenu } from "@/lib/menu";
import Link from "next/link";

export async function getStaticProps() {
    const menu = await getMenu();

    return {
        props: {
            menu: menu,
        }
    }
}


export default function NotFound({ menu }) {

    return (
        <>
            <Head>
                <title>No Found | Unmasking Masculinity</title>
            </Head>
            <Navigation menu={menu} />
            <div id="not-found">
                <div>
                    <h1 className="white">Uh oh...</h1>
                    <p className="lead white">What&apos;cha doin here? This isn't what you&apos;re looking for.</p>
                    <p className="white">Let&apos;s get you pointed in the right direction... Here's our <Link href="/podcast/">podcast</Link> and here&apos;s our <Link href="/blog/">blog</Link>. If there's anything specific you're looking for, <Link href="/contact/">contact us</Link>.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}