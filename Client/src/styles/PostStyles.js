const styles = (theme) => ({
  root: {
    marginTop: "20px",
    backgroundColor: "white",
    padding: "2px 16px",
    border: "1px solid rgba(255,255,255,0)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    "& hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& img": {
      borderRadius: "50%",
      margin: "10px",
    },
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerUserDetails: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    minHeight: "100px",
  },
  postContentImgDiv: {
    width: "100%",
  },
  postContentImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
  },
  footer: {
    color: "#898F9C",
  },
  footerUpper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& div": {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      "& span": {
        margin: "0 0.3rem",
        fontSize: "0.9rem",
      },
    },
  },
  footerLower: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& div": {
      display: "flex",
      cursor: "pointer",
      "& span": {
        margin: "0 0.5rem 0.5rem 0.5rem",
        fontSize: "0.9rem",
      },
    },
  },
});

export default styles;
