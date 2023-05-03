import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link, Redirect, withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import GroupIcon from "@material-ui/icons/Group";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import GamesIcon from "@material-ui/icons/Games";
import { withStyles } from "@material-ui/styles";
import AppsIcon from "@material-ui/icons/Apps";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ForumIcon from "@material-ui/icons/Forum";
import FacebookIcon from "@material-ui/icons/Facebook";
import styles from "./styles/NavbarStyles";
import sizes from "./styles/sizes";

function Navbar(props) {
  const { classes, history } = props;

  function handleLogout() {
    localStorage.setItem("currentUser", JSON.stringify(null));
    window.location.pathname = "/";
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const allUsersDetails = JSON.parse(localStorage.getItem("allUsersDetails"));
  const currentUserDetails = allUsersDetails[currentUser.email];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <div className={classes.leftDiv}>
            <IconButton className={classes.menuButton} color="inherit">
              <Link to="/">
                <FacebookIcon fontSize="large" style={{ color: "blue" }} />
              </Link>
            </IconButton>
            <Link to="/messenger">
              <ForumIcon fontSize="large" style={{ color: "#629af5" }} />
            </Link>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </div>
          <div className={classes.midDiv}>
            <HomeIcon fontSize="large" />
            <LiveTvIcon fontSize="large" />
            <HomeWorkIcon fontSize="large" />
            <GroupIcon fontSize="large" />
            <GamesIcon fontSize="large" />
          </div>
          <div className={classes.rightDiv}>
            <AppsIcon fontSize="large" />
            <MessageIcon fontSize="large" />
            <NotificationsIcon fontSize="large" />
          </div>
          <div className={classes.accountIcon}>
            <img
              src={currentUserDetails.userImg}
              width="40px"
              height="40px"
              style={{ borderRadius: "50%" }}
            ></img>
          </div>

          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>

          <div>
            <MenuIcon className={classes.rightMenuIcon} fontSize="large" />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(withRouter(Navbar));
