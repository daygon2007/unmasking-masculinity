import React from "react";
import Link from "next/link";
import Image from "next/image";
import Date from "./date";

const Card = ({post}) => {

    return (
        <div className="col-md-3" key={post?.slug}>
            <div className="card">
                <Image src={post.featuredImage?.node?.sourceUrl} className="card-img-top img-fluid" alt={post.title} width={post.featuredImage?.node?.mediaDetails?.width} height={post.featuredImage?.node?.mediaDetails?.height} />
                <div className="card-body">
                    <h5 className="card-title">{post?.title}</h5>
                    <p>
                        Posted on: <Date dateString={post.date} />
                    </p>
                    
                    <Link href={`/blog/${post?.slug}`} className="btn btn-primary">Read Blog</Link>
                </div>
            </div>
        </div>
    )
}

export default Card;