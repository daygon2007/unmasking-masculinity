import { getPostList } from "@/lib/posts";
import { useState } from "react";

export default function LoadMore({posts, setPosts}) {

    const [buttonText, setButtonText] = useState('Load more');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleOnclick = async (event) => {
        let clickedBtn = event.target;

        setButtonText('Loading...');

        const morePosts =  await getPostList(posts.pageInfo.endCursor);

        let updatedPosts = {
            pageInfo: {

            }, 
            nodes: [],
        }

        updatedPosts.pageInfo = morePosts.pageInfo;

        posts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        });

        morePosts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        });

        setPosts(updatedPosts);

        if(morePosts.pageInfo.hasNextPage) {
            setButtonText('Load more');
            setButtonDisabled(false);
        } else {
            setButtonText('No more posts');
            setButtonDisabled(true);
        }
    }
    return(
        <>
            <div className="col-12 mt-3 text-center">
                <button className="btn btn-primary d-inline-block"
                onClick={handleOnclick} 
                disabled={buttonDisabled}
                >
                    {buttonText}
                </button>
            </div>
            
        </>
        
    )
}