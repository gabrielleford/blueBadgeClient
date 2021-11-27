import { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

const CreatePost = (props) => {
    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ tag, setTag ] = useState('');
    const [ isPrivate, setIsPrivate ] = useState(false);

    const isChecked = (e) => {
        const checked = e.target.checked;
        checked ? setIsPrivate(true) : setIsPrivate(false);
    }

    console.log(isPrivate);

    return (
        <div id='newPost'>
            <h5>New Post</h5>
            <p>Create new post</p>
            <Form>
                <FormGroup>
                    <Label htmlFor='title' />
                    <Input name='title' onChange={e => setTitle(e.target.value)} value={title} placeholder='Title' required />
                </FormGroup>

                <FormGroup>
                <Input type='file' name='image' value={image} required />
                </FormGroup>

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
            </Form>
        </div>
    )
};

export default CreatePost;