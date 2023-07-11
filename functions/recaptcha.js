/*import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, email } = req.body;

        // Verify reCAPTCHA token with the reCAPTCHA API
        try {
            const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token,
                }).toString(),
            });

            const data = await response.json();
            const { success, score } = data;

            if (success && score >= 0.5) {
                // Perform your desired actions when reCAPTCHA verification is successful
                // For example, you can subscribe the email to Mailchimp here

                res.status(200).json({ success: true });
            } else {
                // Handle failed reCAPTCHA verification
                res.status(400).json({ error: 'reCAPTCHA verification failed' });
            }
        } catch (error) {
            console.error('reCAPTCHA verification error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}*/
