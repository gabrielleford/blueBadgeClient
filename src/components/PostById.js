import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import EditDeletePost from "./EditDeletePost";

const PostById = (props) => {
  let pathName = window.location.pathname;
  let id = pathName.slice(6, (pathName.length));
  const [post, setPost] = useState({});
  const [tag, setTag] = useState('');
  //const { postID } = route.params;
  //console.log(postID)

  const fetchPostById = async () => {
    let fetchURL;
    if (props.sessionToken) {
      fetchURL = `http://localhost:3000/post/validated/${id}`;
      if (props.sessionToken !== '') {
        try {
          await fetch(fetchURL, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.sessionToken}`,
              credentials: "included",
            }),
          })
            .then((res) => res.json())
            .then((json) => {
              setPost(json[0]);
              if (json.tag === "FurBaby") {
                setTag(json[0].tag.slice(0, 3));
              } else if (json[0].tag === "ScaleBaby") {
                setTag(json[0].tag.slice(0, 5));
              } else if (json[0].tag === "ExoticBaby") {
                setTag(json[0].tag.slice(0, 6));
              }
            })
            .catch((error) => console.log(error));
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      fetchURL = `http://localhost:3000/post/${id}`;
      try {
        await fetch(fetchURL, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setPost(json[0]);
            if (json[0].tag === "FurBaby") {
              setTag(json.tag[0].slice(0, 3));
            } else if (json[0].tag === "ScaleBaby") {
              setTag(json.tag[0].slice(0, 5));
            } else if (json.tag[0] === "ExoticBaby") {
              setTag(json.tag[0].slice(0, 6));
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(post).length === 0) fetchPostById();
  }, [props.sessionToken]);

  return (
    <div id="postById">
      <h5>Post by ID</h5>
      <p>Individual post with edit/delete options</p>
      <div className="post">
        {post ? <img src={post.image} alt={post.title} /> : ""}
        {post ? <p className='notEditMode'>{post.title}</p> : ""}
        {post ? <p className='notEditMode'>{post.description}</p> : ""}
        {post ? <p>{tag} Baby</p> : ""}
        {post && props.sessionToken ? <EditDeletePost post={post} /> : ""}
      </div>
    </div>
  );
};

export default PostById;