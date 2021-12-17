import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import APIURL from '../helpers/environment'
import formValidation from './formValidation';

const CreatePost = (props) => {
    const {isChecked, handleChange, handleImage, handlePost, furBaby, scaleBaby, exoticBaby, values, image, previewSrc, errors} = useCreateForm(props, formValidation);

    return (
        <div className='row justify-content-center align-items-start'>
            <div className='col-sm-10 col-lg-5 with-bg'>
                <h1>create post</h1>
                <form onSubmit={handlePost}>
                    <label id='b' htmlFor="image" className="file-upload btn-pb">choose image</label>
                    <input type='file' id='image' name='imageCreate' onChange={handleImage} value={image} />
                    {previewSrc && (
                        <img src={previewSrc} className='shadow preview' alt='Preview of chosen file' style={{ height: '300px' }} />
                    )}
                    {errors.image && <p className='error'>{errors.image}</p>}
                    <input className='reg-input input' placeholder='title' name='title' onChange={handleChange} value={values.title} />
                    {errors.title && <p className='error'>{errors.title}</p>}
                    <textarea className='input' placeholder='description' name='description' value={values.description} onChange={handleChange}></textarea>
                    {errors.description && <p className='error'>{errors.description}</p>}
                    <ul className="nav nav-pills justify-content-center">
                        <li className="nav-item">
                              <a id='furBaby' className="nav-link active" onClick={furBaby}>🐶 fur baby</a>
                        </li>
                        <li class="nav-item">
                              <a id='exoticBaby' className="nav-link" onClick={exoticBaby}>🐯 exotic baby</a>
                        </li>
                        <li class="nav-item">
                              <a id='scaleBaby' className="nav-link" onClick={scaleBaby}>🐠 scale baby</a>
                        </li>
                    </ul>
                    <div className='checkbox-container'>
                        <input id='input-checkbox' value={isChecked} type='checkbox' name='private' onChange={isChecked} />
                        <label className='label-checkbox' htmlFor='private'>private</label><br />
                    </div>
                    <button type='submit' id='createPost' className='d-block btn btn-pb mx-auto'>Post</button>
                </form>
            </div>
        </div>
    );
};

const useCreateForm = (props, formValidation) => {
    const [values, setValues] = useState({
        image: '',
        title: '',
        description: '',
    })

    const navigate = useNavigate();
    let params = useParams();
    const [errors, setErrors] = useState({});
    const [previewSrc, setPreviewSrc] = useState("");
    const [image, setImage] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [tag, setTag] = useState("FurBaby");
    let what = 'create post';
    let responseCode;

    const isChecked = (e) => {
      const checked = e.target.checked;
      checked ? setIsPrivate(true) : setIsPrivate(false);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleImage = (e) => {
      setImage(e.target.value);
      const file = e.target.files[0];
      values.image = file.name;
      previewImage(file);
    };

    const previewImage = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
    };

    const handlePost = e => {
      e.preventDefault();
      createPost(previewSrc);
    }

    const furBaby = () => {
      setTag("FurBaby");
      tagClicked("furBaby");
    };

    const scaleBaby = () => {
      setTag("ScaleBaby");
      tagClicked("scaleBaby");
    };

    const exoticBaby = () => {
      setTag("ExoticBaby");
      tagClicked("exoticBaby");
    };

    const tagClicked = (tag) => {
      let tags = {
        furBaby: document.getElementById("furBaby"),
        scaleBaby: document.getElementById("scaleBaby"),
        exoticBaby: document.getElementById("exoticBaby"),
      };

      Object.keys(tags).map((key, index) => {
        tags[key].classList.remove("active");
      });

      tags[tag].classList.add("active");
    };
    

    const createPost = async (encodedImage) => {
      const formData = new FormData();
      formData.append("file", encodedImage);
      formData.append("upload_preset", "instapet");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/gabrielleford/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await res.json();

      await fetch(`${APIURL}/post/create`, {
        method: "POST",
        body: JSON.stringify({
          post: {
            private: isPrivate,
            title: values.title.trim(),
            image: json.url,
            description: values.description.trim(),
            tag: tag,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.sessionToken}`,
        }),
      })
        .then((res) => {
          console.log(res);
          responseCode = res.status;
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setErrors(formValidation(values, responseCode, what));
          getValues();
          if (responseCode == "201") {
            params.id = json.post.post_id;
            navigate(`/post/${params.id}`);
          }
        });
    };

    const getValues = () => {
      console.log(`VALUES: ${values.image}`);
    }

    return {isChecked, handleChange, handleImage, handlePost, furBaby, scaleBaby, exoticBaby, values, image, previewSrc, errors}
}

export default CreatePost;