import React from "react";
import {PlayerContext} from "./index";
import dayjs from "dayjs";
import lstore from "store";


export const PlayerProvider = ({children}) => {
    React.useEffect(() => {
    }, []);


    const [gameMode, setGameMode] = React.useState();
    const [moves, setMoves] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [startTime, setStartTime] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);



    const saveResult = () => {
        const user = lstore.get("user");
        if (!user)
            return;

        const dif = Date.now() - startTime;
        setElapsedTime(dif);

        const sec = Math.round(dayjs.duration(dif).asSeconds());

        const score = sec * moves;

        setScore(score);

        const result = {
            name: user.name,
            gameMode, // TODO: проблема
            moves,
            elapsedTime: dif,
            score
        };


        const leaderboard = store.get("leaderboard");
        if (leaderboard) {
            const existedRecIndex = leaderboard.findIndex(x => x.name === user.name && x.gameMode === gameMode);
            if (existedRecIndex !== -1) {
                const existedRec = leaderboard[existedRecIndex];
                if (existedRec.score >= result.score) {
                    leaderboard[existedRecIndex] = result;
                }
            } else
                leaderboard.push(result);
            store.set("leaderboard", leaderboard);

        } else {
            store.set("leaderboard", [result]);
        }
    };


    const startGame = (gameMode) => {
        setGameMode(gameMode);
        setMoves(0);
        setStartTime(Date.now());
        setIsActive(true);
    };

    const stopGame = () => {
        setIsActive(false);
        saveResult();
    };

    const resetGame = () => {
        setMoves(0);
        setIsActive(false);
    };

    const addMove = () => setMoves(prev => prev + 1);

    const value = {
        moves,
        addMove,
        startGame,
        stopGame,
        resetGame,
        score,
        elapsedTime,
        isActive
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};


