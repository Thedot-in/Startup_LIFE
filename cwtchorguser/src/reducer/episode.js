import { SET_EPISODE, ERROR_EPISODE } from '../action/action.types'

const initialState = {
    episode: null,
    loading: true,
    error: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EPISODE:
            return {
                ...state,
                episode: action.payload,
                loading: false,
                error: false
            }
        case ERROR_EPISODE:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}