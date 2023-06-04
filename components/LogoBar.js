import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LogoBar = ({ block }) => {
    const data = JSON.parse(block.dynamicContent);

    const {
        section_id,
        background_color,
        section_class,
        logo_bar_text,
        logo_bar_text_class,
        logos
    } = data
    return (
        <>
            <div className={`podcast-links py-3 ${background_color}`} id={section_id}>
                <div className={`container ${section_class}`}>
                    <div className='row align-items-center'>
                        <div className='col-md-2'>
                            <p className={`m-0 p-0 ${logo_bar_text_class}`}>
                                {logo_bar_text}
                            </p>
                        </div>
                        <div className='col-md-10'>
                            <div className='row justify-content-center align-items-center'>
                                {logos.map((link, index) => {
                                    const { logo, url } = link;
                                    return (
                                        <div className='col-md col-6' key={index}>
                                            <Link href={url}>
                                                <Image
                                                    src={logo.img_url}
                                                    alt={logo.img_alt}
                                                    width={logo.img_width}
                                                    height={logo.img_height}
                                                    className='img-fluid w-100'
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
