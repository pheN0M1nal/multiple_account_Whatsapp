import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Sidebar from "components/Sidebar";
import Chat from "pages/Chat";
import QrCodeScreen from "screens/QrCodeScreen";

import io from "socket.io-client";
import { MainWrapper } from "components/Global/MainWrapper";
import LoginContainer from "components/Authentication/login/Container";

const userPrefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
    const [ready, setReady] = useState(false);
    const [startLoadProgress, setStartLoadProgress] = useState(false);
    const [users, setUsers] = useState([]);
    const [pp, setProfilePictures] = useState([]);
    const [login, setLogin] = useState(false);

    const SOCKET_URL = window.location.origin.includes("localhost") ? "http://localhost:5000" : "";

    let socket = useRef(null);

    useEffect(() => {
        socket.current = io(SOCKET_URL);

        socket.current.on("connnection", () => {
            console.log("connected to server");
        });

        socket.current.on("clientIsReady", () => {
            setReady(true);
            setStartLoadProgress(true);
        });

        socket.current.on("LoggedIn", () => {
            setStartLoadProgress(false);
            setLogin(true);
        });

        return () => {
            socket.current.emit("disconnecting_", { componentName: "App" });
            socket.current.disconnect();
        };
    }, []);

    return ready ? (
        login ? (
            <div className="app">
                <p className="app__mobile-message"> Only available on desktop 😊. </p>

                <div className="app-content">
                    <MainWrapper>
                        <div className="chat_app">
                            <Sidebar setLogin={setLogin} />
                            <Routes>
                                <Route path="/chat/:id" exact={true} element={<Chat />} />
                                <Route path="/" exact={true} element={<Home />} />
                            </Routes>
                        </div>
                    </MainWrapper>

                    <Routes>
                        <Route path="/login" exact={true} element={<LoginContainer />} />
                    </Routes>
                </div>
            </div>
        ) : (
            <Loader done={startLoadProgress} />
        )
    ) : (
        <MainWrapper>
            <QrCodeScreen />
        </MainWrapper>
    );
}

export default App;
