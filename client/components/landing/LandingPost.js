import React from 'react';
import { Link } from "react-router-dom";

const LandingPost = (props) => {
    let post = props.post;

    return (
        <div>
            <p>{post.name}</p>
        </div>
    );
}

export default LandingPost;