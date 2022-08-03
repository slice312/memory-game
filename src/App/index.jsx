import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";

import {PlayerProvider} from "src/features/playerContext/provider";
import {WelcomePage} from "src/pages/WelcomePage";
import {Game} from "src/pages/Game";
import {Leaderboard} from "src/pages/Leaderboard";
import {withAuthRoute} from "./providers/withAuthRoute";
import "./styles/null.scss";


const PrivateGamePage = withAuthRoute(Game);


export const App = () => {

    return (
        <PlayerProvider>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/game/:gameMode" element={<PrivateGamePage/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>

            </Routes>
        </PlayerProvider>
    );
};