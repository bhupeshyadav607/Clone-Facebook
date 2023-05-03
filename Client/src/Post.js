import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles/PostStyles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import useToggle from "./hooks/useToggle";
import AddCommentForm from "./AddCommentForm";
import { v4 as uuidv4 } from "uuid";

function Post(props) {
  const {
    classes,
    id,
    username,
    userImg,
    uploadTime,
    postContent,
    likedBy,
    comments,
  } = props;
  //console.log(props);
  const postId = id;
  //console.log(likedBy);

  // const initialComments = [
  //   ...comments,
  //   { id: uuidv4(), text: "Verry good man, keep it up" },
  //   { id: uuidv4(), text: "All thanks to you!" },
  //   { id: uuidv4(), text: "Hey!! That sounds interesting haha..." },
  // ];
  const initialComments = comments ? [...comments] : [];
  //console.log(initialComments);

  const [isCommenting, toggleIsCommenting] = useToggle(false);
  const [allComments, setAllComments] = useState(initialComments);
  const [likes, setLikes] = useState(likedBy);

  const noOfComments = allComments.length;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const addComment = (newCommentText) => {
    setAllComments([
      ...allComments,
      {
        id: uuidv4(),
        text: newCommentText,
        username: currentUser.email,
        commentLikes: [],
      },
    ]);
  };

  function handleLike() {
    console.log("liked--", postId);
    //console.log(likes.indexOf(currentUser.email));
    if (likes.indexOf(currentUser.email) === -1) {
      setLikes([...likes, currentUser.email]);
    } else {
      setLikes(likes.filter((el) => el !== currentUser.email));
      //console.log(likes);
    }
  }

  useEffect(() => {
    //console.log(likes);
    const allPosts = JSON.parse(localStorage.getItem("Posts"));
    const clickedPost = allPosts.filter((post) => post.id === postId)[0];
    const clickedPostIndex = allPosts.indexOf(clickedPost);
    //console.log("index of clicked--", clickedPostIndex);
    //const filteredPosts = allPosts.filter((post) => post.id !== postId);
    const editedPost = {
      id: clickedPost.id,
      postContent: clickedPost.postContent,
      username: clickedPost.username,
      uploadTime: clickedPost.uploadTime,
      likedBy: likes,
    };
    //console.log(editedPost);
    //const combinedPosts = [...filteredPosts, editedPost];
    allPosts.splice(clickedPostIndex, 1, editedPost);
    //console.log(allPosts);
    localStorage.setItem("Posts", JSON.stringify(allPosts));
    //console.log(JSON.parse(localStorage.getItem("Posts")));

    //also changing in users profile,which posts are liked by the user
    if (likes.indexOf(currentUser.email) !== -1) {
      const allUsersDetails = JSON.parse(
        localStorage.getItem("allUsersDetails")
      );
      const currentUserDetails = allUsersDetails[currentUser.email];
      const allLikedPosts = currentUserDetails.likedPosts;
      let newLikedPosts;
      if (allLikedPosts.indexOf(postId) === -1) {
        newLikedPosts = [...allLikedPosts, postId];
      } else {
        newLikedPosts = [...allLikedPosts];
      }
      const changedUsersDetails = {
        ...allUsersDetails,
        [currentUser.email]: {
          ...currentUserDetails,
          likedPosts: newLikedPosts,
        },
      };
      localStorage.setItem(
        "allUsersDetails",
        JSON.stringify(changedUsersDetails)
      );
      // console.log(
      //   JSON.parse(localStorage.getItem("allUsersDetails"))[currentUser.email]
      // );
    } else {
      const allUsersDetails = JSON.parse(
        localStorage.getItem("allUsersDetails")
      );
      const currentUserDetails = allUsersDetails[currentUser.email];
      const newLikedPosts = currentUserDetails.likedPosts.filter(
        (el) => el !== postId
      );
      const changedUsersDetails = {
        ...allUsersDetails,
        [currentUser.email]: {
          ...currentUserDetails,
          likedPosts: newLikedPosts,
        },
      };
      localStorage.setItem(
        "allUsersDetails",
        JSON.stringify(changedUsersDetails)
      );
      // console.log(
      //   JSON.parse(localStorage.getItem("allUsersDetails"))[currentUser.email]
      // );
    }
  }, [likes]);

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("Posts"));
    //console.log(allPosts);
    const commentedPost = allPosts.filter((post) => post.id === postId)[0];
    // console.log(commentedPost);
    const commentedPostIndex = allPosts.indexOf(commentedPost);
    const editedPost = {
      ...commentedPost,
      comments: allComments,
    };
    allPosts.splice(commentedPostIndex, 1, editedPost);
    localStorage.setItem("Posts", JSON.stringify(allPosts));
  }, [allComments]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <img src={userImg} width="40px" height="40px"></img>
          <div className={classes.headerUserDetails}>
            <span style={{ fontSize: "1rem" }}>
              <b>{username}</b>
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                marginLeft: "3px",
                color: "#898F9C",
              }}
            >
              {uploadTime}
            </span>
          </div>
        </div>
        <div>
          <span>
            <MoreHorizIcon style={{ color: "#898F9C" }} />
          </span>
        </div>
      </div>
      <div className={classes.content}>
        <p>{postContent.text}</p>
        {postContent.img ? (
          <div className={classes.postContentImgDiv}>
            <img className={classes.postContentImg} src={postContent.img} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.footerUpper}>
          <div className={classes.footerLikes}>
            <ThumbUpIcon fontSize="small" style={{ color: "#4267B2" }} />
            <span>{likes.length} likes</span>
          </div>
          <div className={classes.footerComments} onClick={toggleIsCommenting}>
            <span>{noOfComments} comments</span>
          </div>
        </div>
        <hr style={{ color: "#898F9C" }} />
        <div className={classes.footerLower}>
          <div onClick={handleLike}>
            {likes.indexOf(currentUser.email) === -1 ? (
              <ThumbUpOutlinedIcon
                fontSize="small"
                style={{ color: "#898F9C" }}
              />
            ) : (
              <ThumbUpIcon fontSize="small" style={{ color: "#4267B2" }} />
            )}
            <span>
              {likes.indexOf(currentUser.email) === -1 ? "Like" : "Dislike"}
            </span>
          </div>
          <div onClick={toggleIsCommenting}>
            <ChatBubbleOutlineIcon
              fontSize="small"
              style={{ color: "#898F9C" }}
            />
            <span>Comment</span>
          </div>
          <div>
            <ShareIcon fontSize="small" style={{ color: "#898F9C" }} />
            <span>Share</span>
          </div>
        </div>
        {isCommenting ? (
          <div>
            <AddCommentForm comments={allComments} addComment={addComment} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(Post);
