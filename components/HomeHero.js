import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";

const HomeHero = ({ block }) => {

    const data = JSON.parse(block.dynamicContent);

    // Access the data specific to the hero block
    const {
        hero_id,
        hero_classes,
        hero_text,
        hero_sub_text,
        hero_cta_text,
        hero_cta_url,
        hero_target
    } = data;

    const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
    const isClient = typeof window !== "undefined";

    return (
        <>
            <div class="hero">
                <div className={`container col-xl-10 col-xxl-8 px-4 py-5 ${hero_classes}`} id={`${hero_id}`}>
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                                {hero_text}
                            </h1>
                            <p className="mt-4 text-lg">{hero_sub_text}</p>
                           
                            {hero_cta_text ? (
                                <div className="mt-5">
                                    <Link
                                        href={hero_cta_url}
                                        className="btn btn-primary btn-lg px-4 me-md-2"
                                        target={hero_target}
                                        rel="noopener noreferrer"
                                    >
                                        {hero_cta_text}
                                    </Link>
                                </div>
                            ): (null)}
                                
                        </div>
                        <div className='col-md-10 mx-auto col-lg-6'>
                            <div className='ratio ratio-16x9'>
                                {isClient ? (
                                <ReactPlayer url="https://www.youtube.com/watch?v=XRN2zd8jUTY" className="w-100 h-100" />
                                ) : null}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HomeHero;
