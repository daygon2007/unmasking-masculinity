import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";

const GeneralHero = ({ block }) => {

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

    const isClient = typeof window !== "undefined";

    return (
        <>
            <div className="hero py-5">
                <div className="px-4 py-5 text-center">
                    <h1 className="display-5 fw-bold white mb-3">{hero_text}</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">{hero_sub_text}</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
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
                            ) : (null)}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default GeneralHero;
