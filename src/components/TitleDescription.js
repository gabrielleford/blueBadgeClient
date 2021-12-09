import { useEffect } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router";
import APIURL from "../helpers/environment";

const TitleDescription = (props) => {
  const navigate = useNavigate();

  const buttonRender = () => {
    if (props.sessionToken && props.userID === props.ownerID) {
      return (
        <div className='post-controls'>
          <button className="edit" onClick={props.editActive}>{props.edit}</button>
          <button className="delete" onClick={deletePost} href="#">delete</button>
        </div>

      );
    }
  }

 const deletePost = async () => {
    await fetch(`${APIURL}/post/delete/${props.id}`, {
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