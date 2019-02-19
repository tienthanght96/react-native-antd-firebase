import React from "react";
import { connect } from "react-redux";
import { StackNavigator, TabNavigator } from "react-navigation";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import AppMain from "../screens/main/AppMain";
// import Profile from "../screens/user/containers/Profile";
import LoginUser from "../screens/user/components/Login";
import { redColor } from "../utils/config";
import ArticleIndex from "../screens/article/components/ArticleIndex";
import WebviewContainer from "../screens/webview";
import FavoriteCategories from "../screens/favoriteCategories";
import ReadArticles from "../screens/user/components/ReadArticles";
import ArticleComments from "../screens/comments/components/ArticleComments";
import ArticleReplyComments from "../screens/comments/components/ArticleReplyComment";
import TagsIndex from "../screens/tags/components/TagsIndex";

const middlewareNavigation = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const RootNavigator = StackNavigator(
  {
    Main: {
      screen: AppMain,
      navigationOptions: () => ({
        header: null
      })
    },
    Login: {
      screen: LoginUser,
      navigationOptions: () => ({
        headerTintColor: redColor,
        headerTitle: "Đăng nhập"
      })
    },
    ArticleDetail: {
      screen:ArticleIndex,
      navigationOptions: () => ({
        headerTintColor: redColor,
        headerTitle: "Bài viết"
      }) 
    },
    FavoriteCategories: {
      screen: FavoriteCategories,
      navigationOptions: () => ({
        headerTintColor: redColor,
        headerTitle: "Danh mục yêu thích"
      }) 
    },
    ReadArticles: {
      screen: ReadArticles,
      navigationOptions: () => ({
        headerTintColor: redColor,
        headerTitle: "Tin đã xem"
      }) 
    },
    ListComment: {
      screen: ArticleComments,
      navigationOptions: () => ({
        headerTintColor: redColor,
        headerTitle: "Bình luận"
      }) 
    },
    ListReplyComment: {
      screen: ArticleReplyComments,
      navigationOptions: () => ({
        headerTintColor: redColor,
        headerTitle: "Phản hồi"
      }) 
    },
    Webview: {
      screen: WebviewContainer
    },
    Tags: {
      screen: TagsIndex,
      // navigationOptions: () => ({
      //   headerTintColor: redColor,
      //   headerTitle: "Tag"
      // }) 
    },
  },
  {
    mode: 'modal',
    // headerMode: 'none',
  }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {
  RootNavigator,
  AppNavigator,
  middlewareNavigation
};
