import React, { useEffect } from "react";
import {
  Paper,
  withStyles,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import styles from "./styles/SignupFormStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputState from "./hooks/useInputState";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function SignupForm(props) {
  const { classes } = props;
  const [email, handleEmailChange, resetEmail] = useInputState("");
  const [password, handlePasswordChange, resetPassword] = useInputState("");

  useEffect(() => {
    ValidatorForm.addValidationRule(
      "isPasswordStrong",
      (value) => value.length > 5
    );
  });

  const handleSignup = (e) => {
    e.preventDefault();
    resetEmail();
    resetPassword();
    // const registered = localStorage.getItem("Users");
    // //console.log("registered is:--", registered);
    // let registeredUsers = [];
    // if (registered !== null) {
    //   registeredUsers = JSON.parse(registered);
    // }
    // //console.log("registered users are:-", registeredUsers);
    // const newUser = { email: email, password: password };
    // const users = [...registeredUsers, newUser];
    // console.log("current all:--", users);
    // localStorage.setItem("Users", JSON.stringify(users));

    const registeredUsers = localStorage.getItem("Users")
      ? JSON.parse(localStorage.getItem("Users"))
      : [];
    //console.log(registeredUsers);
    const newUser = { email: email, password: password };
    const users = [...registeredUsers, newUser];
    //console.log("current all:--", users);
    localStorage.setItem("Users", JSON.stringify(users));
    const previousUsersDetails = localStorage.getItem("allUsersDetails")
      ? JSON.parse(localStorage.getItem("allUsersDetails"))
      : {};
    const usersDetails = {
      [newUser.email]: {
        userImg:
          "https://i.pinimg.com/474x/bd/b9/c6/bdb9c62a0c858ead77a97d85c16056c9.jpg",
        posts: [],
        likedPosts: [],
      },
    };
    localStorage.setItem(
      "allUsersDetails",
      JSON.stringify({ ...previousUsersDetails, ...usersDetails })
    );
    //console.log(JSON.parse(localStorage.getItem("allUsersDetails")));
    props.history.push("/login");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>Sign Up</Typography>
        <ValidatorForm className={classes.form} onSubmit={handleSignup}>
          <TextValidator
            label="Email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Email is Not Valid"]}
          />
          <TextValidator
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            validators={["required", "isPasswordStrong"]}
            errorMessages={[
              "This field is required",
              "Password Should be more than 5 characters",
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Sign Up
          </Button>
        </ValidatorForm>
        <div className={classes.loginDiv}>
          <Typography>Already have an account?</Typography>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(SignupForm);
