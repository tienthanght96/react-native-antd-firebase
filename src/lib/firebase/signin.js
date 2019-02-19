//  firebase
import firebase from "react-native-firebase";

export const listenAuthChange = callback => {
  return firebase.auth().onAuthStateChanged(user => {
    callback(user);
  });
};

export const anonymousLogin = () => {
  return firebase
    .auth()
    .signInAnonymously()
    .then(({ user }) => {
      return {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        metadata: user.metadata,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerData: user.providerData,
        refreshToken: null,
        uid: user.uid,
      };
    })
    .catch(function(error) {
      throw error;
    });
};

export const FacebookSignIn = accessToken => {
  // create a new firebase credential with the facebook access token
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

  // login with credential
  return firebase
    .auth()
    .signInWithCredential(credential)
    .then(({ user }) => {
      return {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        metadata: user.metadata,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerData: user.providerData,
        refreshToken: null,
        uid: user.uid,
      };
    })
    .catch(error => {
      throw error;
    });
};

export const SignOutFirebase = () => {
  return firebase
    .auth()
    .signOut()
    .then(function() {
      return true;
    })
    .catch(function(error) {
      console.log("firebase signout error", error);
      return false;
    });
};

export const linkToFacebookAccount = accessToken => {
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

  return firebase
    .auth()
    .currentUser.linkAndRetrieveDataWithCredential(credential)
    .then(
      function(user) {
        return user;
      },
      function(error) {
        console.log("Error upgrading anonymous account", error);
      }
    );
};
