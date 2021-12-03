import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

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
        console.log(res);
        res.json();
        responseCode = res.status;
        if (responseCode === 200) {
          props.setEdit("Edit");
          props.fetchPostById();
        }
      })
      .catch((err) => console.log(err))
  }

  const deletePost = () => {
    console.log("post deleted");
  };

  return(
      <div id='editPost'>
          <Form onSubmit={updatePost}>
            <FormGroup>
                  <Label htmlFor='title' />
                  <Input name='title' onChange={e => setTitle(e.target.value)} value={title} required />
              </FormGroup>

              <FormGroup>
                  <Label htmlFor='description' />
                  <Input type='text' name='description' onChange={e => setDescription(e.target.value)} value={description} required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor='private'>Private</Label>
                <Input type='checkbox' name='private' onChange={e => isChecked(e)} defaultChecked={isPrivate} />
              </FormGroup>

              <Button type='submit'>{props.edit}</Button>
              <Button onClick={deletePost}>Delete</Button>
          </Form>
      </div>
  )
};

export default EditDeletePost;

// like button