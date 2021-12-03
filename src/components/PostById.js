import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import EditDeletePost from "./EditDeletePost";
import TitleDescription from "./TitleDescription";

const PostById = (props) => {
  let pathName = window.location.pathname;
  let id = pathName.slice(6, 42);
  const [post, setPost] = useState({});
  const [tag, setTag] = useState('');
  const [edit, setEdit] = useState("Edit");
  
  const editActive = () => {
    setEdit("Save");
  }

  const componentRender = () => {
      if (edit === "Edit") {
        return(
            <div>
                <TitleDescription postTitle={post.title} postDescrip={post.description} editActive={editActive} edit={edit}/>
            </div>
        )
      } else if (edit === "Save") {
          return(
            <div>
                <EditDeletePost postTitle={post.title} postDescrip={post.description} isPrivate={post.private} id={id} sessionToken={props.sessionToken} fetchPostById={fetchPostById} setEdit={setEdit} edit={edit} />
            </div>
          )
      }
  }

  const fetchPostById = async () => {
    let fetchURL;
    if (props.sessionToken) {
      fetchURL = `http://localhost:3000/post/validated/${id}`;
      if (props.sessionToken !== '') {
          await fetch(fetchURL, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.sessionToken}`,
            }),
          })
            .then((res) => res.json())
            .then((json) => {
              setPost(json[0]);
              if (json.tag === "FurBaby") {
                setTag(json[0].tag.slice(0, 3) + " Baby");
              } else if (json[0].tag === "ScaleBaby") {
                setTag(json[0].tag.slice(0, 5) + " Baby");
              } else if (json[0].tag === "ExoticBaby") {
                setTag(json[0].tag.slice(0, 6) + " Baby");
              } else {
                  setTag("");
              }
            })
            .catch((error) => console.log(error));
      }
    } else {
      fetchURL = `http://localhost:3000/post/${id}`;
        await fetch(fetchURL, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setPost(json[0]);
            console.log(json[0].tag);
            if (json[0].tag === "FurBaby") {
              setTag(json.tag[0].slice(0, 3));
            } else if (json[0].tag === "ScaleBaby") {
              setTag(json.tag[0].slice(0, 5));
            } else if (json.tag[0] === "ExoticBaby") {
              setTag(json.tag[0].slice(0, 6));
            } else {
                setTag("");
            }
          })
          .catch((error) => console.log(error));
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
        {post ? componentRender() : ""}
        {post ? <p>{tag}</p> : ""}
      </div>
    </div>
  );
};

export default PostById;
//postTitle={post.title} postDescrip={post.description}