//  firebase
import firebase from 'react-native-firebase';
import { platform } from "../../utils/config";

const FANALYTIC = firebase.analytics();

export const logSingleEvent = (eventName = null, userProperties = {}) => {
    try {
        if (eventName) {
            FANALYTIC.logEvent(eventName, userProperties);
        }
    } catch (error) {
        console.log("logSingleEvent error", error);
    }
};

export const logSingleScreen = (screenName = null) => {
    try {
        if (screenName) {
            //  Android: MainActivity
            //  iOS: UIViewController
            const screenClassName = platform === "Android" ? "MainActivity" : "UIViewController";
            FANALYTIC.setCurrentScreen(screenName, screenClassName);
        }
    } catch (error) {
        console.log("logSingleScreen error", error);
    }
};

export const setUserProperties = (name = null, value = null) => {
    try {
        if (name && value) {
            FANALYTIC.setUserProperty(name, value.toString())
        }
    } catch (error) {
        console.log("setUserProperties error", error);
    }
};