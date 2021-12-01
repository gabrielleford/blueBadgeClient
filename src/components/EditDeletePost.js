import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const EditDeletePost = (props) => {
    const [edit, setEdit] = useState("Edit");

    const editClicked = () => {
      setEdit("Save");
      if (edit === "Save") {
        setEdit("Edit");
      }
    };

    const deletePost = () => {
      console.log('post deleted');
    }

    return(
        <div id='editPost'>
            <h5>Edit Post</h5>
            <p>Form will show up after button click</p>
            <Button onClick={editClicked}>{edit}</Button>
            <Button onClick={deletePost}>Delete</Button>
        </div>
    )
};

export default EditDeletePost;