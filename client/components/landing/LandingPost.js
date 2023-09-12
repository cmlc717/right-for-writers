import React from 'react';
import { Link } from "react-router-dom";

const LandingPost = (props) => {
    let post = props.post;

    return (
        <div>
            <p class="bg-primary">{post.name}</p>
            <p>Author: {post.Author.username}</p>
            <p>Editor: {post.Editor.username}</p>
            <p class="text-muted">Date of Creation: {post.createdAt}</p>
            <p class="text-muted">Likes: {post.Liked.length}</p>
            <p class="text-muted">Favorites: {post.Favorited.length}</p>
            <p class="text-muted">Bookmarks: {post.Bookmarked.length}</p>
            <p class="text-muted">Comments: {post.comments.length}</p>
            <p class="text-muted">Views: {post.views}</p>
            <p class="text-muted">Genre: {post.genres.map((genre) => <li>{genre.name}</li>)}</p>
            <p class="text-muted">Tags: {post.tags.map((tag) => <li>{tag.name}</li>)}</p>
        </div>
    );
}

export default LandingPost;