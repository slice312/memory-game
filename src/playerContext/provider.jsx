import React from "react";
import {PlayerContext} from "./index";

1
export const PlayerProvider = ({children}) => {
    const [name, setName] = React.useState("")
    const [moves, setMoves] = React.useState(0);


    const [startTime, setStartTime] = React.useState(0);
    const [endTime, setEndTime] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);



    const startGame = () => {
        setMoves(0);
        setStartTime(Date.now());
        setEndTime(0);
        setIsActive(true);
    };

    const stopGame = () => {
        setEndTime(Date.now());
        setIsActive(false);
    };

    const addMove = () => setMoves(prev => prev + 1);

    const value = {
        name,
        setName,
        moves,
        addMove,
        startGame,
        stopGame,
        isActive
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};


