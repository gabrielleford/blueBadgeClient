import CLIENTURL from '../helpers/environment'

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

  // console.log(CLIENTURL)

  return (
    <>
      {props.username ? <a id='owner' href={`gfks-instapet-client.herokuapp.com/user/${props.username}`}>{props.username}</a> : ''}
      <h2>{props.postTitle}</h2>
      <p>{props.postDescrip}</p>
      {buttonRender()}
    </>
  );
};

export default TitleDescription;