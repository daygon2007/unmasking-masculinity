import Head from "next/head";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import { useState } from "react";



export default function Contact() {

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
        console.log(result.data);

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
            <title>Contact Us - Unmasking Masculinity</title>
        </Head>
        <Navigation />

            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <h1>Contact Us</h1>

                        <form id="contactForm" className="needs-validation" noValidate onSubmit="submit" netlify method="POST" data-netlify-honeypot="bot-field" action="/success">
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