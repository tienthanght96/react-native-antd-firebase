
import React from 'react';
import { Animated, Platform, Text, StatusBar, View, Button,  ScrollView, SafeAreaView} from 'react-native';
import {
  createBottomTabNavigator,
  createTabNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { redColor, violetColor } from '../../utils/config';
import { widthPercent, isIpad } from '../../lib/dimensions';
import HomeIndex from '../home/components/HomeIndex';
import CategoryIndex from '../category/components/CategoryIndex';
import BookmarkArticles from '../user/components/BookmarkArticles';
import PersonalizeCategory from '../user/components/PersonalizeCategory';
import Profile from '../user/components/Profile';

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a hendrerit dui, id consectetur nulla. Curabitur mattis sapien nunc, quis dignissim eros venenatis sit amet. Praesent rutrum dapibus diam quis eleifend. Donec vulputate quis purus sed vulputate. Fusce ipsum felis, cursus at congue vel, consectetur tincidunt purus. Pellentesque et fringilla lorem. In at augue malesuada, sollicitudin ex ut, convallis elit. Curabitur metus nibh, consequat vel libero sit amet, iaculis congue nisl. Maecenas eleifend sodales sapien, fringilla sagittis nisi ornare volutpat. Integer tellus enim, volutpat vitae nisl et, dignissim pharetra leo. Sed sit amet efficitur sapien, at tristique sapien. Aenean dignissim semper sagittis. Nullam sit amet volutpat mi.
Curabitur auctor orci et justo molestie iaculis. Integer elementum tortor ac ipsum egestas pharetra. Etiam ultrices elementum pharetra. Maecenas lobortis ultrices risus dignissim luctus. Nunc malesuada cursus posuere. Vestibulum tristique lectus pretium pellentesque pellentesque. Nunc ac nisi lacus. Duis ultrices dui ac viverra ullamcorper. Morbi placerat laoreet lacus sit amet ullamcorper.
Nulla convallis pulvinar hendrerit. Nulla mattis sem et aliquam ultrices. Nam egestas magna leo, nec luctus turpis sollicitudin ac. Sed id leo luctus, lobortis tortor ut, rhoncus ex. Aliquam gravida enim ac dapibus ultricies. Vestibulum at interdum est, et vehicula nibh. Phasellus dignissim iaculis rhoncus. Vestibulum tempus leo lectus, quis euismod metus ullamcorper quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut id ipsum at enim eleifend porttitor id quis metus. Proin bibendum ornare iaculis. Duis elementum lacus vel cursus efficitur. Nunc eu tortor sed risus lacinia scelerisque.
Praesent lobortis elit sit amet mauris pulvinar, viverra condimentum massa pellentesque. Curabitur massa ex, dignissim eget neque at, fringilla consectetur justo. Cras sollicitudin vel ligula sed cursus. Aliquam porta sem hendrerit diam porta ultricies. Sed eu mi erat. Curabitur id justo vel tortor hendrerit vestibulum id eget est. Morbi eros magna, placerat id diam ut, varius sollicitudin mi. Curabitur pretium finibus accumsan.`;

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView navigation={navigation} style={{ flex: 1 }}>
    <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
    
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to home tab"
      />
      <Button
        onPress={() => navigation.navigate('Settings')}
        title="Go to settings tab"
      />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
      {TEXT.split('\n').map((p, n) => (
        <Text key={n} style={{ marginVertical: 10, marginHorizontal: 8 }}>
          {p}
        </Text>
      ))}
      <StatusBar barStyle="default" />
    </SafeAreaView>
  </ScrollView>
);

const MyListScreen = ({ navigation, data }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button
      title="Home"
      onPress={() => navigation.navigate('Login')}
    />
    <Text>Detail</Text>
  </View>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Tab" navigation={navigation} />
);

MyHomeScreen.navigationOptions = {
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
MyListScreen.navigationOptions = MyHomeScreen.navigationOptions;


class MyPeopleScreen extends React.Component {
 
  static navigationOptions = {
    tabBarLabel: 'Danh mục',
    tabBarIcon: ({ tintColor, focused, horizontal }) => (
      <Ionicons
        name={'ios-list' }
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  };
 
  render() {
    const { navigation } = this.props;
    return <MyNavScreen banner="People Tab" navigation={navigation} />;
  }
}


class MyChatScreen extends React.Component {


  static navigationOptions = {
    tabBarLabel: 'Đã lưu',
    tabBarIcon: ({ tintColor, focused, horizontal }) => (
      <Ionicons
        name={'ios-bookmark'}
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  };
 
  render() {
    const { navigation } = this.props;
    return <MyNavScreen banner="Chat Tab" navigation={navigation} />;
  }
}

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Tab" navigation={navigation} />
);

MySettingsScreen.navigationOptions = {
  tabBarLabel: 'Tài khoản',
  tabBarIcon: ({ tintColor, focused, horizontal }) => (
    <Ionicons
      name={'ios-person'}
      size={horizontal ? 20 : 26}
      style={{ color: tintColor }}
    />
  ),
};
const MyLoveScreen = ({ navigation }) => (
  <View><Text>Love</Text></View>
);

MyLoveScreen.navigationOptions = {
  showLabel: false,
  tabBarLabel: () => null,
  tabBarIcon: ({ tintColor, focused, horizontal }) => (
    <View
      style={{
        width: isIpad ? 80 : 40,
        height: isIpad ? 80 : 40,
        borderRadius: isIpad ? 40 : 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
      }}
    >
      <Ionicons
        name="ios-heart"
        size={isIpad ? 45 : 25}
        style={{ color: redColor }}
      />
    </View>
  ),
};

const SimpleTabs = createBottomTabNavigator(
  {
    Home: {
      // screen: MyListScreen,
      screen: HomeIndex,
      path: '',
      navigationOptions: {
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
      }
    },
    Category: {
      screen: CategoryIndex,
      path: '/category/:category_id',
      navigationOptions: {
        tabBarLabel: 'Danh mục',
        tabBarIcon: ({ tintColor, focused, horizontal }) => (
          <Ionicons
            name={'ios-list' }
            size={horizontal ? 20 : 26}
            style={{ color: tintColor }}
          />
        ),
      }
    },
    PersonalizeCategory: {
      screen: PersonalizeCategory,
      path: 'personalize',
      navigationOptions: {
      showLabel: false,
      tabBarLabel: () => null,
      tabBarIcon: ({ tintColor, focused, horizontal }) => (
        <View
          style={{
            width: isIpad ? 80 : 40,
            height: isIpad ? 80 : 40,
            borderRadius: isIpad ? 40 : 20,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 1
          }}
        >
          <Ionicons
            name="ios-heart"
            size={isIpad ? 45 : 25}
            style={{ color: redColor }}
          />
        </View>
      ),
      }
    },
    Bookmark: {
      screen: BookmarkArticles,
      path: 'bookmark',
      navigationOptions: {
        tabBarLabel: 'Đã lưu',
        headerTintColor: redColor,
        tabBarIcon: ({ tintColor, focused, horizontal }) => (
          <Ionicons
            name={'ios-bookmark' }
            size={horizontal ? 20 : 26}
            style={{ color: tintColor }}
          />
        ),
      }
    },
    Settings: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Tài khoản',
        tabBarIcon: ({ tintColor, focused, horizontal }) => (
          <Ionicons
            name={'ios-person'}
            size={horizontal ? 20 : 26}
            style={{ color: tintColor }}
          />
        ),
      },
      path: 'settings',
    },
   
  },
  {
    navigationOptions: ({ navigation }) => {
      const { state } = navigation;
      return {
        tabBarVisible: !(state && state.routeName === 'PersonalizeCategory'),
      }
    },
    swipeEnabled:true,
    animationEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      activeTintColor:  violetColor,
      inactiveTintColor: '#BDBDBD',
      iconStyle: {
        fontSize: isIpad ? 35 : 25
      },
      labelStyle: {
        fontSize: widthPercent(3),
      },
      style: {
        height: 60,
        paddingBottom: 5
      }
    },
  },
  
);

class SimpleTabsContainer extends React.Component {
  static router = SimpleTabs.router;
  _onAction = a => {
    console.log('TABS EVENT', a.type, a);
  };
  render() {
    return <SimpleTabs navigation={this.props.navigation} />;
  }
}

export default SimpleTabsContainer;