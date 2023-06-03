import Head from "next/head";
import Navigation from "@/components/nav";
import Footer from "@/components/footer";
import { useState } from "react";



export default function Success() {

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
            <title>Thank you for contacting us - Unmasking Masculinity</title>
        </Head>
        <Navigation />

            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <h1>Contact Us</h1>
                        <div className="alert alert-success">
                            Thanks for contacting us!
                        </div>
                        <p>Your contact email has been sent and will be received by our staff shortly. In the meantime, have you joined our Discord community yet?</p>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    )
}