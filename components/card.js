import React from "react";
import Link from "next/link";
import Image from "next/image";
import Date from "./date";

const Card = ({post}) => {

    return (
        <div class="col-md-3" key={post?.slug}>
            <div class="card">
                <Image src={post.featuredImage?.node?.sourceUrl} class="card-img-top img-fluid" alt={post.title} width={post.featuredImage?.node?.mediaDetails?.width} height={post.featuredImage?.node?.mediaDetails?.height} />
                <div class="card-body">
                    <h5 class="card-title">{post?.title}</h5>
                    <p>
                        Posted on: <Date dateString={post.date} />
                    </p>
                    
                    <Link href={`/blog/${post?.slug}`} class="btn btn-primary">Read Blog</Link>
                </div>
            </div>
        </div>
    )
}

export default Card;