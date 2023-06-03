// subscribe.js

require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        // Retrieve the data from the request body
        const { email } = JSON.parse(event.body);

        // Prepare the request payload
        const data = {
            email_address: email,
            status: 'subscribed',
        };

        // Make a request to the Mailchimp API
        const response = await fetch(`https://${process.env.MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
            },
            body: JSON.stringify(data),
        });

        // Handle the response
        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            return {
                statusCode: response.status,
                body: JSON.stringify({ success: false, error: 'Failed to subscribe. Please try again later.' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message }),
        };
    }
};
