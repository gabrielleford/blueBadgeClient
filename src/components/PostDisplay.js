import { useState, useEffect } from 'react'

const PostDisplay = (props) => {
    const [posts, setPosts] = useState([]);

    const postMapper = () => {
        let fetchURL;
        switch (props.getWhat.what) {
            case 'all': fetchURL = 'http://localhost:3000/post/'; break;
            case 'tag':
                if (props.getWhat.tag === 'fur baby') fetchURL = 'http://localhost:3000/post/tag/:furbaby'
                else if (props.getWhat.tag === 'scale baby') fetchURL = 'http://localhost:3000/post/tag/:scalebaby'
                else if (props.getWhat.tag === 'exotic baby') fetchURL = 'http://localhost:3000/post/tag/:exoticbaby'
                break;
            case 'user': fetchURL = 'http://localhost:3000/posts/:user_id'; // !update w/variable
        }
        try {
            fetch(fetchURL, {
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
        }
        catch (error) { console.log(error) }

        return posts.map((post, index) => {
            return (
                <div key={index} className='post'>
                    <img src={post.image} alt={post.title} />
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <p>{post.tag}</p>
                </div>
            );
        });
    };

    useEffect(() => {
        postMapper();
    }, [props.getWhat])

    return (
        <div id='postDisplay'>
            <h5>Post Display</h5>
            <p>Multiple posts</p>
            {posts.map((post, index) => {
                return (
                    <div key={index} className='post'>
                        <img src={post.image} alt={post.title} />
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                        <p>{post.tag}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default PostDisplay;