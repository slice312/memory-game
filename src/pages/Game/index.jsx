import {useEffect, useState, useRef} from "react";
import {cardsData} from "../../App/data";
import {ModalResult} from "../../App/ModalResult";
import {Card} from "../../App/Card";
import _ from "lodash";
import React from "react";
import "./styles.scss";
import {GameMode} from "src/shared/constants";
import {useLocation} from "react-router-dom";
import {value} from "lodash/seq";

import {CardsGridContainer} from "./CardsGridContainer";




export const Game = () => {
    const location = useLocation();
    console.log(location.state);

    const [cards, setCards] = useState(() => getCards(location.state.mode));

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

    let rows = 4;
    let columns = 4;

    if (location.state.mode === GameMode.Mode5x6) {
        rows = 5;
        columns = 6;
    }

    if (location.state.mode === GameMode.Mode6x6) {
        rows = 6;
        columns = 6;
    }

    return (
        <div className="App">
            <CardsGridContainer rows={rows} columns={columns}>
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
            </CardsGridContainer>

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


/**
 * @param {GameMode} mode
 */
const getCards = (mode) => {

    if (mode === GameMode.Mode4x4) {
        const uniqCards = _.chain(cardsData)
            .take(4)
            .value();

        return _.times(4, () => uniqCards.slice())
                .flat()
                .map((card, i) => ({id: i, ...card}));
    }

    if (mode === GameMode.Mode5x6) {
        const uniqCards = _.chain(cardsData)
            .take(8)
            .value();

        return _.chain(_.times(4, () => uniqCards.slice()))
            .flatten()
            .take(30)
            .value();
    }


    if (mode === GameMode.Mode6x6) {
        const uniqCards = _.chain(cardsData)
            .take(9)
            .value();


        return _.times(4, () => uniqCards.slice())
            .flat()
            .map((card, i) => ({id: i, ...card}));
    }

};