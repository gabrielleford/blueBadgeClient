import React, { useState, useEffect } from 'react'
import LikeButton from './LikeButton';
import Post from './Post';

const PostDisplay = (props) => {
    const [posts, setPosts] = useState([]);
    const [method, setMethod] = useState({});
    const [offset, setOffset] = useState(0);

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
        await fetch(`http://localhost:3000${fetchURL}/${offset}`, method)
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setPosts(json)
                console.log(posts)
            })
            .catch((error) => console.log(error))
    };

    const mapInSlices = (array, sliceSize, sliceFunc) => {
        const out = [];
        for (var i = 0; i < array.length; i += sliceSize) {
            const slice = array.slice(i, i + sliceSize);
            out.push(sliceFunc(slice, i));
        }
        return out;
    }

    useEffect(() => {
        createHeaders();
        if (props.username !== '') postMapper();
    }, [props.getWhat, props.sessionToken, Array.isArray(posts), props.userLikedPosts, props.username, offset])

    return (
        <>
            {mapInSlices(posts, 4, (slice) => (
                <div className='row post-row justify-content-center'>
                    {slice.map((post, index) => (

                        <Post
                            post_id={post.post_id}
                            userLikedPosts={props.userLikedPosts}
                            sessionToken={props.sessionToken}
                            fetchData={props.fetchData}
                            title={post.title}
                            image={post.image}
                            index={index}
                        />
                    ))}
                </div>
            ))}


            {/* <div id='buttons'>
                <button id='next' className='btn-pb' onClick={() => setOffset(offset + 12)}>more!</button>
            </div> */}
        </>
    );
};

export default PostDisplay;