import Date from "./date";
import Image from "next/image";
import Link from "next/link";

export default function PodcastFeed({ feed, block }) {
    const data = JSON.parse(block.dynamicContent);
    const {
        section_title,
        number_of_items_to_show
    } = data

    const limit = number_of_items_to_show;
    let limitedItems = '';
    if (limit > 0) {
        limitedItems = feed?.slice(0, limit);
    } else {
        limitedItems = feed;
    }

    const podcastURL = 'https://podcast.agamingmoment.com';

    return (
        <>
            <div className="podcast-feed my-5">
                <div className="container">
                    <div className="row">
                        {section_title ? (
                            <div className="col-12 mb-5">
                                <h2 className="mt-0 text-center">{section_title}</h2>
                            </div>
                        ) : (null)}
                        {limitedItems.map((item) => (
                            <>
                                <div className="col-md-3 mb-5" key={item.guid}>
                                    <div className="card">
                                        <Image src={item.itunes.image} className="card-img-top img-fluid" alt={item.title} width="500" height="500" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p>
                                                Released on: <Date dateString={item.isoDate} />
                                            </p>

                                            <Link href={item.enclosure.url.replace('https://pdcn.co/e/www.buzzsprout.com', podcastURL).replace('.mp3', '')} className="btn btn-primary">Listen now</Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
