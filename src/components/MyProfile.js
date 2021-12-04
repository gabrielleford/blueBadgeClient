import { useState, useEffect } from 'react'
import PostDisplay from "./PostDisplay";

const MyProfile = (props) => {
    const [profileDescription, setProfileDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [newProfileDescription, setNewProfileDescription] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(false);
    const [feedback, setFeedBack] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');
    const [feedbackStatus, setFeedBackStatus] = useState('');
    const [getWhat, setGetWhat] = useState({ what: 'user', tag: null });

    const fetchUserInfo = async () => {
        await fetch(`${props.fetchUrl}/user/${props.userID}`, {
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
                setNewProfileDescription(data[0].profileDescription)
            })
    }

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        }
    }

    const handleImage = (event) => {
        const file = event.target.files[0];
        previewImage(file);
        setNewProfilePicture(true);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        editProfile(previewSrc);
    }

    const editProfile = async (encodedImage) => {
        let imageURL;
        if (newProfilePicture) {
            const formData = new FormData();
            formData.append('file', encodedImage);
            formData.append("upload_preset", "instapet");
            await fetch(`https://api.cloudinary.com/v1_1/gabrielleford/image/upload`, {
                method: "POST",
                body: formData
            })
                .then(result => result.json())
                .then(result => imageURL = result.url)
                .catch((error) => console.log(error))
        }
        else imageURL = profilePicture;

        await fetch(`${props.fetchUrl}/user/edit`, {
            method: 'PUT',
            body: JSON.stringify({
                user: {
                    description: newProfileDescription,
                    imageURL: imageURL
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.sessionToken}`
            })
        })
            .then((response) => {
                setFeedBackStatus(`s${response.status}`)
                return response.json();
            })
            .then((data) => setFeedBack(data.message))
            .then(fetchUserInfo())
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        if (props.userID !== '') fetchUserInfo();

    }, [props.userID, profileDescription, profilePicture])

    return (
        <div id='myProfile'>
            <h5>My Profile</h5>
            {feedback ? <div className={feedbackStatus}>{feedback}</div> : ''}
            <p>Profile Description: {profileDescription}</p>
            <p>Edit description:</p>
            <form onSubmit={handleEdit}>
                <input defaultValue={profileDescription} onChange={e => setNewProfileDescription(e.target.value)}></input>
                {previewSrc ?
                    <img className='smol' src={previewSrc} alt='Preview of chosen file' /> :
                    <img className='smol' src={profilePicture} alt='Current profile picture' />
                }
                <p>New profile image:</p>
                <input type='file' name='image' onChange={handleImage} />
                <button type='submit'>Save</button>
            </form>
            <PostDisplay
                fetchUrl={props.fetchUrl}
                getWhat={getWhat}
                username={props.username}
                sessionToken={props.sessionToken}
                userLikedPosts={props.userLikedPosts}
            />
        </div>
    )
}

export default MyProfile;