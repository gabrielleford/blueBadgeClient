import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const EditDeletePost = (props) => {
  let pathName = window.location.pathname;
  console.log(pathName);
  const [title, setTitle] = useState(props.postTitle);
  const [description, setDescription] = useState(props.postDescrip);
  const [isPrivate, setIsPrivate] = useState(props.isPrivate);
  const navigate = useNavigate();

  const isChecked = (e) => {
    const checked = e.target.checked;
    if (!isPrivate) {
      checked ? setIsPrivate(true) : setIsPrivate(false);
    } else if (isPrivate) {
      setIsPrivate(false);
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();
    let responseCode;
    await fetch(`http://localhost:3000/post/edit/${props.id}`, {
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
        console.log(res)
        res.json()
        responseCode = res.status
        if (responseCode === 200) {
          props.setEdit('Edit');
          props.fetchPostById();
        }
      })
      .catch((err) => console.log(err))
  }

  const deletePost = () => {
    console.log("post deleted");
  };

  console.log(isPrivate)

  return (
    <div id='editPost'>
      <form onSubmit={updatePost}>
        <input className='h2-input' name='title' onChange={e => setTitle(e.target.value)} value={title} required />
        <textarea name='description' className='p-input' onChange={e => setDescription(e.target.value)} value={description} required></textarea>
        <input id='input-checkbox' type='checkbox' name='private' onChange={e => isChecked(e)} defaultChecked={isPrivate} />
        <label class='label-checkbox' for='private'>private</label><br />


        <button className="edit" type='submit'>{props.edit}</button>
        <button className="delete" onClick={deletePost}>Delete</button>
      </form>
    </div>
  )
};

export default EditDeletePost;

// like button