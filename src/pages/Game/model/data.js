import _ from "lodash";
import {GameMode} from "src/shared/constants";
import {cardsData} from "src/shared/data";


/**
 * @param {GameMode} mode
 */
export const getCards = (mode) => {
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