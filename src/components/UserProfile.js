import { useState, useEffect } from 'react'
import APIURL from '../helpers/environment';
import PostDisplay from "./PostDisplay";

const MyProfile = (props) => {
    const [profileDescription, setProfileDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [getWhat, setGetWhat] = useState({ what: 'user', tag: null });

    let pathName = window.location.pathname;
    let username = pathName.slice(6);

    const fetchUserInfo = async () => {
        await fetch(`${APIURL}/user/${username}`, {
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
        if (username !== '') fetchUserInfo();

    }, [username, profileDescription, profilePicture])

    return (
        <div id='userProfile'>
            <h5>User Profile</h5>
            <p>Profile Description: {profileDescription}</p>
            <img className='smol' src={profilePicture} alt='Current profile picture' />
            <PostDisplay
                getWhat={getWhat}
                username={username}
                sessionToken={props.sessionToken}
                userLikedPosts={props.userLikedPosts}
            />
        </div>
    )
}

export default MyProfile;