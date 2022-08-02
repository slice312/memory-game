import {ModalResult} from "../../App/ModalResult";
import {Card} from "../../App/Card";
import React from "react";
import "./styles.scss";
import {Link, Navigate, useParams} from "react-router-dom";
import {GameMode} from "src/shared/constants";

import {PlayerContext} from "src/playerContext";
import {CardsGridContainer} from "./CardsGridContainer";
import {Button} from "@mui/material";2

import {Stopwatch} from "./Stopwatch";
import {gameModel, getCards, GameAction} from "./model";



export const Game = () => {

    console.log("Game");
    const playerContext = React.useContext(PlayerContext);
    const [state, dispatch] = React.useReducer(gameModel.reducer, gameModel.initialState);
    const {gameMode} = useParams();
    React.useEffect(() => {
        dispatch({type: GameAction.SetCards, payload: getCards(gameMode)});
    }, [gameMode]);


    const [showModal, setShowModal] = React.useState(false);


    const stopwatchRef = React.useRef();


    const timeoutHandlerId = React.useRef(null);


    const refIsDisabledCards = React.useRef(false);


    React.useEffect(() => {
        if (state.openedCardIds.length === 2) {
            const [firstCardId, secondCardId] = state.openedCardIds;
            const firstCard = state.cards.find(x => x.id === firstCardId);
            const secondCard = state.cards.find(x => x.id === secondCardId);

            if (firstCard.type === secondCard.type) {
                refIsDisabledCards.current = true;
                setTimeout(() => {
                    dispatch({type: GameAction.MatchedCards});
                    refIsDisabledCards.current = false;
                }, 400);
            } else {
                timeoutHandlerId.current = setTimeout(
                    () => dispatch({type: GameAction.ClosedCards}),
                    3000
                );
            }
        }
    }, [state.openedCardIds]);


    const handleCardClick = (card) => {
        if (refIsDisabledCards.current)
            return;

        if (!playerContext.isActive) {
            playerContext.startGame();
            stopwatchRef.current.start();
        }

        playerContext.addMove();
        setTimeout(() => {
            dispatch({type: GameAction.OpenedCards, payload: {cardId: card.id}});
        });
        if (state.openedCardIds.length === 2)
            clearTimeout(timeoutHandlerId.current);
    };

    const checkCompletion = () => {
        if (state.cards.length && Object.keys(state.clearedCardIds).length === state.cards.length) {
            playerContext.stopGame();
            stopwatchRef.current.stop();
            setShowModal(true);
        }
    };


    React.useEffect(() => {
        checkCompletion();
    }, [state.clearedCardIds]);


    const handleRestart = () => {
        dispatch({type: GameAction.Reset});
        dispatch({type: GameAction.SetCards(), payload: getCards(gameMode)});
        setShowModal(false);
        playerContext.resetGame();
        stopwatchRef.current.stop();
        stopwatchRef.current.reset();
    };

    let rows = 4;
    let columns = 4;

    if (gameMode === GameMode.Mode3x4) {
        rows = 3;
        columns = 4;
    }

    if (gameMode === GameMode.Mode5x6) {
        rows = 5;
        columns = 6;
    }

    if (gameMode === GameMode.Mode6x6) {
        rows = 6;
        columns = 6;
    }

    return (
        <div className="App">
            <CardsGridContainer rows={rows} columns={columns}>
                {
                    state.cards.map((card, i) => {
                        return (
                            <Card
                                key={card.id}
                                card={card}
                                isInactive={state.clearedCardIds.includes(card.id)}
                                isFlipped={state.openedCardIds.includes(card.id)}
                                onClick={handleCardClick}
                            />
                        );
                    })
                }
            </CardsGridContainer>

            <footer>
                <div className="score">
                    <div className="moves">
                        <span className="bold">Moves:</span> {playerContext.moves}
                    </div>
                    <div className="stopwatch">
                        <span className="bold">Time:</span>
                        <Stopwatch ref={stopwatchRef}/>
                    </div>
                </div>
                <div className="restart">
                    <Button component={Link} to="/" variant="contained" color="primary">
                        Back
                    </Button>
                    <Button onClick={handleRestart} color="primary" variant="contained">
                        Restart
                    </Button>
                </div>
            </footer>

            <ModalResult
                showModal={showModal}
                onRestart={handleRestart}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};


