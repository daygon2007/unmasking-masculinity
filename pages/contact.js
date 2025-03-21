import Head from "next/head";
import Footer from "@/components/footer";
import { useState } from "react";
import Navigation from "@/components/nav";
import HomeHero from "@/components/HomeHero";
import parse from 'html-react-parser';
import { getMenu } from "@/lib/menu";
import LogoBar from '@/components/LogoBar';
import PodcastFeed from "@/components/PodcastFeed";
import RichText from "@/components/RichText";
import Subscribe from "@/components/MailChimpSubscribe";
import GeneralHero from "@/components/GeneralHero";
import { getContactPage } from "@/lib/pages";

export async function getStaticProps() {
    const pageData = await getContactPage();
    const menu = await getMenu();

    return {
        props: {
            pageData: pageData,
            menu: menu,
        }
    }
}



export default function Contact({pageData, menu}) {

    const parsedHead = pageData?.seo?.fullHead ? parse(pageData?.seo?.fullHead.replaceAll('podcast.jonathon-harrelson.com', 'unmasking-masculinity.com')) : null;
    const pageBlocks = (pageData && pageData.blocks) || [];

    const [submitStatus, setSubmitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('alert-success');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            message: event.target.message.value,
        }

        const jsonData = JSON.stringify(data);

        const response = await fetch('./api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        });
        const result = await response.json();

        setSubmitStatus(true);
        setResponseMessage(result.data);

        if(!response.ok) {
            setAlertColor('alert-danger');
        } else {
            setAlertColor('alert-success');
        }
    }


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
        

            <div className="container my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <form id="contactForm" className="needs-validation" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" name="contact" action="/success">
                            <input type="hidden" name="form-name" value="contact" />
                            <input name="bot-field" className="d-none" />
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" required />
                                <div className="invalid-feedback">
                                    Please enter your name.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" required />
                                <div className="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
                                <div className="invalid-feedback">
                                    Please enter a message.
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        {submitStatus ? <SubmissionAlert message={responseMessage} alertColor={alertColor} /> : null}
                    </div>
                </div>
            </div>
        <Footer />
        </>
    )
}

const SubmissionAlert = ({message, alertColor}) => {
    return(
        <div className={`alert ${alertColor}`} role="alert">
            {message}
        </div>
    )
}