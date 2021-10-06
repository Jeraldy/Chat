import { firebase } from '@firebase/app';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import API_KEY from "./API_KEY";
import { fetchUserInfo } from './Services/index';

const IS_LIVE = true

const DevConfig = () => {
    firebase.initializeApp(API_KEY.DEV);
    const db = firebase.firestore()
    db.enablePersistence()
}

async function saveMessagingDeviceToken() {
    try {
        const currentToken = await getToken(getMessaging());
        if (currentToken) {
            console.log('Got FCM device token:', currentToken);
        } else {
            requestNotificationsPermissions();
        }
    } catch (error) {
        console.error('Unable to get messaging token.', error);
    };
}

async function requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        await saveMessagingDeviceToken();
    } else {
        console.log('Unable to get permission to notify.');
    }
}

const LiveConfig = () => {
    firebase.initializeApp(API_KEY.LIVE);
    const db = firebase.firestore()
    db.enablePersistence()
}

const AuthConfig = () => {
    var uiConfig = {
        signInSuccessUrl: '#',
        signInOptions: [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                defaultCountry: 'TZ',
            },
        ],
        tosUrl: '#',
        privacyPolicyUrl: function () {
            window.location.assign('#');
        }
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#signIn', uiConfig);
}

const Authenticate = () => {
    let initApp = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //saveMessagingDeviceToken();
                const { uid, phoneNumber } = user
                fetchUserInfo({ uid, phoneNumber })
            } else {
                AuthConfig()
            }
        }, function (error) {
            console.log(error);
        });
    };
    window.addEventListener('load', () => initApp());
}

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./serviceWorker.js');
        } catch (e) {
            console.log(`SW registration failed`);
        }
    }
}

export default () => {
    if (IS_LIVE) {
        LiveConfig()
    } else {
        DevConfig()
    }
    Authenticate()
    registerSW()
}