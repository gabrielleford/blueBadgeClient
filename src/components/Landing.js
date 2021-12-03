import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import PostDisplay from "./PostDisplay";

const Landing = (props) => {
    const [getWhat, setGetWhat] = useState({ what: 'all', tag: null });
    const [tagClicked, setTagClicked] = useState(false);

    const furBaby = () => {
        console.log(props.sessionToken);
        setGetWhat({ what: 'tag', tag: 'fur baby' });
        setTagClicked(true);
    };

    const scaleBaby = () => {
        setGetWhat({ what: 'tag', tag: 'scale baby' });
        setTagClicked(true);
    };

    const exoticBaby = () => {
        setGetWhat({ what: 'tag', tag: 'exotic baby' });
        setTagClicked(true);
    };

    const getAll = () => {
        setGetWhat({ what: 'all', tag: null });
        setTagClicked(false);
    }
    const likes = () => {
        setGetWhat({ what: 'likes', tag: null });
        setTagClicked(false);
    }

    useEffect(() => {
        setGetWhat({ what: 'all', tag: null });
    }, []);

    return (
        <div id='landing'>
            <h5>Landing</h5>
            <p>Landing Page</p>
            {tagClicked ? <Button onClick={getAll}>All</Button> : ''}
            <Button onClick={furBaby}>Fur Baby</Button>
            <Button onClick={scaleBaby}>Scale Baby</Button>
            <Button onClick={exoticBaby}>Exotic Baby</Button>
            <Button onClick={likes}>Top Likes</Button>
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

// if there's a page use that & if no page then grab the first 12