import { firebase } from '@firebase/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import API_KEY from "./API_KEY";
import { userIdentification } from "./Services/index";

const DevConfig = () => {
    firebase.initializeApp(API_KEY.DEV);
    const db = firebase.firestore()
    db.enablePersistence()
}

const LiveConfig = () => {
    firebase.initializeApp(API_KEY.LIVE);
    //firebase.analytics();
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

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./serviceWorker.js');
        } catch (e) {
            console.log(`SW registration failed`);
        }
    }
}

const AuthCheck = () => {
    let initApp = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userIdentification(user)
            } else {
                AuthConfig()
            }
        }, function (error) {
            console.log(error);
        });
    };
    window.addEventListener('load', () => {
        initApp()
        //registerSW()
    });
}

const IS_LIVE = false

export default () => {
    if (IS_LIVE) {
        LiveConfig()
    } else {
        DevConfig()
    }
    AuthCheck()
}