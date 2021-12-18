import { useState } from "react";
import APIURL from '../helpers/environment'
import LikeButton from "./LikeButton";
import formValidation from "./formValidation";

const EditDeletePost = (props) => {
  const {isChecked, handleChange, updatePost, values, isPrivate, errors} = useForm(props, formValidation);
  return (
    <div id='editPost'>
      <div className='d-flex justify-content-between'>
        {props.username ? <button id="owner" onClick={props.navigateToUser}>{props.username}</button> : ''}
        <div className='likeContainer ms-auto'>{props.postLikes}</div>
        <LikeButton post_id={props.post_id}
          userLikedPosts={props.userLikedPosts}
          sessionToken={props.sessionToken}
          fetchData={props.fetchData} />
      </div>

      <form onSubmit={updatePost}>
        <input className='h2-input' name='title' onChange={handleChange} value={values.title} required />
        {errors.title && <p className="error">{errors.title}</p>}
        <textarea name='description' className='p-input' onChange={handleChange} value={values.description} required></textarea>
        {errors.description && <p className="error">{errors.description}</p>}
        <input id='input-checkbox' type='checkbox' name='private' onChange={e => isChecked(e)} defaultChecked={isPrivate} />
        <label className='label-checkbox' htmlFor='private'>private</label><br />
        <button className="edit" type='submit'>{props.edit}</button>
        <button className="delete" onClick={props.deletePost}>Delete</button>
      </form>
    </div>
  )
};

const useForm = (props, formValidation) => {
  const [title, setTitle] = useState(props.postTitle);
  const [description, setDescription] = useState(props.postDescrip);
  const [isPrivate, setIsPrivate] = useState(props.isPrivate);
  const [values, setValues] = useState({
    title: title,
    description: description,
  });
  const [errors, setErrors] = useState({})
  let what = 'edit post';
  let responseCode;
  
  const isChecked = (e) => {
    const checked = e.target.checked;
    checked ? setIsPrivate(true) : setIsPrivate(false);
  };
  
  const handleChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    });
    setTitle(values.title)
    setDescription(values.description)
  }

  const updatePost = async (e) => {
    e.preventDefault();
    await fetch(`${APIURL}/post/edit/${props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        post: {
          private: isPrivate,
          title: values.title,
          description: values.description,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.sessionToken}`,
      }),
    })
      .then((res) => {
        res.json();
        responseCode = res.status;
        setErrors(formValidation(values, responseCode, what));
        if (responseCode == "200") {
          props.setEdit("Edit");
          props.fetchPostById();
        }
      })
      .catch((err) => console.log(err));
  };

  return {isChecked, handleChange, updatePost, values, isPrivate, errors}
}

export default EditDeletePost;

// like button