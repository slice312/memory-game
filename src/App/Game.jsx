import {useEffect, useState, useRef, useDebugValue} from "react";
import {Button} from "@mui/material";
import {cardsData} from "./data";
import {ModalResult} from "./ModalResult";
import {Card} from "./Card";
import _ from "lodash";
import React from "react";
import "./styles.scss";
import {nanoid} from "nanoid";
// import {PlayerContext} from "../playerContext/context";


export const Game = () => {

    const [cards, setCards] = useState(getCards);

    const [openedCardIds, setOpenedCardIds] = useState([]);
    const [clearedCards, setClearedCards] = useState([]);

    const [showModal, setShowModal] = useState(false);





    const timeoutHandlerId = useRef(null);
    React.useEffect(() => {
        if (openedCardIds.length === 2) {
            const [firstCardId, secondCardId] = openedCardIds;
            const firstCard = cards.find(x => x.id === firstCardId);
            const secondCard = cards.find(x => x.id === secondCardId);

            if (firstCard.type === secondCard.type) {
                // debugger
                setTimeout(() => {
                    setOpenedCardIds([]);
                    setClearedCards(prev => [...prev, ...openedCardIds]);
                }, 700);
            } else {
                timeoutHandlerId.current = setTimeout(() => setOpenedCardIds([]), 3000);
            }
        }
    }, [openedCardIds]);


    React.useEffect(() => {
        if (1 === 3) {
            // TODO: уровень сложности какой-то
            const handler = setInterval(() => {
                setCards(prev => _.shuffle(prev));
            }, 5_000);
            return () => clearInterval(handler);
        }
    }, []);

    const handleCardClick = (card) => {
        if (openedCardIds.length === 2) {
            setOpenedCardIds([card.id]);
            clearTimeout(timeoutHandlerId.current);
        } else
            setOpenedCardIds(prev => [...prev, card.id]);
    };

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === cards.length) {
            setShowModal(true);
        }
    };


    useEffect(() => {
        checkCompletion();
    }, [clearedCards]);


    const handleRestart = () => {
        setClearedCards([]);
        setOpenedCardIds([]);
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
                                key={card.id}
                                card={card}
                                isInactive={clearedCards.includes(card.id)}
                                isFlipped={openedCardIds.includes(card.id)}
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


const getCards = () => {
    const card = cardsData[0];
    return [card ,card]
        .map((card, i) => ({...card, id: i}));

    return _.chain(cardsData.concat(cardsData))
        .drop(5)
        // .concat(cardsData)
        .map((card, i) => ({...card, id: i}))
        .value();
};
