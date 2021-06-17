import { SET_LISTING, ERROR_LISTING } from '../action/action.types'

const initialState = {
    listing: null,
    loading: true,
    error: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTING:
            return {
                ...state,
                listing: action.payload,
                loading: false,
                error: false
            }
        case ERROR_LISTING:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}