import LikeButton from "./LikeButton";
const Post = (props) => {

    return (
        <div key={props.index} className="post col-xs-10 offset-xs-1 col-sm-10 col-md-5 col-xl-2">
            <a href={'/post/' + props.post_id}>
                <img src={props.image} className='post-pic' />
            </a>
            <div className='d-flex post-info justify-content-between'>
                <p className='post-title'>{props.title.length < 20 ? props.title : props.title.substring(0, 20) + '...'}</p>
                {props.isLoggedIn ? <LikeButton
                    post_id={props.post_id}
                    userLikedPosts={props.userLikedPosts}
                    sessionToken={props.sessionToken}
                    fetchData={props.fetchData}
                /> : ''}
            </div>
        </div>
    )

}

export default Post;