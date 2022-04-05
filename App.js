import React from "react"
import {BrowserRouter as Router} from "react-router-dom";
import "materialize-css"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";

import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

  return (
      <AuthContext.Provider value={{
          token, login, logout, userId, isAuthenticated
      }}>
    <Router>
        {isAuthenticated && <Navbar/> }
    <div className="container">
        {routes}
        <div className="App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Prisijungti prie forumo</h3>
                    <input
                        type="text"
                        placeholder="Prisijungti"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Forumo ID"
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Prisijungti prie forumo</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>

    </div>
    </Router>
      </AuthContext.Provider>
  );
}

export default App;
