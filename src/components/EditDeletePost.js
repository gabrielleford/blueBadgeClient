import { useState } from "react";
import APIURL from '../helpers/environment'
import LikeButton from "./LikeButton";


const EditDeletePost = (props) => {
  const [title, setTitle] = useState(props.postTitle);
  const [description, setDescription] = useState(props.postDescrip);
  const [isPrivate, setIsPrivate] = useState(props.isPrivate);

  const isChecked = (e) => {
    const checked = e.target.checked;
    checked ? setIsPrivate(true) : setIsPrivate(false);
  };

  const updatePost = async (e) => {
    let responseCode;
    e.preventDefault();
    await fetch(`${APIURL}/post/edit/${props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        post: {
          private: isPrivate,
          title: title,
          description: description,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.sessionToken}`,
      }),
    })
      .then((res) => {
        // console.log(res)
        res.json()
        responseCode = res.status
        if (responseCode == '200') {
          props.setEdit('Edit');
          props.fetchPostById();
        }
      })
      .catch((err) => console.log(err))
  }

  // console.log(isPrivate)

  return (
    <div id='editPost'>
      <div className='d-flex justify-content-between'>
        {props.username ? <button id="owner" onClick={props.navigateToUser}>{props.username}</button> : ''}
        <LikeButton post_id={props.post_id}
          userLikedPosts={props.userLikedPosts}
          sessionToken={props.sessionToken}
          fetchData={props.fetchData} />
      </div>
      
      <form onSubmit={updatePost}>
        <input className='h2-input' name='title' onChange={e => setTitle(e.target.value)} value={title} required />
        <textarea name='description' className='p-input' onChange={e => setDescription(e.target.value)} value={description} required></textarea>
        <input id='input-checkbox' type='checkbox' name='private' onChange={e => isChecked(e)} defaultChecked={isPrivate} />
        <label className='label-checkbox' for='private'>private</label><br />
        <button className="edit" type='submit'>{props.edit}</button>
        <button className="delete" onClick={props.deletePost}>Delete</button>
      </form>
    </div>
  )
};

export default EditDeletePost;

// like button