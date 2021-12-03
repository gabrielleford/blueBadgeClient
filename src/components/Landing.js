import { useEffect, useState } from "react";
import { Button } from "reactstrap";
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
        <div id='landing'>
            <h5>Landing</h5>
            <p>Landing Page</p>
            <Button className='active' id='all' onClick={getAll}>Latest</Button>
            <Button id='furBaby' onClick={furBaby}>Fur Baby</Button>
            <Button id='scaleBaby' onClick={scaleBaby}>Scale Baby</Button>
            <Button id='exoticBaby' onClick={exoticBaby}>Exotic Baby</Button>
            <Button id='likes' onClick={likes}>Top Likes</Button>
            <PostDisplay
                sessionToken={props.sessionToken}
                getWhat={getWhat}
                userLikedPosts={props.userLikedPosts}
                fetchData={props.fetchData}
            />
        </div>
    )
}

export default Landing;