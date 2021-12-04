import { useState, useEffect } from 'react'
import LikeButton from './LikeButton';

const PostDisplay = (props) => {
    const [posts1, setPosts1] = useState([]);
    const [posts2, setPosts2] = useState([]);
    const [posts3, setPosts3] = useState([]);
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
                //yes this is stupid :)
                console.log(json)
                setPosts1(json.slice(0, 4))
                setPosts2(json.slice(4, 8))
                setPosts3(json.slice(8, 12))
                console.log(posts2)
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        createHeaders();
        if (props.username !== '') postMapper();
    }, [props.getWhat, props.sessionToken, Array.isArray(posts1), props.userLikedPosts, props.username, offset])

    return (
        <>
            <div className="row post-row justify-content-center">
                {Array.isArray(posts1) ?
                    posts1.map((post, index) => {
                        return (
                            <div key={index} className="post col-xs-10 offset-xs-1 col-sm-10 col-md-5 col-xl-2">
                                <a href={'/post/' + post.post_id}>
                                    <img src={post.image} class='post-pic' />
                                </a>
                                <div class='d-flex post-info justify-content-between'>
                                    <p class='post-title'>{post.title.length < 20 ? post.title : post.title.substring(0, 20) + '...'}</p>
                                    <p class='post-like'>
                                        <LikeButton
                                            post_id={post.post_id}
                                            userLikedPosts={props.userLikedPosts}
                                            sessionToken={props.sessionToken}
                                            fetchData={props.fetchData}
                                        /></p>
                                </div>
                            </div>
                        );
                    })
                    : ''}
            </div>
            <div className="row post-row justify-content-center">
                {Array.isArray(posts2) ?
                    posts2.map((post, index) => {
                        return (
                            <div key={index} className="post col-xs-10 offset-xs-1 col-sm-10 col-md-5 col-xl-2">
                                <a href={'/post/' + post.post_id}>
                                    <img src={post.image} class='post-pic' />
                                </a>
                                <div class='d-flex post-info justify-content-between'>
                                    <p class='post-title'>{post.title.length < 20 ? post.title : post.title.substring(0, 20) + '...'}</p>
                                    <p class='post-like'>
                                        <LikeButton
                                            post_id={post.post_id}
                                            userLikedPosts={props.userLikedPosts}
                                            sessionToken={props.sessionToken}
                                            fetchData={props.fetchData}
                                        /></p>
                                </div>
                            </div>
                        );
                    })
                    : ''}
            </div>
            <div className="row post-row justify-content-center">
                {Array.isArray(posts3) ?
                    posts3.map((post, index) => {
                        return (
                            <div key={index} className="post col-xs-10 offset-xs-1 col-sm-10 col-md-5 col-xl-2">
                                <a href={'/post/' + post.post_id}>
                                    <img src={post.image} class='post-pic' />
                                </a>
                                <div className='d-flex post-info justify-content-between'>
                                    <p className='post-title'>{post.title.length < 20 ? post.title : post.title.substring(0, 20) + '...'}</p>
                                    <p className='post-like'>
                                        <LikeButton
                                            post_id={post.post_id}
                                            userLikedPosts={props.userLikedPosts}
                                            sessionToken={props.sessionToken}
                                            fetchData={props.fetchData}
                                        /></p>
                                </div>
                            </div>
                        );
                    })
                    : ''}
            </div>
            <div id='buttons'>
                {offset > 0 ? <button className='btn-pb' id='previous' onClick={() => setOffset(offset - 12)}>Previous</button> : ''}
                <button id='next' className='btn-pb' onClick={() => setOffset(offset + 12)}>Next</button>
            </div>
        </>
    );
};

export default PostDisplay;