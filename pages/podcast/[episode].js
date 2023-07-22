import BlogHero from '@/components/blog_hero';
import Footer from '@/components/footer';
import Navigation from '@/components/nav';
import { getMenu } from '@/lib/menu';
import xml2js from 'xml2js'

// Fetch RSS feed 
async function getEpisodes() {
    const resp = await fetch('https://anchor.fm/s/e2d645d8/podcast/rss').then(res => res.text())
    // Parse XML 
    const parser = new xml2js.Parser()
    let json = await parser.parseStringPromise(resp)

    // Console log the JSON 
    //console.log(json)
    //const title = json.rss.channel[0].item[0].title;
    //const slug = JSON.stringify(title).replace(/ /g, '-').toLowerCase().replace(/[\[\]"]/g, '')
    //console.log('/*=============================*/\n\n\n\n\n\n\n\n' + slug + '\n\n\n\n\n\n\n\n\n/*=============================*/');
    return json.rss.channel[0].item.map(item => {
        return {
            title: item.title,
            slug: JSON.stringify(item.title).replace(/ /g, '-').toLowerCase().replace(/[\[\]"]/g, ''),
            data: item
        }
    });
}

export async function getStaticPaths() {
    const episodes = await getEpisodes()
    const paths = episodes // use link or title
        .map(e => ({
            params: { episode: e.slug }
        }))

    return { paths, fallback: false }
}

// get episode details by link 
export async function getStaticProps({ params }) {

    const { episode } = params;

    const episodes = await getEpisodes();
    const menu = await getMenu();

    const episodeData = episodes.find(ep => ep.slug === episode);

    return {
        props: {
            episode: episodeData,
            menu,
        }
    }

}


export default function Episode({ episode, menu }) {
    const link = JSON.stringify(episode.data.link).replace(/[\[\]"]/g, '');
    const embedLink = link.replace('/episodes/', '/embed/episodes/');

    return (
        <>
            <Head>
                <title>{episode.data.title}</title>
                <meta name="robots" content="index, follow"/>
            </Head>
            <Navigation menu={menu} />
            <BlogHero data={episode.data} />
            
            
            {/* render episode */}
            <div className="container">
                <div className="row">
                    <div className='col-12 mb-5'>
                        <iframe src={embedLink} height="102px" width="400px" frameborder="0" scrolling="no" style={{ width: '100%', height: 'auto' }}></iframe>
                    </div>
                    <div className="col-12" dangerouslySetInnerHTML={{ __html: episode.data.description }}></div>
                </div>
            </div>
            <Footer />
        </>
    )

}