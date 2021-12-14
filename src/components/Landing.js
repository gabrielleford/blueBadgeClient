import { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";

const Landing = (props) => {
    const [getWhat, setGetWhat] = useState({ what: 'all', tag: null });

    const furBaby = () => {
        setGetWhat({ what: 'tag', tag: 'fur baby' });
        tagClicked('furBaby');
    };

    const scaleBaby = () => {
        setGetWhat({ what: 'tag', tag: 'scale baby' });
        tagClicked('scaleBaby');
    };

    const exoticBaby = () => {
        setGetWhat({ what: 'tag', tag: 'exotic baby' });
        tagClicked('exoticBaby');
    };

    const getAll = () => {
        setGetWhat({ what: 'all', tag: null });
        tagClicked('all');
    }
    const likes = () => {
        setGetWhat({ what: 'likes', tag: null });
        tagClicked('likes');
    }

    const tagClicked = (tag) => {
        let tags = {
            all: document.getElementById('all'),
            furBaby: document.getElementById('furBaby'),
            scaleBaby: document.getElementById('scaleBaby'),
            exoticBaby: document.getElementById('exoticBaby'),
            likes: document.getElementById('likes'),
        }

        Object.keys(tags).map((key, index) => {
            tags[key].classList.remove('active')
        })
        tags[tag].classList.add('active')
    }

    useEffect(() => {
        setGetWhat({ what: 'all', tag: null });
    }, []);

    return (
        <>
            <div className="row mb-3 justify-content-center">
                <div className="col-xs-10 col-xl-4">
                    <ul className="tag-nav-left nav nav-pills">
                        <li className="nav-item">
                            <a id='furBaby' className="nav-link" onClick={furBaby}>🐶 fur babies</a>
                        </li>
                        <li class="nav-item">
                            <a id='exoticBaby' className="nav-link" onClick={exoticBaby}>🐯 exotic babies</a>
                        </li>
                        <li class="nav-item">
                            <a id='scaleBaby' className="nav-link" onClick={scaleBaby}>🐠 scale babies</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-10 col-xl-4">
                    <ul className="tag-nav-right nav nav-pills justify-content-end">
                        <li className="nav-item">
                            <a id='all' className="nav-link active" onClick={getAll}>🕐 latest</a>
                        </li>
                        <li className="nav-item">
                            <a id='likes' className="nav-link" onClick={likes}>🔥 top</a>
                        </li>
                    </ul>
                </div>
            </div>
            <PostDisplay
                sessionToken={props.sessionToken}
                getWhat={getWhat}
                userLikedPosts={props.userLikedPosts}
                fetchData={props.fetchData}
                isLoggedIn={props.isLoggedIn}
            />
        </>
    )
}

export default Landing;

// if there's a page use that & if no page then grab the first 12