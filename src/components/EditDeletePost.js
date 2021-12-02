import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const EditDeletePost = (props) => {
  const [title, setTitle] = useState(props.postTitle);
  const [description, setDescription] = useState(props.postDescrip);
  const [isPrivate, setIsPrivate] = useState(props.isPrivate);

  const isPrivatePost = () => {
    if (props.isPrivate) {
      return (
        <FormGroup>
          <Label htmlFor='private'>Private</Label>
          <Input type='checkbox' name='private' onChange={e => isChecked(e)} value={isPrivate} />
        </FormGroup>
      )
    } else if (!props.isPrivate) {
      return(
        <FormGroup>
          <Label htmlFor='private'>Private</Label>
          <Input type='checkbox' name='private' onChange={e => isChecked(e)} value={isPrivate} />
        </FormGroup>
      )
    }
  }

  const isChecked = (e) => {
    const checked = e.target.checked;
    checked ? setIsPrivate(true) : setIsPrivate(false);
  };

  const updatePost = async () => {
    console.log('Submitted');
    await fetch(`http://localhost:3000/post/edit/${props.id}`)
    .then(res => res.json())
    .then(json => console.log(json))
  }

  return(
      <div id='editPost'>
          <Form id='updatePost' onSubmit={updatePost}>
            <FormGroup>
                  <Label htmlFor='title' />
                  <Input name='title' onChange={e => setTitle(e.target.value)} value={title} required />
              </FormGroup>

              <FormGroup>
                  <Label htmlFor='description' />
                  <Input type='text' name='description' onChange={e => setDescription(e.target.value)} value={description} required />
              </FormGroup>

              {isPrivatePost()}
          </Form>
      </div>
  )
};

export default EditDeletePost;

// like button