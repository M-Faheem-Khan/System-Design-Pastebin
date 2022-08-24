import React, { useState } from "react";

import * as styles from "../styles.module.css"

const ViewPost = () => {
    const [getID, setID] = useState('');
    const [getTitle, setTitle] = useState('');
    const [getMessage, setMessage] = useState('');
    const [getStatusMessage, setStatusMessage] = useState('');

    const getPost = (e) => {
        e.preventDefault();
        // Get Post by Id
        setStatusMessage('');
        var url = `http://localhost:9000/post/${getID}`
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions).then(response => {
            response.json()
        }).then(result => {
            if (result.status !== undefined) {
                setStatusMessage(result.message);
            } else {
                setStatusMessage('Successfully fetched post')
                setTitle(result.title);
                setMessage(result.message);
            }
        }).catch(error => console.log(error));
    }

    return (
        <div className={styles.center} >
            <center>
                <h1>Get Post by ID</h1>
                <form onSubmit={(e) => getPost(e)}>
                    <input className={[styles.formInput, styles.inputBorder].join(" ")} type="text" placeholder="Post Id" value={getID} onChange={(e) => setID(e.target.value)} />
                    <br />
                    <button className={styles.btn} type="submit">Submit</button>
                </form>
            </center>
            <br />
            <center>
                <a href="/">Add Post</a>
            </center>
            <br />
            {showPost(getID, getTitle, getMessage, getStatusMessage)}

        </div>
    )
}

const showPost = (id, title, message, status) => {
    if (title !== '') {
        return (
            <div>
                <p>ID: {id}</p>
                <p>Title: {title}</p>
                <p>Message: {message}</p>
            </div>
        )
    } else {
        if (status !== '') {

            return (
                <div>
                    <p>Status: {status}</p>
                </div>

            )
        }
    }
}

export default ViewPost;
// EOF