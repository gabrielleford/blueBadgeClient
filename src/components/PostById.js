import { useEffect, useState } from "react";
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
      return (
        <div>
          <TitleDescription fetchUrl={props.fetchUrl} postTitle={post.title} userID={props.userID} ownerId={post.owner_id} id={id} postDescrip={post.description} editActive={editActive} edit={edit} sessionToken={props.sessionToken} />
        </div>
      )
    } else if (edit === "Save") {
      return (
        <div>
          <EditDeletePost fetchUrl={props.fetchUrl} fetchPostById={fetchPostById} setEdit={setEdit} postTitle={post.title} postDescrip={post.description} isPrivate={post.private} id={id} sessionToken={props.sessionToken} edit={edit} />
        </div>
      )
    }
  }

  const fetchPostById = async () => {
    let fetchURL;
    if (props.sessionToken) {
      fetchURL = `${props.fetchUrl}/post/validated/${id}`;
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
            setTag(json.tag.slice(0, json.tag.search('Baby')))
          })
          .catch((error) => console.log(error));
      }
    } else {
      fetchURL = `${props.fetchUrl}/post/${id}`;
      await fetch(fetchURL, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setPost(json[0]);
          setTag(json[0].tag.slice(0, json[0].tag.search('Baby')))
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
        {post ? <p>{tag} Baby</p> : ""}
      </div>
    </div>
  );
};

export default PostById;