import * as React from "react"
import CreatePost from "../components/createPost";

import "./index.module.css"
import * as styles from "../styles.module.css"

const IndexPage = () => {
  return (
    <>
      <div className={styles.center}>
        <CreatePost />
        <center>
          <a href="/viewPost">View Post</a>
        </center>
      </div>
    </>
  )
}

export default IndexPage;
// EOF