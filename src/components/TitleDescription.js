import { Button } from "reactstrap";

const deletePost = () => {
  console.log("post deleted");
};

const TitleDescription = (props) => {
    return (
      <div>
        <h3>Post</h3>
        <p>{props.postTitle}</p>
        <p>{props.postDescrip}</p>
        <Button onClick={props.editActive}>{props.edit}</Button>
        <Button onClick={deletePost}>Delete</Button>
      </div>
    );
};

export default TitleDescription;