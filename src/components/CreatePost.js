import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import APIURL from '../helpers/environment'

const CreatePost = (props) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('FurBaby');
    const [isPrivate, setIsPrivate] = useState(false);
    const navigate = useNavigate();
    let params = useParams();

    const isChecked = (e) => {
        const checked = e.target.checked;
        checked ? setIsPrivate(true) : setIsPrivate(false);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(e.target.value);
        previewImage(file);
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        }
    }

    const handlePost = (e) => {
        e.preventDefault();
        if (!previewSrc) {
            console.log("Please choose an image");
        } else {
            uploadImage(previewSrc);
        }
    }

    const uploadImage = async (encodedImage) => {
        let responseCode;
        const formData = new FormData();
        formData.append('file', encodedImage);
        formData.append("upload_preset", "instapet");

        const res = await fetch(`https://api.cloudinary.com/v1_1/gabrielleford/image/upload`, {
            method: "POST",
            body: formData
        })
        const json = await res.json();

        await fetch(`${APIURL}/post/create`, {
            method: 'POST',
            body: JSON.stringify({
                post: {
                    private: isPrivate,
                    title: title,
                    image: json.url,
                    description: description,
                    tag: tag
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.sessionToken}`
            })
        })
            .then((res) => {
                responseCode = res.status;
                return res.json();
            })
            .then((json) => {
                // console.log(json);
                params.id = json.post.post_id;
                if (responseCode == '201') navigate(`/post/${params.id}`);
            })
    }

    return (
        <div class='row justify-content-center align-items-start'>
            <div class='col-sm-10 col-lg-5 with-bg'>
                <h1>create post</h1>
                <form onSubmit={handlePost}>
                    <label id='b' htmlFor="imageCreate" className="file-upload btn-pb">choose image</label>
                    <input type='file' id='imageCreate' name='imageCreate' onChange={handleImage} value={image} />
                    {previewSrc && (
                        <img src={previewSrc} class='shadow preview' alt='Preview of chosen file' style={{ height: '300px' }} />
                    )}
                    <input class='reg-input input' placeholder='title' onChange={e => setTitle(e.target.value)} value={title} />
                    <textarea class='input' placeholder='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <select type='select' onChange={e => setTag(e.target.value)} name='tag' class='input' required>
                        <option value='FurBaby'>Fur Baby</option>
                        <option value='ScaleBaby'>Scale Baby</option>
                        <option value='ExoticBaby'>Exotic Baby</option>
                    </select>
                    <div class='checkbox-container'>
                        <input id='input-checkbox' value={isChecked} type='checkbox' name='private' onChange={e => isChecked(e)} />
                        <label class='label-checkbox' for='private'>private</label><br />
                    </div>
                    <button type='submit' id='createPost' className='d-block btn btn-pb mx-auto'>Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;