import { useEffect } from "react"

const MyProfileDisplay = (props) => {
    useEffect(() => {

    }, [props.editing, props.profilePicture, props.profileDescription])

    return (
        <>
            <div className='col-xs-1 col-lg-2'>
                {props.profilePicture ? <img className='profile-picture shadow' src={props.profilePicture} /> : <img className='profile-picture shadow' src='https://via.placeholder.com/150' />}
            </div>
            <div className='col-xs-10 col-lg-5'>
                <p className='username'>{props.username}</p>
                <p className='user-description shadow'>{props.profileDescription}</p>
                <button onClick={() => props.setEditing(true)} className="shadow btn-pb pinkPurple" id="edit-profile">edit</button>
            </div>
        </>
    )

}

export default MyProfileDisplay