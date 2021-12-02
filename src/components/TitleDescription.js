const TitleDescription = (props) => {
    return (
      <div>
          <h3>Post</h3>
          <p>{props.postTitle}</p>
          <p>{props.postDescrip}</p>
      </div>
    );
};

export default TitleDescription;