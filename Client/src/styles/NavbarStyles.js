import sizes from "./sizes";

const styles = (theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  leftDiv: {
    width: "22%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#65676B",
    [sizes.down("md")]: {},
  },
  midDiv: {
    width: "56%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0.5rem 0",
    margin: "0 2rem",
    "& svg": {
      padding: "15px",
      color: "#65676B",
    },
    "& svg:hover": {
      cursor: "pointer",
      backgroundColor: "lightgrey",
      color: "blue",
      borderRadius: "10px",
    },
    [sizes.down("sm")]: {
      display: "none",
    },
  },
  rightDiv: {
    width: "22%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0.5rem 0",
    marginLeft: "2rem",
    "& svg": {
      padding: "15px",
    },
    "& svg:hover": {
      cursor: "pointer",
      backgroundColor: "lightgrey",
      color: "blue",
      borderRadius: "10px",
    },
    [sizes.down("lg")]: {
      display: "none",
    },
  },
  menuButton: { marginLeft: 0, marginRight: 10 },
  title: {},
  search: {
    marginLeft: "1rem",
    display: "flex",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "20px",
    [sizes.down("md")]: {
      display: "none",
    },
  },
  searchIcon: {
    margin: "5px",
  },
  rightMenuIcon: {
    display: "none",
    [sizes.down("sm")]: {
      display: "block",
      justifySelf: "flex-end",
    },
  },
  accountIcon: {
    borderRadius: "50%",
    display: "none",
    [sizes.down("lg")]: {
      display: "block",
    },
    [sizes.down("sm")]: {
      display: "none",
    },
  },
});

export default styles;
