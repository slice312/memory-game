import React from "react";
import {PlayerContext} from "./index";
import _ from "lodash";
import {cardsData} from "../App/data";


export const PlayerProvider = ({children}) => {

    const [name, setName] = React.useState("")
    const [moves, setMoves] = React.useState(0);
    const [timeSpan, setTimeSpan] = React.useState(0);

    const [elapsedTime, setElapsedTime] = React.useState("");

    const resetMoves = () => setMoves(0);

    const addMove = () => setMoves(prev => prev + 1);

    const value = {
        name,
        setName,
        moves,
        resetMoves,
        addMove,
        setTimeSpan
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}


