import { useState, useEffect } from 'react'

const PostDisplay = (props) => {
    const [posts, setPosts] = useState([]);
    const [method, setMethod] = useState({})

    const createHeaders = () => {
        if (props.sessionToken !== '') {
            setMethod({
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.sessionToken}`,
                    credentials: "included"
                })
            });
        } else {
            //console.log('not logged in');
            setMethod({
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                })
            });
        }
    };

    const postMapper = () => {
        let fetchURL;
        switch (props.getWhat.what) {
            case 'all': props.sessionToken ? fetchURL = '/post/allposts' : fetchURL = '/post/'; break;
            case "tag":
                if (props.getWhat.tag === "fur baby")
                    fetchURL = "/post/tag/all/FurBaby";
                else if (props.getWhat.tag === "scale baby")
                    fetchURL = "/post/tag/all/ScaleBaby";
                else if (props.getWhat.tag === "exotic baby")
                    fetchURL = "/post/tag/all/ExoticBaby";
                break;
            case 'user': fetchURL = `/post/posts/all/${props.username}`; break;
            case 'likes': fetchURL = '/post/toplikes'; break;
        }

        try {
            fetch(`http://localhost:3000${fetchURL}`, method)
                .then((res) => res.json())
                .then((json) => setPosts(json))
        }
        catch (error) { console.log(error) }
    };

    useEffect(() => {
        postMapper();
        createHeaders();
    }, [props.getWhat, props.sessionToken, Array.isArray(posts)])

    return (
        <div id='postDisplay'>
            <h5>Post Display</h5>
            <p>Multiple posts</p>
            {Array.isArray(posts) ? posts.map((post, index) => {
                let postTag;

                if (post.tag === 'FurBaby') {
                    postTag = post.tag.slice(0, 3);
                } else if (post.tag === 'ScaleBaby') {
                    postTag = post.tag.slice(0, 5);
                } else if (post.tag === 'ExoticBaby') {
                    postTag = post.tag.slice(0, 6);
                }

                return (
                    <div key={index} className='post'>
                        <img src={post.image} alt={post.title} />
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                        <p>{postTag} Baby</p>
                    </div>
                );
            }) : ''}
        </div>
    );
};

export default PostDisplay;