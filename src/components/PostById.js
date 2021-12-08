import { useEffect, useState } from "react";
import APIURL from "../helpers/environment";
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
          <TitleDescription 
            postTitle={post.title} 
            userID={props.userID} 
            ownerId={post.owner_id} 
            id={id} 
            postDescrip={post.description} 
            editActive={editActive} 
            edit={edit} 
            sessionToken={props.sessionToken} />
        </div>
      )
    } else if (edit === "Save") {
      return (
        <div> 
          <EditDeletePost 
            fetchPostById={fetchPostById} 
            setEdit={setEdit} 
            postTitle={post.title} 
            postDescrip={post.description} 
            isPrivate={post.private} 
            id={id} 
            sessionToken={props.sessionToken} 
            edit={edit} />
        </div>
      )
    }
  }

  const fetchPostById = async () => {
    let fetchURL;
    if (props.sessionToken) {
      fetchURL = `${APIURL}/post/validated/${id}`;
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
            setTag(json[0].tag.slice(0, json[0].tag.search('Baby')))
          })
          .catch((error) => console.log(error));
      }
    } else {
      fetchURL = `${APIURL}/post/${id}`;
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
    <>
      <div className='row justify-content-center align-items-start'>
        <div className='col-sm-10 col-lg-5'>
          {post ? <img className='shadow post-display-image' src={post.image} alt={post.title} /> : ""}
          <div className='d-flex justify-content-center'>
            <p className='post-tags me-auto'><a className='tag'>{post ? tag + ' Baby' : ""}</a></p>
          </div>
        </div>
        <div className='col-sm-10 col-lg-3 with-bg'>
          {post ? componentRender() : ""}
        </div>
      </div>
    </>

  );
};

export default PostById;