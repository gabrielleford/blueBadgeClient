import CLIENTURL from '../helpers/environment'
import LikeButton from "./LikeButton";

const TitleDescription = (props) => {

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

  return (
    <>
      <div className='d-flex justify-content-between'>
        {props.username ? <a id='owner' href={`gfks-instapet-client.herokuapp.com/user/${props.username}`}>{props.username}</a> : ''}
        <div className='likeContainer ms-auto'>{props.postLikes}</div>
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