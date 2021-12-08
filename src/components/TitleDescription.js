const deletePost = () => {
  console.log("post deleted");
};

const TitleDescription = (props) => {
  return (
    <>
      <h2>{props.postTitle}</h2>
      <p>{props.postDescrip}</p>
      <div className='post-controls'>
        <button className="edit" onClick={props.editActive}>{props.edit}</button>
        <button className="delete" onClick={deletePost} href="#">delete</button>
      </div>
    </>
  );
};

export default TitleDescription;