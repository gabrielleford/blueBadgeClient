const MyProfileEdit = (props) => {
    return (
        <>
            <div className='col-xs-1 col-lg-2'>
                {props.previewSrc ?
                    <img className='profile-picture shadow' src={props.previewSrc} alt='Preview of chosen file' /> :
                    <img className='profile-picture shadow' src={props.profilePicture} alt='Current profile picture' />
                }
                <label htmlFor="image" className="file-upload btn-pb">choose image</label>
                <input id='image' type='file' name='image' onChange={props.handleImage} />
            </div>
            <div className='col-xs-10 col-lg-5'>
                <p className='username'>{props.username}</p>
                <p className='user-description shadow'>

                    <textarea value={props.newProfileDescription} onChange={e => props.setNewProfileDescription(e.target.value)} id='user-description-edit'></textarea>
                </p>
                <button id='save-profile' className="shadow btn-pb pinkPurple" onClick={(event) => props.handleEdit(event)}>save</button>
            </div>
        </>
    )

}

export default MyProfileEdit