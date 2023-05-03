import sizes from "./sizes";

const styles = (theme) => ({
  root: {
    width: "50%",
    margin: "2rem auto",
    border: "1px solid black",
    [sizes.down("lg")]: {
      width: "50%",
    },
    [sizes.down("md")]: {
      width: "65%",
    },
    [sizes.down("sm")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "100%",
    },
  },

  createPostUpperDiv: {
    display: "flex",
    alignItems: "center",
    margin: "1rem",
    "& img": {
      margin: "0.8rem 0.8rem 0.8rem 0",
    },
  },
  createPostForm: {
    width: "100%",
  },
  createPostLowerDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem",
    "& div": {
      display: "flex",
      justifyContent: "center",
      flexGrow: 1,
      padding: "0.8rem",
      cursor: "pointer",
    },
  },
  createPostImgDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

export default styles;
