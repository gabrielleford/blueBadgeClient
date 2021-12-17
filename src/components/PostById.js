import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIURL from "../helpers/environment";
import EditDeletePost from "./EditDeletePost";
import TitleDescription from "./TitleDescription";

const PostById = (props) => {
  let pathName = window.location.pathname;
  let id = pathName.slice(6, 42);
  const [post, setPost] = useState({});
  const [tag, setTag] = useState('');
  const [edit, setEdit] = useState("Edit");
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);

  const editActive = () => {
    setEdit("Save");
  }

  const componentRender = () => {
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
            post_id={post.post_id}
            userLikedPosts={props.userLikedPosts}
            sessionToken={props.sessionToken}
            fetchData={props.fetchData}
            username={post.username}
            deletePost={deletePost}
            postLikes={likes}
            navigateToUser={navigateToUser} />
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
            edit={edit}
            post_id={post.post_id}
            userLikedPosts={props.userLikedPosts}
            fetchData={props.fetchData}
            username={post.username}
            edit={edit}
            deletePost={deletePost}
            postLikes={likes}
            navigateToUser={navigateToUser} />
        </div>
      );
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
            setLikes(json[0].likes)
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
          setLikes(json[0].likes)
        })
        .catch((error) => console.log(error));
    }
  };

  const deletePost = async () => {
    await fetch(`${APIURL}/post/delete/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.sessionToken}`,
      }),
    }).then((res) => {
      console.log(res);
      let responseCode = res.status;
      if (responseCode == "200") {
        navigate(`/myProfile`);
      }
    }).catch(err => console.log(err))
  };

  const navigateToUser = () => {
    navigate(`/user/${post.username}`);
  };

  useEffect(() => {
    //if (typeof post == 'object' && Object.keys(post).length === 0) {
    fetchPostById();
    //}
  }, [props.sessionToken, props.userID, props.userLikedPosts, likes]);

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