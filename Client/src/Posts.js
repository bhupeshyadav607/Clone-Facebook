import { withStyles } from "@material-ui/styles";
import { Paper, Input, Typography } from "@material-ui/core";
import { React, useState } from "react";
import styles from "./styles/PostsStyles";
import Post from "./Post";
import Navbar from "./Navbar";
import AddPhotoAlternateRoundedIcon from "@material-ui/icons/AddPhotoAlternateRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import useInputState from "./hooks/useInputState";
import { v4 as uuidv4 } from "uuid";

function Posts(props) {
  const { classes } = props;

  const [createPostText, handleCreatePostTextChange, resetCreatePostText] =
    useInputState("");
  const [createPostImg, setCreatePostImg] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //console.log(currentUser);
  const allUsersDetails = JSON.parse(localStorage.getItem("allUsersDetails"));
  //console.log(allUsersDetails);
  const currentUserDetails = allUsersDetails[currentUser.email];
  //console.log(currentUserDetails);
  const posts = JSON.parse(localStorage.getItem("Posts"));
  //console.log(posts);

  //console.log(posts);

  function handleCreatePost(e) {
    e.preventDefault();
    //saving to the global posts
    const newPostText = createPostText;
    const newUsername = currentUser.email;
    const createdPost = {
      id: uuidv4(),
      username: newUsername,
      uploadTime: "Today",
      postContent: {
        text: newPostText,
        img: createPostImg,
      },
      likedBy: [],
      comments: [],
    };
    const savedPosts = localStorage.getItem("Posts")
      ? JSON.parse(localStorage.getItem("Posts"))
      : [];
    const postsArray = [createdPost, ...savedPosts];
    localStorage.setItem("Posts", JSON.stringify(postsArray));
    //console.log(JSON.parse(localStorage.getItem("Posts")));
    resetCreatePostText();
    setCreatePostImg("");

    // saving to users own posts
    //currentUserDetails.posts.unshift(createdPost);
    //console.log(currentUserDetails);
    const currentUserLikedPosts = currentUserDetails.likedPosts;
    const newAllUserDetails = {
      ...allUsersDetails,
      [currentUser.email]: {
        username: currentUserDetails.username,
        userImg:
          "https://i.pinimg.com/474x/bd/b9/c6/bdb9c62a0c858ead77a97d85c16056c9.jpg",
        posts: [createdPost, ...currentUserDetails.posts],
        likedPosts: currentUserLikedPosts,
      },
    };
    //console.log(newAllUserDetails);
    localStorage.setItem("allUsersDetails", JSON.stringify(newAllUserDetails));
    //console.log(JSON.parse(localStorage.getItem("allUsersDetails")));
  }

  function addPhoto() {
    const postImg =
      "https://i.pinimg.com/474x/bd/b9/c6/bdb9c62a0c858ead77a97d85c16056c9.jpg";
    createPostImg ? setCreatePostImg("") : setCreatePostImg(postImg);
  }

  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <Navbar />
      <div className={classes.root}>
        <h2>Your Feed</h2>
        <Paper style={{ margin: "0.5rem 0", paddingTop: "0.6rem" }}>
          <form className={classes.createPostForm} onSubmit={handleCreatePost}>
            <div className={classes.createPostUpperDiv}>
              <img
                src={currentUserDetails.userImg}
                width="35px"
                height="35px"
                style={{ borderRadius: "50%" }}
              ></img>
              <Input
                type="text"
                value={createPostText}
                onChange={handleCreatePostTextChange}
                placeholder="what's on your mind?"
                fullWidth
              ></Input>
            </div>
            <div className={classes.createPostImgDiv}>
              {createPostImg ? <img src={createPostImg}></img> : ""}
            </div>
            <div className={classes.createPostLowerDiv}>
              <div onClick={addPhoto}>
                <AddPhotoAlternateRoundedIcon fontSize="small" />
                <Typography>Photo/Video</Typography>
                <input type="file" hidden></input>
              </div>
              <div>
                <PersonAddRoundedIcon fontSize="small" />
                <Typography>Tag friends</Typography>
              </div>
              <div>
                <EmojiEmotionsRoundedIcon fontSize="small" />
                <Typography>Feeling/Activity</Typography>
              </div>
            </div>
          </form>
        </Paper>

        {posts ? (
          posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              userImg={currentUserDetails.userImg}
            />
          ))
        ) : (
          <div>
            <h2>Currently no posts to show!!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(Posts);
