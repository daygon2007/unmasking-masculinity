import { useEffect } from 'react';
import Layout from '../app/layout';
import TagManager from 'react-gtm-module';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-5G3XQ9K'})
    })

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;