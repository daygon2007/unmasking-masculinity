import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LogoBar = ({ block }) => {
    const data = JSON.parse(block.dynamicContent);

    const {
        logo_bar_text,
        logos
    } = data
    return (
        <>
            <div className='podcast-links bg-black py-3'>
                <div class="container">
                    <div className='row align-items-center'>
                        <div className='col-md-2'>
                            <p className='white m-0 p-0'>
                                {logo_bar_text}
                            </p>
                        </div>
                        <div className='col-md-10'>
                            <div className='d-flex flex-row justify-content-start'>
                                {logos.map((link, index) => {
                                    const { logo, url } = link;
                                    return (
                                        <div className='mx-5' key={index}>
                                            <Link href={url}>
                                                <Image
                                                    src={logo.img_url}
                                                    alt={logo.img_alt}
                                                    width={logo.img_width}
                                                    height={logo.img_height}
                                                    className='img-fluid'
                                                />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogoBar;
