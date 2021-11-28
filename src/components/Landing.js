import { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";

const Landing = (props) => {
    const [ posts, setPosts ] = useState([]);

    const fetchPublicPosts = () => {
        fetch("http://localhost:3000/post/", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            setPosts(json);
        })
    };

    useEffect(() => {
        fetchPublicPosts();
    }, []);

    return (
        <div id='landing'>
            <h5>Landing</h5>
            <p>Landing Page</p>
            <PostDisplay posts={posts}/>
        </div>
    )
}

export default Landing;