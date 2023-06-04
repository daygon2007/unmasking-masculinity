import Link from "next/link";
import Date from "./date";

const BlogHero = ({data}) => {
    return (
        <div className="hero px-4 py-5 mb-5 text-center">
                <h1 className="display-5 fw-bold">{data?.title}</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Last updated: <Date dateString={data?.modified} /></p>
                </div>
        </div>
    )
}

export default BlogHero;