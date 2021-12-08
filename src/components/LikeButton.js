import { useState, useEffect } from 'react';

const LikeButton = (props) => {

    const like = async () => {
        await fetch(`http://localhost:3000/post/like/${props.post_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.sessionToken,
            }
        })
            .then(props.fetchData)
            .catch((error) => console.log(error))
    }

    useEffect(() => {

    }, [props.userLikedPosts])

    return (
        <>
            <p className='post-like like' onClick={() => like()}>{props.userLikedPosts.includes(props.post_id) ? '❤️' : '🤍'}</p>
        </>
    )
}

export default LikeButton;