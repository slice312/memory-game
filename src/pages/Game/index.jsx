import {cardsData} from "../../App/data";
import {ModalResult} from "../../App/ModalResult";
import {Card} from "../../App/Card";
import _ from "lodash";
import React from "react";
import "./styles.scss";
import {Link, Navigate, useParams} from "react-router-dom";
import {GameMode} from "src/shared/constants";

import {PlayerContext} from "src/playerContext";
import {CardsGridContainer} from "./CardsGridContainer";
import {Button} from "@mui/material";

import {Stopwatch} from "./Stopwatch";
import {View} from "./View";


const initialState = {
    cards: [],
    openedCardIds: [],
    clearedCardIds: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "set_cards":
            return {...state, cards: action.payload};
        case "reset": {
            return initialState;
        }
        case "opened_card": {
            return {
                ...state,
                openedCardIds: [...state]
            }
        }
        case "clear_cards": {
            return {
                ...state,
                clearedCardIds: [...state.clearedCardIds, ...action.payload]
            }
        }
    }

};


export const Game = () => {
    const playerContext = React.useContext(PlayerContext);

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const {gameMode} = useParams();

    React.useEffect(() => {
        console.log("Effect");
        dispatch({type: "set_cards", payload: getCards(gameMode)});
    }, [gameMode]);

    const [openedCardIds, setOpenedCardIds] = React.useState([]);

    const [showModal, setShowModal] = React.useState(false);


    const stopwatchRef = React.useRef();


    const timeoutHandlerId = React.useRef(null);
    React.useEffect(() => {
        if (openedCardIds.length === 2) {
            const [firstCardId, secondCardId] = openedCardIds;
            const firstCard = state.cards.find(x => x.id === firstCardId);
            const secondCard = state.cards.find(x => x.id === secondCardId);

            if (firstCard.type === secondCard.type) {
                setTimeout(() => {
                    setOpenedCardIds([]);
                    dispatch({type: "clear_cards", payload: openedCardIds})
                }, 700);
            } else {
                timeoutHandlerId.current = setTimeout(() => setOpenedCardIds([]), 3000);
            }
        }
    }, [openedCardIds]);


    const handleCardClick = (card) => {
        if (!playerContext.isActive) {
            playerContext.startGame();
            stopwatchRef.current.start();
        }

        playerContext.addMove();
        if (openedCardIds.length === 2) {
            dispatch({type: "opened_cards", payload: {cardId: card.id}})
            setOpenedCardIds([card.id]);
            clearTimeout(timeoutHandlerId.current);
        } else
            setOpenedCardIds(prev => [...prev, card.id]);
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
        // setClearedCardIds([]);
        setOpenedCardIds([]);
        setShowModal(false);
        // setCards(() => getCards(params.mode)); //TODO: doit
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
                                isFlipped={openedCardIds.includes(card.id)}
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


/**
 * @param {GameMode} mode
 */
const getCards = (mode) => {
    let cards;

    if (mode === GameMode.Mode3x4) {
        const uniqCards = getUniqueCards(6);
        cards = _.times(2, () => uniqCards.slice())
            .flat();
    }

    if (mode === GameMode.Mode4x4) {
        const uniqCards = getUniqueCards(4);
        cards = _.times(4, () => uniqCards.slice())
            .flat();
    }

    if (mode === GameMode.Mode5x6) {
        const uniqCards = getUniqueCards(8);
        cards = _.chain(_.times(4, () => uniqCards.slice()))
            .flatten()
            .take(30)
            .value();
    }

    if (mode === GameMode.Mode6x6) {
        const uniqCards = getUniqueCards(9);
        cards = _.times(4, () => uniqCards.slice())
            .flat();
    }

    return _.chain(cards)
        .shuffle() // TODO: вернуть
        .map((card, i) => ({id: i, ...card}))
        .value();
};


const getUniqueCards = (qty) => {
    return _.chain(cardsData)
        .take(qty)
        .value();
};