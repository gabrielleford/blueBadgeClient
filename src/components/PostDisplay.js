import { useState, useEffect } from 'react'

const PostDisplay = (props) => {
    const postMapper = () => {
        return props.posts.map((post, index) => {
            return(
                <div key={index} className='post'>
                    <img src={post.image} alt={post.title} />
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <p>{post.tag}</p>
                </div>
            );
        });
    };
    
    return(
        <div className='postDisplay'>
            <h5>Post Display</h5>
            <p>Multiple posts</p>
            {postMapper()}
        </div>
    );
};

export default PostDisplay;