import {cardsData} from "../../App/data";
import {ModalResult} from "../../App/ModalResult";
import {Card} from "../../App/Card";
import _ from "lodash";
import React from "react";
import "./styles.scss";
import {GameMode} from "src/shared/constants";
import {useLocation} from "react-router-dom";
import {value} from "lodash/seq";

import {PlayerContext} from "src/playerContext";
import {CardsGridContainer} from "./CardsGridContainer";
import {Button} from "@mui/material";

import {Stopwatch} from "./Stopwatch";


export const Game = () => {
    const location = useLocation();

    const playerContext = React.useContext(PlayerContext);

    const [cards, setCards] = React.useState(() => getCards(location.state.mode));

    const [openedCardIds, setOpenedCardIds] = React.useState([]);
    const [clearedCards, setClearedCards] = React.useState([]);

    const [showModal, setShowModal] = React.useState(false);

    const stopwatchRef = React.useRef();


    const timeoutHandlerId = React.useRef(null);
    React.useEffect(() => {
        if (openedCardIds.length === 2) {
            const [firstCardId, secondCardId] = openedCardIds;
            const firstCard = cards.find(x => x.id === firstCardId);
            const secondCard = cards.find(x => x.id === secondCardId);

            if (firstCard.type === secondCard.type) {
                setTimeout(() => {
                    setOpenedCardIds([]);
                    setClearedCards(prev => [...prev, ...openedCardIds]);
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
            setOpenedCardIds([card.id]);
            clearTimeout(timeoutHandlerId.current);
        } else
            setOpenedCardIds(prev => [...prev, card.id]);
    };

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === cards.length) {
            playerContext.stopGame();
            stopwatchRef.current.stop();
            setShowModal(true);
        }
    };


    React.useEffect(() => {
        checkCompletion();
    }, [clearedCards]);


    const handleRestart = () => {
        setClearedCards([]);
        setOpenedCardIds([]);
        setShowModal(false);
        setCards(() => getCards(location.state.mode));
        playerContext.resetGame();
        stopwatchRef.current.stop();
        stopwatchRef.current.reset();
    };

    let rows = 4;
    let columns = 4;

    if (location.state.mode === GameMode.Mode3x4) {
        rows = 3;
        columns = 4;
    }

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

            <footer>
                <div className="score">
                    <div className="moves">
                        <span className="bold">Moves:</span> {playerContext.moves}
                    </div>
                    <div>
                        <Stopwatch ref={stopwatchRef}/>
                    </div>
                </div>
                <div className="restart">
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
        // .shuffle() // TODO: вернуть
        .map((card, i) => ({id: i, ...card}))
        .value();
};


const getUniqueCards = (qty) => {
    return _.chain(cardsData)
        .take(qty)
        .value();
};