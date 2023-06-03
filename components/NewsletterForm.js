import { useState } from "react"
import { sanitize } from '../lib/utils';

export default function NewsletterForm({ status, message, onValidated }) {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);

    const handleFormSubmit = () => {
        setError(null);

        if (!email) {
            setError('Please enter a valid email');
            return null;
        }

        const isFormValidated = onValidated({ EMAIL: email });

        return email && email.indexOf("@") > -1 && isFormValidated;
    }

    const handleInputKeyEvent = (event) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit();
        }
    }

    const getMessage = (message) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ("0" !== result?.[0]?.trim()) {
            return sanitize(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? sanitize(formattedMessage) : null;
    }



    return (
        <>
            <div className="row justify-content-center">
                <div class="col-8 col-md-5"><input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event?.target?.value ?? '')}
                    className="form-control mb-3"
                    placeholder="Your Email"
                    onKeyUp={(event) => handleInputKeyEvent(event)}
                /></div>
                <div class="col-md-2">
                    <button className="btn btn-light" onClick={handleFormSubmit}>
                        Submit
                    </button>
                </div>
                <div class="col-12">
                    {'sending' === status ? (
                        <div class="alert alert-info mt-3">
                            Sending <i class="fa-solid fa-sync fa-spin"></i>
                        </div>
                    ) : null}
                    {'error' === status || error ? (
                        <div class="alert alert-danger mt-3" dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}></div>
                    ) : null}
                    {'success' === status && 'error' !== status && !error && (
                        <div class="alert alert-success mt-3" dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}></div>
                    )}
                </div>
            </div>
        </>
    )
}