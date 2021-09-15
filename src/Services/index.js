import { firebase } from "@firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import { TABLE } from "./constants";
import { dispatch } from 'jeddy/jredux';
import { actions } from "../Reducers/RUser";
const { setUserInfo } = actions

export const fetchUserInfo = (user) => {
    const db = firebase.firestore()
    db.collection(TABLE.USERS).doc(user.uid).onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
            dispatch(setUserInfo({ ...data }))
        } else {
            dispatch(setUserInfo(user))
        }
    });
}

export const createUser = (user) => {
    const db = firebase.firestore()
    return db.collection(TABLE.USERS).doc(user.uid).set(user)
}

export const logOut = () => {
    try {
        firebase.auth().signOut()
            .then((_) => window.location.reload())
    } catch (e) { }
}