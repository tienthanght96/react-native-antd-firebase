// import {MyError} from "../api";
// //  firebase
// import firebase, {RemoteMessage} from 'react-native-firebase';
// import Api from "../api";
// import {cloudUri, platform} from "../../configParameters";
// import {store} from "../../../App";
// import {findAuth, updateAuth} from "../../storage/auth";
// import {UPDATE_NOTIFICATION_TOKEN} from "../../actionTypes";
// import {createNotification} from "../../storage/notification";
// import {FSTORE} from './database';

// export const FCM = firebase.messaging();
// export const FNOTI = firebase.notifications();

// export const requestPermission = (auth) => {

//     FCM.hasPermission()
//         .then(enabled => {
//             if (enabled) {
//                 // user has permissions
//                 return FCM.getToken().then(fcmToken => {
//                     // console.log("fcmToken......", fcmToken);
//                     if (fcmToken) {
//                         store.dispatch({
//                             type: UPDATE_NOTIFICATION_TOKEN,
//                             data: fcmToken
//                         });

//                         if (auth.notificationToken !== fcmToken && auth.accessToken && auth.accessToken !== "") {
//                             //  synchronize token with server
//                             saveNotificationTokenToServer(fcmToken).then(response => {
//                                 //  only save notification token to realm if save to server success
//                                 updateAuth({notificationToken: fcmToken});
//                             }).catch(err => {
//                                 console.log("save noti token error", err);
//                             });
//                         }

//                         return fcmToken
//                     }

//                     return "";
//                 }).catch(error => {
//                     //throw new MyError(error, error.message, error.code);
//                 });

//             } else {
//                 // user doesn't have permission
//                 return FCM.requestPermission();
//             }
//         }).catch(error => {
//     });
// };

// export const formatNotification = (payload) => {

//     const {title, body, data} = payload;

//     let result = {};
//     result["id"] = typeof data["id"] !== "undefined" ? data["id"] : (new Date().getTime()).toString();
//     result["title"] = title ? title : data["title"];
//     result["body"] = body ? body : data["body"];
//     result["link"] = data["deeplink"];
//     result["image"] = data["picture"];
//     result["isPopup"] = !!(typeof data["isPopup"] !== "undefined" && data["isPopup"]);

//     return result
// };

// export const saveNotificationTokenToServer = (token = null) => {
//     const globalState = store.getState().globalState;

//     if (token) {
//         return Api.post("tokens", {
//             "token": globalState.notificationToken,
//             "device": platform,
//             "provinceId": globalState.province
//         }).then(response => {
//             return response;
//         }).catch(error => {
//             throw new MyError(error, error.message, error.code);
//         });
//     }
// };

// export const increaseCounter = (notificationId = null, fieldName = null) => {

//     if (notificationId && fieldName) {
//         try {

//             return fetch(cloudUri + "increaseNotificationCounter?platform="+platform+"&notificationId=" + notificationId + "&fieldName=" + fieldName, {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 }
//             }).then((response) => response.json()).catch(error => {
//                 console.log("increase counter error");
//             });
//         } catch (error) {
//             console.log("get user data error", error);
//         }
//     }
// };

// export const createScheduleNotification = (payload = null, fireTime = null) => {

//     if (payload && fireTime) {
//         const notification = new firebase.notifications.Notification()
//             .setNotificationId(payload.id)
//             .setTitle(payload.title)
//             .setBody(payload.body)
//             .setData({
//                 id: payload.id,
//                 deeplink: payload.deeplink,
//                 picture: payload["picture"] ? payload["picture"] : "",
//                 isPopup: payload["isPopup"] ? payload["isPopup"] : true
//             })
//             .setSound('default')
//             .android.setSmallIcon('ic_stat_onesignal_default')
//             .android.setColor("#d32f2f")
//             .android.setChannelId('meete')
//             .android.setLocalOnly(true)
//             .android.setPriority(firebase.notifications.Android.Priority.Max);

//         if (typeof payload["picture"] !== "undefined") {
//             notification.android.setBigPicture(payload.picture);
//         }

//         FNOTI.scheduleNotification(notification, {
//             fireDate: fireTime  //  in miliseconds
//         })
//     }
// };

// //  background messaging, only for Android
// export const bgMessaging = async (message: RemoteMessage) => {
//     // console.log("bg message.......", message);
//     // handle your message
//     if (message) {
//         const {data, sentTime} = message;

//         //  lưu offline
//         createNotification({
//             id: typeof data["id"] !== "undefined" ? data["id"] : (new Date().getTime()).toString(),
//             title: data["title"],
//             body: data["body"],
//             deeplink: data["deeplink"],
//             picture: data["picture"],
//             isPopup: typeof data["isPopup"] !== "undefined" ? data["isPopup"] : true
//         });

//         //  show notification
//         createScheduleNotification({
//             id: typeof data["id"] !== "undefined" ? data["id"] : (new Date().getTime()).toString(),
//             title: data["title"],
//             body: data["body"],
//             deeplink: data["deeplink"],
//             picture: data["picture"]
//         }, new Date().getTime() + 2000);
//     }

//     return Promise.resolve();
// };