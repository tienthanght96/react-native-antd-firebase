import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Icon, ListItem } from "react-native-elements";
import { redColor } from "../../../utils/config";
import FacebookButtonLogin from "../../../components/facebookLogin";
import {
  removeDataLocalStorage,
  removeAllDataLocalStorage,
  storeDataToLocalStorage
} from "../../../utils/storage";
import { anonymousLogin, SignOutFirebase } from "../../../lib/firebase/signin";
import { formatInfoUserToSaveLocal, dataServerForAnonymousUser, sleep } from "../../../utils/utils";
import { userSelector } from "../userSelector";
import { userLogout, userLogin } from "../userActions";
import { appLoading, appLoaded } from "../../root/rootActions";
import { LogoutModal } from "./ModalLogout";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.listItemActions = [
      {
        name: "Thông tin tài khoản",
        id: 1,
        iconName: "ios-create",
        path: "DetailProfile"
      },
      {
        name: "Bài viết đã xem",
        id: 2,
        iconName: "ios-thumbs-up",
        path: "ReadArticles"
      },
      {
        name: "Danh mục yêu thích",
        id: 3,
        iconName: "ios-heart",
        path: "FavoriteCategories"
      },
      {
        name: "Bài viết đã lưu",
        id: 4,
        iconName: "ios-bookmarks",
        path: "Bookmark"
      }
    ];
    this.state = {
      isLogouting: false
    };
  }

  onNavigate = pathname => {
    this.props.navigation.navigate(pathname, {});
  };

  onPressLogout = async () => {
    try {
      await SignOutFirebase();
      await removeAllDataLocalStorage();
      await storeDataToLocalStorage('isFirstOpenApp', JSON.stringify({ isFirstOpenApp: true }));
      this.props.userLogout();
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
          callbackLoginSuccess: async () => {
            this.props.appLoading();
            this.setState({ isLogouting: false });
            // await sleep(200);
            this.props.navigation.navigate('Home');
          },
        };
        console.log('dataLogin', dataLogin);
        this.setState({ isLogouting: true });
       
        this.props.userLogin(dataLogin);
      }
    } catch (error) {
      this.props.appLoaded();
      this.setState({ isLogouting: false });
      console.log('error', error);
    }
  };

  render() {
    const { user } = this.props;
    const { isLogouting } = this.state;
    
    if(isLogouting){
      return <LogoutModal />;
    }

    if (user && (user.type === 1 || !user.isAnonymous)) {
      return (
        <ScrollView style={styles.container}>
         
          <View style={styles.headerProfile}>
            <View style={styles.topHeaderProfile}>
              <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={this.onPressLogout}>
                  <Icon
                    type="ionicon"
                    name="ios-log-in"
                    size={24}
                    color={redColor}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: user.picture || "https://via.placeholder.com/100x100"
                  }}
                  style={{ width: 50, height: 50 }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomHeaderProfile}>
            <Text style={styles.username}>
              {user.username ? user.username.toUpperCase() : ""}
            </Text>
            <View style={styles.listActions}>
              {this.listItemActions.map(action => {
                return (
                  <ListItem
                    onPress={() => this.onNavigate(action.path)}
                    key={action.id}
                    title={action.name}
                    leftIcon={
                      <View
                        style={{
                          marginRight: 10,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Icon
                          type="ionicon"
                          name={action.iconName}
                          size={24}
                          color={"#bbb"}
                        />
                      </View>
                    }
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      );
    }
    
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
       
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.welcome}>Bạn chưa đăng nhập !</Text>
        </View>
        <FacebookButtonLogin />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  headerProfile: {
    marginBottom: 10
  },
  topHeaderProfile: {},
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 5
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  bottomHeaderProfile: {},
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  listActions: {
    marginTop: 10
  }
});

ProfileScreen.navigationOptions = {
  title: "Profile"
};

const mapStateToProps = state => ({
  user: userSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
  userLogin: (dataLogin) => dispatch(userLogin(dataLogin)),
  appLoading: () => dispatch(appLoading()),
  appLoaded: () => dispatch(appLoaded()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
