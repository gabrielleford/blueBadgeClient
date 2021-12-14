import { useNavigate } from 'react-router';
import LikeButton from "./LikeButton";

const TitleDescription = (props) => {
  const navigate = useNavigate();

  const buttonRender = () => {
    if (props.sessionToken && props.userID === props.ownerID) {
      return (
        <div className='post-controls'>
          <button className="edit" onClick={props.editActive}>{props.edit}</button>
          <button className="delete" onClick={props.deletePost} href="#">delete</button>
        </div>

      );
    }
  }

  // console.log(CLIENTURL)

  return (
    <>
      <div className='d-flex justify-content-between'>
        {props.username ? <button id="owner" onClick={props.navigateToUser}>{props.username}</button> : ''}
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