import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-5 d-flex align-items-center">
                        <span className="mb-3 mb-md-0 text-body-secondary me-2">© 2023 Unmasking Masculinity</span> | <Link href="/privacy-policy/" className='me-2 ms-2'>Privacy Policy</Link> 
                    | <Link href="/terms-of-use/" className='ms-2'>Terms of Use</Link>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><Link href="https://www.facebook.com/people/Unmasking-Masculinity/100093406999722/" target='_blank' className='footer-social-link'><i className='fa-brands fa-facebook' /></Link></li>
                        {/*<li className="ms-3"><Link href="#" target='_blank' className='footer-social-link'><i className='fa-brands fa-tiktok' /></Link></li>*/}
                        {/*<li className="ms-3"><Link href="#" target='_blank' className='footer-social-link'><i className='fa-brands fa-linkedin' /></Link></li>*/}
                        <li className="ms-3"><Link href="https://twitter.com/MensAwareness" target='_blank' className='footer-social-link'><i className='fa-brands fa-twitter' /></Link></li>
                        {/*<li className="ms-3"><Link href="#" target='_blank' className='footer-social-link'><i className='fa-brands fa-instagram' /></Link></li>*/}
                        <li className="ms-3"><Link href="https://www.youtube.com/@UnmaskingMasculinity" target='_blank' className='footer-social-link'><i className='fa-brands fa-youtube' /></Link></li>
                        {/*<li className="ms-3"><Link href="#" target='_blank' className='footer-social-link'><i className='fa-brands fa-discord' /></Link></li>*/}
                    </ul>
                </footer>
            </div>
        </>
    )
}