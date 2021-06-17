import auth from '@react-native-firebase/auth';

import { firebase } from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '241154349997-4u5u97r7n9ov1bjk3plk95srmlc9svtk.apps.googleusercontent.com',
});

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
                text: "Signup failed ",
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


// Google

export const googleSignIn = () => async(dispatch) => {


    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("Yes", userInfo);

        const googleCredential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
        firebase.auth().signInWithCredential(googleCredential).then(user => {
            Snackbar.show({
                text: 'Signin success',
                textColor: 'white',
                backgroundColor: 'green'
            })

        }).catch(err => {
            console.log(err)
        })


    } catch (error) {
        console.log("Signin Error : ", error);

        Snackbar.show({
            text: 'Signin error',
            textColor: 'white',
            backgroundColor: 'red'
        })
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow


        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error);

            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error);

            // play services not available or outdated
        } else {
            // some other error happened
            console.log(error);

        }
    }
}

export const googleSignout = () => async(dispatch) => {
    console.log("Logout clicked")
    try {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        console.log("Yes");
        firebase.auth().signOut().then(
            Snackbar.show({
                text: 'Signout sucess',
                textColor: 'white',
                backgroundColor: 'green'
            })
        )

    } catch (error) {
        console.log(error)

    }
}