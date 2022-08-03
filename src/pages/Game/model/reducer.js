import {Action} from "./actions";


export const initialState = {
    cards: [],
    openedCardIds: [],
    clearedCardIds: []
};


export const reducer = (state, action) => {
    switch (action.type) {
        case Action.SetCards:
            return caseSetCards(state, action);
        case Action.Reset:
            return initialState;
        case Action.OpenedCards:
            return caseOpenedCards(state, action);
        case Action.MatchedCards:
            return caseMatchedCards(state, action);
        case Action.ClosedCards:
            return caseClosedCards(state, action);
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};


const caseSetCards = (state, action) => ({
    ...state, cards: action.payload.cards
});

const caseOpenedCards = (state, action) => {
    const newState = {...state};

    if (state.openedCardIds.length === 2)
        newState.openedCardIds = [action.payload.cardId];
    else
        newState.openedCardIds = [...state.openedCardIds, action.payload.cardId];

    return newState;
};

const caseMatchedCards = (state, action) => {
    return {
        ...state,
        clearedCardIds: [...state.clearedCardIds, ...state.openedCardIds],
        openedCardIds: []
    };
};

const caseClosedCards = (state, action) => ({
    ...state,
    openedCardIds: []
});

