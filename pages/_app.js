import { useEffect } from 'react';
import Layout from '../app/layout';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import TagManager from 'react-gtm-module';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-5G3XQ9K'})
    })

    return (
        <Layout>
            <GoogleReCaptchaProvider
                reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}
                scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: "head",
                    nonce: undefined,
                }}
            >
            <Component {...pageProps} />
            </GoogleReCaptchaProvider>
        </Layout>
    );
}

export default MyApp;