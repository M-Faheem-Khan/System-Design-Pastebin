import React, { useState } from "react";

import * as styles from "../styles.module.css"

const CreatePost = () => {
    const [getTitle, setTitle] = useState('');
    const [getPost, setPost] = useState('');
    const [getExpiry, setExpiry] = useState(0);
    const [getMessage, setMessage] = useState('');

    const updateTitleInState = (e) => {
        setTitle(e);
    }

    const updatePostInState = (e) => {
        setPost(e);
    }

    const updateExpiryInState = (e) => {
        setExpiry(e)
    }

    const sendCreatePostRequest = (e) => {
        e.preventDefault();

        var url = "http://localhost:9000/post"
        var body = JSON.stringify({
            "title": getTitle,
            "message": getPost,
            "expiresIn": getExpiry
        })

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        fetch(url, requestOptions).then(response => {
            return response.json()
        }).then(result => {
            setMessage(result.message);
        }).catch(error => console.log('error', error));
    }

    return (
        <>
            <center>
                <h1>Create Post</h1>
            </center>
            <form onSubmit={(e) => sendCreatePostRequest(e)}>
                <input className={[styles.formInput, styles.inputBorder].join(" ")} type="text" placeholder="Title" value={getTitle} onChange={(e) => updateTitleInState(e.target.value)} />
                <br />
                <textarea className={[styles.textAreaInput, styles.inputBorder].join(" ")} rows={5} placeholder="Post" value={getPost} onChange={(e) => updatePostInState(e.target.value)}></textarea>
                <br />
                <input className={[styles.formInput, styles.inputBorder].join(" ")} type="number" value={getExpiry} placeholder="Seconds to expire after" onChange={(e) => updateExpiryInState(e.target.value)} />
                <br />
                <center>
                    <button type="submit" className={styles.btn} >Create Post</button>
                </center>
            </form>
            <p>{getMessage}</p>
        </>
    );
}

export default CreatePost;
// EOF