import { useState, useEffect } from 'react'
import PostDisplay from "./PostDisplay";
import MyProfileEdit from './MyProfileEdit'
import MyProfileDisplay from './MyProfileDisplay'
import APIURL from '../helpers/environment';

const MyProfile = (props) => {
    const [profileDescription, setProfileDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [newProfileDescription, setNewProfileDescription] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(false);
    const [feedback, setFeedBack] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');
    const [feedbackStatus, setFeedBackStatus] = useState('');
    const [getWhat, setGetWhat] = useState({ what: 'user', tag: null });
    const [editing, setEditing] = useState(false);

    const fetchUserInfo = async () => {
        await fetch(`${APIURL}/user/${props.userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
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
        setEditing(false)
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

        await fetch(`${APIURL}/user/edit`, {
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
        if (props.username !== '') fetchUserInfo();

    }, [props.username, profileDescription, profilePicture, editing, newProfilePicture])

    return (
        <>
            <div className='row justify-content-center mb-5'>
                {editing ? <MyProfileEdit
                    setEditing={setEditing}
                    handleImage={handleImage}
                    previewSrc={previewSrc}
                    username={props.username}
                    profilePicture={profilePicture}
                    profileDescription={profileDescription}
                    handleEdit={handleEdit}
                    setNewProfileDescription={setNewProfileDescription}
                    newProfileDescription={newProfileDescription} /> :
                    <MyProfileDisplay
                        setEditing={setEditing}
                        username={props.username}
                        profilePicture={profilePicture}
                        profileDescription={profileDescription} />}
            </div>
            <PostDisplay
                getWhat={getWhat}
                username={props.username}
                sessionToken={props.sessionToken}
                userLikedPosts={props.userLikedPosts}
            />
        </>
    )
}

export default MyProfile;