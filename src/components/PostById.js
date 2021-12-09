import { useEffect, useState } from "react";
import APIURL from "../helpers/environment";
import EditDeletePost from "./EditDeletePost";
import TitleDescription from "./TitleDescription";
import APIURL from '../helpers/environment'

const PostById = (props) => {
  let pathName = window.location.pathname;
  let id = pathName.slice(6, 42);
  const [post, setPost] = useState({});
  const [tag, setTag] = useState('');
  const [edit, setEdit] = useState("Edit");
  const [owner, setOwner] = useState('')

  const editActive = () => {
    setEdit("Save");
  }

  const componentRender = () => {
    fetch(`${APIURL}/user/usernameFromId/${post.owner_id}`)
      .then((response) => response.json())
      .then((json) => typeof json[0] !== 'undefined' ? setOwner(json[0].username) : '')
    if (edit === "Edit") {
      return (
        <div>
          <TitleDescription
            postTitle={post.title}
            postDescrip={post.description}
            editActive={editActive}
            userID={props.userID}
            ownerID={post.owner_id}
            edit={edit}
            id={id}
            owner={owner}
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
            owner={owner}
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
      fetchURL = `${APIURL}/post/getOne/${id}`;
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
    if (typeof post == 'object' && Object.keys(post).length === 0) {
      fetchPostById();
    }
  }, [props.sessionToken, props.userID, owner]);

  return (
    <>
      <div className='row justify-content-center align-items-start'>
        <div className='col-sm-10 col-lg-5'>
          {post ? <img className='shadow post-display-image' src={post.image} alt={post.title} /> : ""}
          <div className='d-flex justify-content-center'>
            <p className='post-tags'><a className='tag'>{post ? tag + ' Baby' : ""}</a></p>
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