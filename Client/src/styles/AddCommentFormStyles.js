const styles = (theme) => ({
  allCommentsDiv: {
    height: "300px",
    margin: "1rem 0",
    overflowY: "scroll",
  },
  commentDiv: {
    padding: "0.5rem 0",
    "& div": {
      "& span": { fontSize: "1rem", fontWeight: "300" },
    },
  },
  commentDetailsDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& div": {
      margin: "0 1.4rem",
      display: "flex",
      alignItems: "center",
    },
  },
});

export default styles;
