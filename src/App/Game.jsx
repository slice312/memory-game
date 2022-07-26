import {useEffect, useState, useRef, useDebugValue} from "react";
import {Button} from "@mui/material";
import {cardsData} from "./data";
import {ModalResult} from "./ModalResult";
import {Card} from "./Card";
import _ from "lodash";
import React from "react";
import "./styles.scss";
import {PlayerContext} from "./playerContext/context";

const getCards = () => {
    return _.chain(cardsData.concat(cardsData))
        .drop(0)
        .value();
};

export const Game = () => {

    const [cards, setCards] = useState(getCards);

    const [openedCards, setOpenedCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});

    const [showModal, setShowModal] = useState(false);


    // const checkCompletion = () => {
    //     if (Object.keys(clearedCards).length === cardsData.length) {
    //         setShowModal(true);
    //     }
    // };

    // const evaluate = () => {
    //     const [first, second] = openedCards;
    //     if (cards[first].type === cards[second].type) {
    //         setClearedCards((prev) => ({...prev, [cards[first].type]: true}));
    //         setOpenedCards([]);
    //         return;
    //     }
    //     // This is to flip the cards back after 500ms duration
    //     timeout.current = setTimeout(() => {
    //         setOpenedCards([]);
    //     }, 2500);
    //
    // };

    const timeoutHandlerId = useRef(null);

    const handleCardClick = (index) => {
        if (openedCards.length === 2) {
            setOpenedCards([index]);
            clearTimeout(timeoutHandlerId.current);
        } else {
            setOpenedCards((prev) => [...prev, index]);
        }
    };

    React.useEffect(() => {
        if (openedCards.length === 2) {
            timeoutHandlerId.current = setTimeout(() => setOpenedCards([]), 2500);
        }
    }, [openedCards]);

    // React.useEffect(() => {
    //     let timeout = null;
    //     if (openedCards.length === 2) {
    //         timeout = setTimeout(evaluate, 300);
    //     }
    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, [openedCards]);

    // useEffect(() => {
    //     checkCompletion();
    // }, [clearedCards]);


    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    };

    const handleRestart = () => {
        setClearedCards({});
        setOpenedCards([]);
        setShowModal(false);
        setCards(getCards);
    };

    return (
        <div className="App">
            {/*<header>*/}
            {/*    <h3>Play the Flip card game</h3>*/}
            {/*    <div>*/}
            {/*        Select two cards with same content consequtively to make them vanish*/}
            {/*    </div>*/}
            {/*</header>*/}

            <div className="container">
                {
                    cards.map((card, i) => {
                        return (
                            <Card
                                key={i}
                                card={card}
                                index={i}
                                isInactive={checkIsInactive(card)}
                                isFlipped={openedCards.includes(i)}
                                onClick={handleCardClick}
                            />
                        );
                    })
                }
            </div>

            {/*<footer>*/}
            {/*    <div className="score">*/}
            {/*        <div className="moves">*/}
            {/*            <span className="bold">Moves:</span> {moves}*/}
            {/*        </div>*/}
            {/*        {localStorage.getItem("bestScore") && (*/}
            {/*            <div className="high-score">*/}
            {/*                <span className="bold">Best Score:</span> {bestScore}*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*    <div className="restart">*/}
            {/*        <Button onClick={handleRestart} color="primary" variant="contained">*/}
            {/*            Restart*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</footer>*/}

            <ModalResult
                showModal={showModal}
                onRestart={handleRestart}
            />
        </div>
    );
};


