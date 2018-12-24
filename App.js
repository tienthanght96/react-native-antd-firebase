import React from 'react';
import { BackHandler } from 'react-native';
import { Provider } from 'react-redux'
import firebase from 'react-native-firebase';
import { NavigationActions } from "react-navigation";
import { AppNavigator } from './src/navigators/AppNavigator';
import configureStore from './src/appStore';
import { fetchCategories, appLoaded, appLoading } from './src/screens/root/rootActions';
import { toggleRoutePersonalize } from './src/screens/personalize/personalizeActions';
import { storeDataToLocalStorage, retrieveDataLocalStorage, removeAllDataLocalStorage } from './src/utils/storage';
import { anonymousLogin } from './src/lib/firebase/signin';
import { userLogout, userLogin, userLoginSuccess } from './src/screens/user/userActions';
import { dataServerForAnonymousUser } from './src/utils/utils';
import { TOGGLE_ROUTE_PERSONALIZE } from './src/screens/personalize/actionTypes';

export const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
    };
  }
 
  async componentDidMount() {
    store.dispatch(fetchCategories());
    store.dispatch(appLoading());
    this.autoLogin();
    this.handleFirstOpenApp();
    BackHandler.addEventListener('hardwareBackPress', () => {
      const nav = store.getState().nav;
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'Login' || nav.routes[0].routeName === 'Start')) {
          return false;
      }
      store.dispatch({ type: 'Navigation/BACK' });
      return true;
    });
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  handleFirstOpenApp = async () => {
    try {
      const firstOpenApp = await retrieveDataLocalStorage('isFirstOpenApp');
      console.log('firstOpenApp', firstOpenApp)
      if(firstOpenApp && JSON.parse(firstOpenApp)){
        return;
      } else {
        store.dispatch(NavigationActions.navigate({
          routeName: "PersonalizeCategory",
          key:"PersonalizeCategory"
        }));
        await storeDataToLocalStorage('isFirstOpenApp', JSON.stringify({ isFirstOpenApp: true }));
      }
    } catch (error) {
      console.log('login error', error)
    }
  }

  autoLogin = async () => {
    try {
      const userLocal =  await retrieveDataLocalStorage('user');
      console.log('userLocal', userLocal)
      if(userLocal && JSON.parse(userLocal)) {
        const userParsed = JSON.parse(userLocal);
        this.userInStorerageLogin(userParsed);
        return;
      } else {
        this.anonymousUserLogin();
      }
    } catch (error) {
      console.log('error login', error)
      // this.anonymousUserLogin();
    }
  }

  userInStorerageLogin = (userLocal) => {
    setTimeout(() => {
      store.dispatch(userLoginSuccess(userLocal));
    }, 600);
  }

  anonymousUserLogin = async () => {
    try {
      await removeAllDataLocalStorage();
      await storeDataToLocalStorage('isFirstOpenApp', JSON.stringify({ isFirstOpenApp: true }));
      store.dispatch(userLogout());
      const firebaseUser = await anonymousLogin();
      console.log('anonymousUserLogin', firebaseUser, firebaseUser.uid);
      // return;
      if(firebaseUser && firebaseUser.uid){
        const paramsLogin = {
          email: dataServerForAnonymousUser.email,
          username: dataServerForAnonymousUser.username,
          picture: dataServerForAnonymousUser.picture,
          token: firebaseUser.uid,
          type: 2
        };
        const dataLogin = {
          paramsLogin,
          firebaseUser,
          authResponseFb: {},
          callbackLoginSuccess: this.handleFirstOpenApp,
        };
        console.log('dataLogin', dataLogin)
        store.dispatch(userLogin(dataLogin));
      }
    } catch (error) {
      // console.log('error', error);
    }
  }

  render() {
    return(
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}