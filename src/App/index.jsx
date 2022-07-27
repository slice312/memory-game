import React from "react";
import {Game} from "./Game";
import {PlayerProvider} from "./playerContext/provider";


export const App = () => {

    return (
        <PlayerProvider>
            <Game/>
        </PlayerProvider>
    );
};


