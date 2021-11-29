import { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";

const Landing = (props) => {
    const [getWhat, setGetWhat] = useState({ what: 'all', tag: null });

    return (
        <div id='landing'>
            <h5>Landing</h5>
            <p>Landing Page</p>
            <PostDisplay getWhat={getWhat} />
        </div>
    )
}

export default Landing;