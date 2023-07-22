import Link from "next/link";
import Date from "./date";

const BlogHero = ({data}) => {
    return (
        <>
            <div className="hero px-4 py-5 my-5 text-center">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <h1 className="display-5 fw-bold">{data?.title}</h1>
                        <div className="col-lg-6 mx-auto">
                            {data?.modified &&
                                <p className="lead mb-4">Last updated: <Date dateString={data.modified} /></p>
                            }
                            {
                                data?.seo?.readingTime &&
                                <p>Estimated time to read: {data?.seo?.readingTime} minutes</p>
                            }
                            
                        </div>
                    </div>
                </div>

            </div>
        </>
        
    )
}

export default BlogHero;