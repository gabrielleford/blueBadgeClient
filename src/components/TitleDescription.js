import { useEffect } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router";

const TitleDescription = (props) => {
  const navigate = useNavigate();

  const buttonRender = () => {
    if (props.sessionToken && props.userID === props.ownerId) {
      return (
        <div>
          <Button onClick={props.editActive}>{props.edit}</Button>
          <Button onClick={deletePost}>Delete</Button>
        </div>
      );
    }
  }

  const deletePost = async () => {
    console.log("post deleted");
    await fetch(`${props.fetchUrl}/post/delete/${props.id}`, {
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

  return (
    <div>
      <h3>Post</h3>
      <p>{props.postTitle}</p>
      <p>{props.postDescrip}</p>
      {buttonRender()}
    </div>
  );
};

export default TitleDescription;