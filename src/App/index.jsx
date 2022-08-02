import React from "react";
import {Game} from "../pages/Game";
import {PlayerProvider} from "src/playerContext/provider";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {WelcomePage} from "src/pages/WelcomePage";
import {Leaderboard} from "src/pages/Leaderboard";


export const App = () => {

    return (
        <PlayerProvider>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route>

                </Route>
                <Route path="/game" element={<Game/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
            </Routes>
        </PlayerProvider>
    );
};


