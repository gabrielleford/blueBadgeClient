import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate, useParams } from 'react-router';

const CreatePost = (props) => {
    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState('');
    const [ previewSrc, setPreviewSrc ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ tag, setTag ] = useState('');
    const [ isPrivate, setIsPrivate ] = useState(false);
    const navigate = useNavigate();
    let params = useParams();
    let { id } = params;

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
        if(!previewSrc) {
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
        
        await fetch('http://localhost:3000/post/create', {
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
            console.log(responseCode);
            return res.json();
        })
        .then((json) => {
            console.log(json);
            params.id = json.post.id;
            console.log(params.id);
            if (responseCode == '201') navigate(`/post/${params.id}`, { state: params.id });
        })
    }

    return (
        <div id='newPost'>
            <h5>New Post</h5>
            <p>Create new post</p>
            <Form onSubmit={handlePost}>
                <FormGroup>
                    <Label htmlFor='title' />
                    <Input name='title' onChange={e => setTitle(e.target.value)} value={title} placeholder='Title' required />
                </FormGroup>

                <FormGroup>
                <Input type='file' name='image' onChange={handleImage} value={image} />
                </FormGroup>

                {previewSrc && (
                    <img src={previewSrc} alt='Preview of chosen file' style={{height: '300px'}} />
                )}

                <FormGroup>
                    <Label htmlFor='description' />
                    <Input type='text' name='description' onChange={e => setDescription(e.target.value)} value={description} placeholder='Description' required />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='tag'>Tag</Label>
                    <Input type='select' name='tag' onChange={e => setTag(e.target.value)} value={tag} required>
                        <option value='Fur Baby'>Fur Baby</option>
                        <option value='Scale Baby'>Scale Baby</option>
                        <option value='Exotic Baby'>Exotic Baby</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='private'>Private</Label>
                    <Input type='checkbox' name='private' onChange={e => isChecked(e)} value={isPrivate} />
                </FormGroup>
                <Button type='submit'>Post</Button>
            </Form>
        </div>
    );
};

export default CreatePost;