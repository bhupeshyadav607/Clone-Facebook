import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ChatStyles";
import useInputState from "./hooks/useInputState";

function Chat({ classes, socket, username, room }) {
  const [currentMessage, handleChangeCurrentMessage, resetCurrentMessage] =
    useInputState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      resetCurrentMessage();
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className={classes.chatHeader}>
        <h1>Live Chat</h1>
        <h2>{`You are inside the room-${room}`}</h2>
      </div>
      <div className={classes.chatBody}>
        {messageList.map((messageContent) => (
          <div>
            <h3>{messageContent.message}</h3>--
            <span>{messageContent.author}</span>--
            <span>{messageContent.time}</span>
          </div>
        ))}
      </div>
      <div className={classes.chatFooter}>
        <textarea
          placeholder="Your Message..."
          value={currentMessage}
          onChange={handleChangeCurrentMessage}
        ></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default withStyles(styles)(Chat);
