import React from "react";
import {Link, useParams} from "react-router-dom";
import {Button} from "@mui/material";

import {PlayerContext} from "src/playerContext";
import {Card} from "src/entities/Card";
import {ModalResult} from "src/widgets/ModalResult";
import {Stopwatch} from "src/shared/ui/Stopwatch";
import {gameModel, getCards, GameAction} from "./model";
import {CardsGridContainer} from "./ui/CardsGridContainer";
import css from "./styles.module.scss";


export const Game = () => {
    const {gameMode} = useParams();
    const playerContext = React.useContext(PlayerContext);
    const [state, dispatch] = React.useReducer(gameModel.reducer, gameModel.initialState);

    React.useEffect(() => {
        dispatch({type: GameAction.SetCards, payload: {cards: getCards(gameMode)}});
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
            playerContext.startGame(gameMode);
            stopwatchRef.current.start();
        }

        playerContext.addMove();
        setTimeout(() => {
            dispatch({type: GameAction.OpenedCards, payload: {cardId: card.id}});
        });
        if (state.openedCardIds.length === 2)
            clearTimeout(timeoutHandlerId.current);
    };


    React.useEffect(() => {
        checkCompletion();
    }, [state.clearedCardIds]);

    const checkCompletion = () => {
        if (state.cards.length && state.clearedCardIds.length === state.cards.length) {
            playerContext.stopGame();
            stopwatchRef.current.stop();
            setShowModal(true);
        }
    };

    const handleRestart = () => {
        dispatch({type: GameAction.Reset});
        dispatch({type: GameAction.SetCards, payload: {cards: getCards(gameMode)}});
        setShowModal(false);
        playerContext.resetGame();
        stopwatchRef.current.stop();
        stopwatchRef.current.reset();
    };

    return (
        <div className={css.root}>
            <CardsGridContainer gameMode={gameMode}>
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

            <div className={css.score}>
                <div className="moves">
                    <span className={css.bold}>Moves:</span> {playerContext.moves}
                </div>
                <div className={css.stopwatch}>
                    <span className={css.bold}>Time:</span>
                    <Stopwatch ref={stopwatchRef}/>
                </div>
            </div>
            <div className={css.restart}>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Back
                </Button>
                <Button onClick={handleRestart} color="primary" variant="contained">
                    Restart
                </Button>
            </div>

            <ModalResult
                showModal={showModal}
                onRestart={handleRestart}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};