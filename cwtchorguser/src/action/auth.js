import auth from '@react-native-firebase/auth';

import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';


export const signUp = (data) => async(dispatch) => {
    console.log(data)
    const { name, instaUserName, bio, email, password, country, image } = data;

    auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data);
            console.log('User account created & signed in!');

            database()
                .ref('/users/' + data.user.uid)
                .set({
                    name,
                    instaUserName,
                    bio,
                    country,
                    image,
                    uid: data.user.uid

                })
                .then(() => {
                    console.log('Data set success')
                    Snackbar.show({
                        text: 'Account created',
                        textColor: 'white',
                        backgroundColor: "green"
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            Snackbar.show({
                text: "Signup failed",
                textColor: 'white',
                backgroundColor: 'red'

            })
        })
}

export const signIn = (data) => async(dispatch) => {
    console.log(data)
    const { email, password } = data;
    auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log('SignIn sucess');
            Snackbar.show({
                text: 'SignIn sucessful',
                textColor: 'white',
                backgroundColor: 'green'
            })
        })
        .catch((err) => {
            console.error(err)
            Snackbar.show({
                text: 'SignIn failed',
                textColor: 'white',
                backgroundColor: 'red'
            })
        })
}

export const signOut = () => async(dispatch) => {
    auth()
        .signOut()
        .then((data) => {

            console.log('User signed out!')
            Snackbar.show({
                text: 'Signout sucess',
                textColor: 'white',
                backgroundColor: 'green'
            })
        })
        .catch((err) => {
            Snackbar.show({
                text: 'Signout failed',
                textColor: 'white',
                backgroundColor: 'red'
            })
        })
}