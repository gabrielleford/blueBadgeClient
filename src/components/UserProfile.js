import { useState, useEffect } from 'react'
import APIURL from '../helpers/environment';
import PostDisplay from "./PostDisplay";

const MyProfile = (props) => {
    const [profileDescription, setProfileDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [getWhat] = useState({ what: 'user', tag: null });

    let pathName = window.location.pathname;
    let thisUsername = pathName.slice(6);

    const fetchUserInfo = async () => {
        await fetch(`${APIURL}/user/${thisUsername}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data)
                setProfileDescription(data[0].profileDescription)
                setProfilePicture(data[0].profilePicture)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        if (thisUsername !== '') fetchUserInfo();

    }, [thisUsername, profileDescription, profilePicture, props.sessionToken])

    return (
        <>
            <div className='row justify-content-center mb-5'>
                <div className='col-xs-1 col-lg-2'>
                    {profilePicture ? <img className='profile-picture shadow' src={profilePicture} /> : <img className='profile-picture shadow' src='https://via.placeholder.com/150' />}
                </div>
                <div className='col-xs-10 col-lg-5'>
                    <p className='username'>{thisUsername}</p>
                    <p className='user-description shadow'>{profileDescription}</p>
                </div>
            </div>
            <PostDisplay
                getWhat={getWhat}
                username={props.username}
                sessionToken={props.sessionToken}
                userLikedPosts={props.userLikedPosts}
                fetchData={props.fetchData}
            />
        </>
    )
}

export default MyProfile;