import { combineReducers } from "redux";
import { NavigationActions } from "react-navigation";

import { rootReducer } from "./screens/root/rootReducer";
import { modalReducer } from "./screens/modal/modalReducer";
import { userReducer } from "./screens/user/userReducer";
import { categoryReducer } from "./screens/category/categoryReducer";
import { articleReducer } from "./screens/article/articleReducer";
import { homeReducer } from "./screens/home/homeReducer";

import { RootNavigator } from "./navigators/AppNavigator";

import { TOGGLE_ROUTE_PERSONALIZE, TOGGLE_ROUTE_LOGIN } from './screens/user/userActions';
import { tagsReducer } from "./screens/tags/tagsReducer";

const firstAction = RootNavigator.router.getActionForPathAndParams('Main');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
// const secondAction = RootNavigator.router.getActionForPathAndParams('PersonalizeCategory');
// const initialNavState = RootNavigator.router.getStateForAction(
//     secondAction,
//     tempNavState
// );

function nav(state = tempNavState, action) {
  let nextState;
  switch (action.type) {

     case TOGGLE_ROUTE_PERSONALIZE:
        console.log('here')
        nextState = RootNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'PersonalizeCategory' }),
            state
        );
        break;
     case TOGGLE_ROUTE_LOGIN:
        nextState = RootNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Login' }),
            state
        );
        break;

    case "Login":
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case "Logout":
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Login" }),
        state
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export const appReducer = combineReducers({
  nav,
  user: userReducer,
  modal: modalReducer,
  category: categoryReducer,
  root: rootReducer,
  article: articleReducer,
  home: homeReducer,
  tags: tagsReducer
});

