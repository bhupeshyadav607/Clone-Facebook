import React from "react";
import { TextField, Paper, Button } from "@material-ui/core";
import useInputState from "./hooks/useInputState";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/AddCommentFormStyles";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

function AddCommentForm({ classes, addComment, comments }) {
  const [value, handleChange, reset] = useInputState("");

  return (
    <Paper style={{ margin: "0.8rem 0", padding: "0 1rem" }}>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment(value);
            reset();
          }}
        >
          <TextField
            value={value}
            onChange={handleChange}
            label="Add New Comment"
            required
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ float: "right", marginTop: "0.5rem" }}
            type="submit"
          >
            Add Comment
          </Button>
        </form>
      </div>

      <div className={classes.allCommentsDiv}>
        <h2>All Comments</h2>
        {comments.length === 0 ? (
          <h4>No Comments Yet!!.Be the first one to Comment</h4>
        ) : (
          comments.map((comment) => (
            <div className={classes.commentDiv} key={comment.id}>
              <p>
                <b>{comment.text}</b>
              </p>
              <div className={classes.commentDetailsDiv}>
                <div>
                  <span>{`By-${comment.username}`}</span>
                </div>
                <div>
                  <span>{`${comment.commentLikes.length} total likes`}</span>
                </div>
                <div>
                  <FavoriteBorderRoundedIcon fontSize="small" />
                  <span>like</span>
                </div>
              </div>
            </div>
          ))
        )}
        {}
      </div>
    </Paper>
  );
}

export default withStyles(styles)(AddCommentForm);
