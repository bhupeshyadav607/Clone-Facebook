import React, { useState } from "react";
import io from "socket.io-client";
import useInputState from "./hooks/useInputState";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function Messenger() {
  const [username, handleChangeUsername, resetUsername] = useInputState("");
  const [room, handleChangeRoom, resetRoom] = useInputState("");
  const [showChat, setShowChat] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  function joinRoom() {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <>
      {!showChat ? (
        <div>
          <h3>Join A Chat to start messaging</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={handleChangeUsername}
            value={username}
          />
          <input
            type="text"
            placeholder="Room to enter.."
            value={room}
            onChange={handleChangeRoom}
          />
          <button type="submit" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default Messenger;
