import { useState, useEffect } from 'react'

const PostDisplay = (props) => {
    const [posts, setPosts] = useState([]);
    const [method, setMethod] =useState({})

    const createHeaders = () => {
        if (props.sessionToken) {
            console.log('logged in');
            setMethod({
                method: "GET", 
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.sessionToken}`,
                    credentials: "included"
                })
            });
        } else {
            console.log('not logged in');
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
        if (props.sessionToken) {
            switch (props.getWhat.what) {
                case 'all': fetchURL = 'http://localhost:3000/post/posts'; break;
                case "tag":
                if (props.getWhat.tag === "fur baby")
                  fetchURL = "http://localhost:3000/post/tag/all/FurBaby";
                else if (props.getWhat.tag === "scale baby")
                  fetchURL = "http://localhost:3000/post/tag/all/ScaleBaby";
                else if (props.getWhat.tag === "exotic baby")
                  fetchURL =
                    "http://localhost:3000/post/tag/all/ExoticBaby";
                break;
                case 'user': fetchURL = `http://localhost:3000/post/posts/all/${props.username}`;
            }
        } else {
            switch (props.getWhat.what) {
              case "all":
                fetchURL = "http://localhost:3000/post/";
                break;
              case "tag":
                if (props.getWhat.tag === "fur baby")
                  fetchURL = "http://localhost:3000/post/tag/FurBaby";
                else if (props.getWhat.tag === "scale baby")
                  fetchURL = "http://localhost:3000/post/tag/ScaleBaby";
                else if (props.getWhat.tag === "exotic baby")
                  fetchURL = "http://localhost:3000/post/tag/ExoticBaby";
                break;
              case "user":
                fetchURL = `http://localhost:3000/post/posts/${props.username}`;
            }
        }
        
        try {
            fetch(fetchURL, method)
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    setPosts(json);
                })
        }
        catch (error) { console.log(error) }
    };

    useEffect(() => {
        postMapper();
        createHeaders();
    }, [props.getWhat, props.sessionToken])

    return (
        <div id='postDisplay'>
            <h5>Post Display</h5>
            <p>Multiple posts</p>
            {posts.map((post, index) => {
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
            })}
        </div>
    );
};

export default PostDisplay;