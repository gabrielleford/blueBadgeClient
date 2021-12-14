import { useNavigate } from 'react-router';

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

  const navigateToUser = () => {
    navigate(`/user/${props.username}`);
  }

  // console.log(CLIENTURL)

  return (
    <>
      {props.username ? <button id="owner" onClick={navigateToUser}>{props.username}</button> : ''}
      <h2>{props.postTitle}</h2>
      <p>{props.postDescrip}</p>
      {buttonRender()}
    </>
  );
};

export default TitleDescription;