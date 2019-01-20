import React, { Component } from "react";
import {
  View, Text, TouchableOpacity,
  StyleSheet, ActivityIndicator,
  ScrollView, RefreshControl, ListView, SafeAreaView
} from "react-native";
import { isEmpty } from "lodash";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderSearch from "./HeaderSearch";
import NewestArticlesList from "./NewestArticlesList";
import { redColor } from "../../../utils/config";
import { withAppLoaded } from '../../../hocs/withAppLoaded';
import TabsTopCategory from "./TabsTopCategory";
import MostViewArticles from "./MostViewArticles";

class HomeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      articlesByCategory: null
    };
  }
 
  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            refreshing: false
          });
        }, 300);
      }
    );
  };

  getListFavoriteCategory = () => {
    const { categories, favorite_categories } = this.props;
    if (favorite_categories && !isEmpty(favorite_categories)) {
      return favorite_categories;
    }

    return categories || [];
  };

  render() {
    const { refreshing } = this.state;
    const { navigate } = this.props.navigation;
    const { isConnected, isLoggedIn } = this.props;

    const categories = this.getListFavoriteCategory();

    return (
      <ScrollView
        style={{ flex: 1, position: "relative", backgroundColor: "#fcfcfc" }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={redColor}
            onRefresh={this._onRefresh}
            refreshing={refreshing}
          />
        }
      >
        <SafeAreaView>
          <HeaderSearch
            refreshing={refreshing}
            isConnected={isConnected}
            navigate={navigate}
            isLoggedIn={isLoggedIn}
          />
          <NewestArticlesList
            refreshing={refreshing}
            navigate={navigate}
            isConnected={isConnected}
          />
          <MostViewArticles
            refreshing={refreshing}
            navigate={navigate}
            isConnected={isConnected}
          />
          <TabsTopCategory {...this.props} refreshing={refreshing}/>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

HomeIndex.navigationOptions = {
  tabBarTestIDProps: {
    testID: 'TEST_ID_HOME',
    accessibilityLabel: 'TEST_ID_HOME_ACLBL',
  },
  tabBarLabel: 'Trang chủ',
  tabBarIcon: ({ tintColor, focused, horizontal }) => (
      <Ionicons
        name={'ios-paper'}
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
  ),
};

export default withAppLoaded(HomeIndex);