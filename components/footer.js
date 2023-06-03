import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <span className="mb-3 mb-md-0 text-body-secondary">© 2023 Unmasking Masculinity</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><Link href="#" target='_blank'><i className='fa-brands fa-facebook fa-2x' /></Link></li>
                        <li className="ms-3"><Link href="#" target='_blank'><i className='fa-brands fa-tiktok fa-2x' /></Link></li>
                        <li className="ms-3"><Link href="#" target='_blank'><i className='fa-brands fa-linkedin fa-2x' /></Link></li>
                        <li className="ms-3"><Link href="#" target='_blank'><i className='fa-brands fa-twitter fa-2x' /></Link></li>
                        <li className="ms-3"><Link href="#" target='_blank'><i className='fa-brands fa-facebook fa-2x' /></Link></li>
                        <li className="ms-3"><Link href="#" target='_blank'><i className='fa-brands fa-instagram fa-2x' /></Link></li>
                        <li className="ms-3"><Link href="#" target='_blank'><i className='fa-brands fa-youtube fa-2x' /></Link></li>
                    </ul>
                </footer>
            </div>
        </>
    )
}