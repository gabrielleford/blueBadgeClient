import { useNavigate } from "react-router";
import APIURL from '../helpers/environment'
import CLIENTURL from '../helpers/environment'
import LikeButton from "./LikeButton";

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

  console.log(CLIENTURL)

  return (
    <>
      <div className='d-flex justify-content-between'>
        {props.owner ? <a id='owner' href={`user/${props.owner}`}>{props.owner}</a> : ''}
        <LikeButton post_id={props.post_id}
          userLikedPosts={props.userLikedPosts}
          sessionToken={props.sessionToken}
          fetchData={props.fetchData} />
      </div>
      <h2>{props.postTitle}</h2>
      <p>{props.postDescrip}</p>
      {buttonRender()}
    </>
  );
};

export default TitleDescription;