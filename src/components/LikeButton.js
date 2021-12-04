import { useState, useEffect } from 'react';

const LikeButton = (props) => {

    const like = async () => {
        await fetch(`${props.fetchUrl}/post/like/${props.post_id}`, {
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
            <button onClick={() => like()}>{props.userLikedPosts.includes(props.post_id) ? '❤️' : '🤍'}</button>
        </>
    )
}

export default LikeButton;