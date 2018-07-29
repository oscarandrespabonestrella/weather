import { SET_COORDINATES  } from "../actions/actionTypes";


const initialState = {
    coordinates: [],
    stateSelected: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COORDINATES:
            return {
                ...state,
                coordinates : action.coordinates
            };
        default:
            return state;
    }
};

export default reducer;