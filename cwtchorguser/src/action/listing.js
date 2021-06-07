import database from '@react-native-firebase/database';
import { SET_LISTING, ERROR_LISTING } from './action.types'

export const getListing = () => async(dispatch) => {

    try {
        database()
            .ref('/listing/')
            .on('value', (snapshot) => {
                console.log(snapshot.val())
                if (snapshot.val()) {
                    dispatch({
                        type: SET_LISTING,
                        payload: Object.values(snapshot.val())
                    })
                } else {
                    dispatch({
                        type: SET_LISTING,
                        payload: []
                    })
                }

            })
    } catch (err) {
        dispatch({
            type: ERROR_LISTING,

        })

    }
}

export const getListingById = (id) => async(dispatch) => {
    try {
        database()
            .ref(`/listing/${id}`)
            .on('value', (snapshot) => {
                console.log('USER Data: ', snapshot.val())
                if (snapshot.val()) {
                    dispatch({
                        type: SET_LISTING,
                        payload: Object.values(snapshot.val())
                    })
                } else {
                    dispatch({
                        type: SET_LISTING,
                        payload: []
                    })
                }
            })
    } catch (err) {
        dispatch({
            type: ERROR_LISTING,

        })
    }
}