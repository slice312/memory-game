import React from "react";
import {PlayerContext} from "./context";
import _ from "lodash";
import {cardsData} from "../data";

export const PlayerProvider = ({children}) => {

    const [name, setName] = React.useState("")
    const [moves, setMoves] = React.useState(0);

    const [elapsedTime, setElapsedTime] = React.useState("");

    const resetMoves = () => setMoves(0);

    const addMove = () => setMoves(prev => prev + 1);

    const value = {
        moves,
        resetMoves,
        addMove
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}


