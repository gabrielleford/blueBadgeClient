import { useEffect, useState } from "react";
import { Button } from "reactstrap";

const PostById = (props) => {
  let pathName = window.location.pathname;
  let id = pathName.slice(6, 8);
  const [post, setPost] = useState({});

  const fetchPostById = async () => {
    if (props.sessionToken != '') {
      try {
        await fetch(`http://localhost:3000/post/${id}`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.sessionToken}`,
            credentials: 'include'
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json[0])
            setPost(json[0]);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(post)
    if (Object.keys(post).length === 0) fetchPostById();
  }, [props.sessionToken]);

  return (
    <div id="postById">
      <h5>Post by ID</h5>
      <p>Individual post with edit/delete options</p>
      <div className="post">
        {post ? <img src={post.image} alt={post.title} /> : ""}
        {post ? <p>{post.title}</p> : ""}
        {post ? <p>{post.description}</p> : ""}
        {post ? <p>{post.tag}</p> : ""}
      </div>
    </div>
  );
};

export default PostById;