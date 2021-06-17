import database from '@react-native-firebase/database';
import { SET_POST, ERROR_POST } from './action.types'



export const getPosts = () => async(dispatch) => {
    try {
        database()
            .ref('/posts/')
            .on('value', (snapshot) => {
                console.log('USER Data: ', snapshot.val())
                if (snapshot.val()) {
                    dispatch({
                        type: SET_POST,
                        payload: Object.values(snapshot.val())
                    })
                } else {
                    dispatch({
                        type: SET_POST,
                        payload: []
                    })
                }
            })
    } catch (err) {
        dispatch({
            type: ERROR_POST,

        })
    }
}


export const getPostsById = (id) => async(dispatch) => {
    try {
        database()
            .ref(`/posts/${id}`)
            .on('value', (snapshot) => {
                console.log('USER Data: ', snapshot.val())
                if (snapshot.val()) {
                    dispatch({
                        type: SET_POST,
                        payload: Object.values(snapshot.val())
                    })
                } else {
                    dispatch({
                        type: SET_POST,
                        payload: []
                    })
                }
            })
    } catch (err) {
        dispatch({
            type: ERROR_POST,

        })
    }
}