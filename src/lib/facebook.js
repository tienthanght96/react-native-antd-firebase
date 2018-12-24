import FBSDK from 'react-native-fbsdk';
// import {MyError} from "./api";
// import {LOGOUT} from "../actionTypes";
// import {store} from "../../App";
// import {resetAuth, updateAuth} from "../storage/auth";
import {
  Linking
} from 'react-native';
const {
  LoginManager,
  AccessToken,
  GraphRequest
} = FBSDK;
// import RNAccountKit, {Color, StatusBarStyle} from 'react-native-facebook-account-kit';
// import { SignOutFirebase} from "./firebase/signin";


//  login with Facebook
export function loginFacebook(success, cancel) {
  LoginManager.logOut();

  LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
    function (result) {
      if (result.isCancelled) {
        //  If canceled
        if (cancel) {
          cancel(result);
        }
      } else {
        //  if success
        if (success) {
          success(result)
        }
      }
    },
    function (e) {
      //  if error
     console.log('error', e)
    }
  );
}

export function logout() {
  LoginManager.logOut(); //  logout Facebook
}

//  Facebook access token
export function getAccessToken() {
  return AccessToken.getCurrentAccessToken();
}
