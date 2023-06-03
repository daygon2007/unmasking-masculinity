import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "./NewsletterForm";


export default function Subscribe({ block }) {
    const data = JSON.parse(block.dynamicContent);
    const {
        section_id,
        background_color,
        section_class,
        section_title,
        section_title_class,
    } = data;

    


    return (
        <div className={`subscribe-section ${background_color}`} id={section_id}>
            <div className={`container ${section_class}`}>
                <div className="row py-5 justify-content-center">
                    <div className="col-md-6 text-center">
                        {section_title ? (
                            <div className="col-12 mb-5">
                                <h2 className={`mt-0 text-center ${section_title_class}`}>{section_title}</h2>
                                <p>Unlock the power of emotional well-being and join our newsletter to receive exclusive insights, resources, and support for men&apos;s mental health, empowering you to embrace vulnerability and thrive.</p>
                            </div>
                        ) : (null)}
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
    );
}