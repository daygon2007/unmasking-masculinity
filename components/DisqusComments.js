import { DiscussionEmbed } from "disqus-react"

const DisqusComments = ({ post }) => {
    const disqusShortname = "unmasking-masculinity"
    const disqusConfig = {
        url: `https://www.unmasking-masculinity.com/blog/${post.slug}`,
        identifier: post.id, // Single post id
        title: post.title // Single post title
    }
    return (
        <>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </>
    )
}
export default DisqusComments;