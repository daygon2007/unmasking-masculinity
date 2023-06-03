import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const MailchimpSubscribe = ({block}) => {
    const data = JSON.parse(block.dynamicContent);
    const {
        section_id,
        background_color,
        section_class,
        section_title,
        section_title_class,
    } = data;



    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        if (!captchaToken) {
            setMessage('Please complete the reCAPTCHA verification.');
            return;
        }

        try {
            const response = await fetch('/api/recaptcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: captchaToken, email }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
                    // Perform your desired actions when reCAPTCHA verification is successful
                    // For example, you can subscribe the email to Mailchimp here
                    setMessage('Successfully subscribed!');
                    setEmail('');
                    setCaptchaToken('');
                } else {
                    setMessage('reCAPTCHA verification failed.');
                }
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    return (
        <>
            <div className={`subscribe-section ${background_color}`} id={section_id}>
                <div className={`container ${section_class}`}>
                    <div className="row py-5 justify-content-center">
                        <div className="col-md-6 text-center">
                            {section_title ? (
                                <div className="col-12 mb-5">
                                    <h2 className={`mt-0 text-center ${section_title_class}`}>{section_title}</h2>
                                </div>
                            ) : (null)}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control form-control-lg"
                                />
                                <ReCAPTCHA
                                    sitekey={`${process.env.RECAPTCHA_SITE_KEY}`}
                                    onChange={handleCaptchaChange}
                                />
                                <button type="submit" className="btn btn-secondary">
                                    Subscribe
                                </button>
                            </form>
                            {message && (
                                <p className={`alert ${data.success ? 'alert-success' : 'alert-danger'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MailchimpSubscribe;
