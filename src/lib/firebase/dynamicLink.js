//  firebase
import firebase from 'react-native-firebase';

const FLINK = firebase.links();

export const dynamicLinkListener = (callback) => {
    FLINK.getInitialLink()
        .then((url) => {
            console.log("url.....", url);
            if (url) {
                // app opened from a url
                callback(url);
            } else {
                // app NOT opened from a url
                callback(url);
            }
        });
};

export const listenDynamicLink = (callback) => {
    // subscribe
    return FLINK.onLink((url) => {
        console.log("listenDynamicLink.....", url);
        callback(url);
    });
}