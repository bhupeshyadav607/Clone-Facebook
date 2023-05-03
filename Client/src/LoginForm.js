import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography,
  MenuItem,
  Select,
  withStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputState from "./hooks/useInputState";

import styles from "./styles/LoginFormStyles";
import useToggle from "./hooks/useToggle";
import { Link } from "react-router-dom";

function LoginForm(props) {
  const { classes, history } = props;
  const [email, handleEmailChange, resetEmail] = useInputState("");
  const [password, handlePasswordChange, resetPassword] = useInputState("");
  const [isIncDetails, setIsIncDetails] = useState(false);
  const [isUserNotThere, setIsUserNotThere] = useState(false);

  function handleSignIn(e) {
    e.preventDefault();
    resetEmail();
    resetPassword();
    const givenDetails = { email: email, password: password };
    const registeredUsers = JSON.parse(localStorage.getItem("Users"));
    if (registeredUsers) {
      if (registeredUsers.some((user) => user.email === givenDetails.email)) {
        if (
          registeredUsers.some(
            (user) =>
              user.email === givenDetails.email &&
              user.password === givenDetails.password
          )
        ) {
          //console.log("Details Correct!");
          localStorage.setItem("currentUser", JSON.stringify(givenDetails));
          window.location.pathname = "/";
        } else {
          setIsIncDetails(true);
          return;
        }
      } else {
        setIsUserNotThere(true);
      }
    } else {
      setIsUserNotThere(true);
    }
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign In</Typography>
        <Select value="english">
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="hindi">Hindi</MenuItem>
          <MenuItem value="french">French</MenuItem>
          <MenuItem value="spanish">Spanish</MenuItem>
        </Select>
        {isIncDetails && (
          <Alert severity="error" className={classes.error}>
            Either Username or Password Incorrect
          </Alert>
        )}
        {isUserNotThere && (
          <Alert severity="error" className={classes.error}>
            User Does Not Exist, Please Register First!!
          </Alert>
        )}
        <ValidatorForm className={classes.form} onSubmit={handleSignIn}>
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
            validators={["required"]}
            errorMessages={["This field is required"]}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember Me"
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Sign In
          </Button>
        </ValidatorForm>
        <div className={classes.signupDiv}>
          <Typography>Don't have an account?</Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </div>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(LoginForm);
