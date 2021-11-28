import { useState, useEffect } from 'react'

const MyProfile = (props) => {
    const [profileDescription, setProfileDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [newProfileDescription, setNewProfileDescription] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(false);
    const [feedback, setFeedBack] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');
    const [feedbackStatus, setFeedBackStatus] = useState('');

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
            try {
                await fetch(`https://api.cloudinary.com/v1_1/gabrielleford/image/upload`, {
                    method: "POST",
                    body: formData
                })
                    .then(result => { result.json() })
                    .then(json => imageURL = json.url)

                console.log(`Image URL: ${imageURL}`);
            } catch (error) {
                console.log(error)
            }
        }
        else imageURL = profilePicture;

        try {
            await fetch('http://localhost:3000/user/edit', {
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
            }).then((response) => {
                setFeedBackStatus(`s${response.status}`)
                return response.json();
            })
                .then((data) => setFeedBack(data.message))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3000/user/${props.userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setProfileDescription(data[0].profileDescription)
                setProfilePicture(data[0].profilePicture)
                setNewProfileDescription(data[0].profileDescription)
            })

    }, [props.userID, profileDescription, profilePicture])

    return (
        <div id='myProfile'>
            <h5>My Profile</h5>
            {feedback ? <div className={feedbackStatus}>{feedback}</div> : ''}
            <p>Profile Description: {profileDescription}</p>
            <p>Edit description:</p>
            <form onSubmit={handleEdit}>
                <input defaultValue={profileDescription} onChange={e => setNewProfileDescription(e.target.value)}></input>
                <p>Profile Picture: <img className='smol' src={profilePicture} alt='if there is a picture url it will display here' /></p>
                <p>New profile image:</p>
                <input type='file' name='image' onChange={handleImage} />
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default MyProfile;