import {Action} from "./actions";

export const initialState = {
    cards: [],
    openedCardIds: [],
    clearedCardIds: []
};


export const reducer = (state, action) => {
    console.log(action.type);

    switch (action.type) {
        case Action.SetCards:
            return {...state, cards: action.payload};
        case Action.Reset: {
            return initialState;
        }
        case Action.OpenedCards: {
            const newState = {...state};

            if (state.openedCardIds.length === 2)
                newState.openedCardIds = [action.payload.cardId];
            else
                newState.openedCardIds = [...state.openedCardIds, action.payload.cardId];

            return newState;

        }
        case Action.MatchedCards: {
            return {
                ...state,
                clearedCardIds: [...state.clearedCardIds, ...state.openedCardIds],
                openedCardIds: []
            };
        }
        case Action.ClosedCards : {
            return {
                ...state,
                openedCardIds: []
            };
        }
        default:
            return state;
    }
};


