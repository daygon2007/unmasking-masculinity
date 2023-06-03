import Layout from '../app/layout';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }) {
    

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