import { useState, useEffect } from 'react'

const MyProfile = (props) => {
    const [profileDescription, setProfileDescription] = useState('');
    const [profileURL, setProfileURL] = useState('');

    useEffect(() => {
        console.log(props.userID)

        fetch(`http://localhost:3000/user/${props.userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setProfileDescription(data[0].profileDescription)
                //setProfileDescription(data[0].profilePicture)
            })


    }, [profileDescription, profileURL, props.userID])

    return (
        <div id='myProfile'>
            <h5>My Profile</h5>
            <p>Profile Description: {profileDescription}</p>
            {/* <p>Profile Picture: {profileURL}</p> */}
        </div>
    )
}

export default MyProfile;