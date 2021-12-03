import { useState, useEffect } from 'react'
import LikeButton from './LikeButton';

const PostDisplay = (props) => {
    const [posts, setPosts] = useState([]);
    const [method, setMethod] = useState({})

    const createHeaders = () => {
        //console.log(props.sessionToken)
        if (props.sessionToken !== '') {
            setMethod({
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${props.sessionToken}`
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

    const postMapper = async () => {
        let fetchURL;
        switch (props.getWhat.what) {
            case 'all': props.sessionToken !== '' ? fetchURL = '/post/allposts' : fetchURL = '/post/'; break;
            case "tag":
                fetchURL = '/post/tag/all/';
                if (props.getWhat.tag === "fur baby") fetchURL += "FurBaby";
                else if (props.getWhat.tag === "scale baby") fetchURL += "ScaleBaby";
                else if (props.getWhat.tag === "exotic baby") fetchURL += "ExoticBaby";
                break;
            case 'user': props.sessionToken !== '' ? fetchURL = `/post/posts/all/${props.username}` : fetchURL = `/post/posts/${props.username}`; break;
            case 'likes': fetchURL = '/post/toplikes'; break;
        }
        //console.log(`http://localhost:3000${fetchURL}`)
        await fetch(`http://localhost:3000${fetchURL}`, method)
            .then((res) => res.json())
            .then((json) => setPosts(json))
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        createHeaders();
        if (props.username !== '') postMapper();
    }, [props.getWhat, props.sessionToken, Array.isArray(posts), props.userLikedPosts, props.username])

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
                        <p>{post.likes} Likes</p>
                        <p>
                            <LikeButton
                                post_id={post.post_id}
                                userLikedPosts={props.userLikedPosts}
                                sessionToken={props.sessionToken}
                                fetchData={props.fetchData}
                            />
                        </p>
                        <p>{postTag} Baby</p>
                    </div>
                );
            }) : ''}
        </div>
    );
};

export default PostDisplay;