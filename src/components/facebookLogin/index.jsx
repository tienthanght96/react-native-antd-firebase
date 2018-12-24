import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'
import { Icon } from "react-native-elements";
import { getAccessToken, loginFacebook } from "../../lib/facebook";
import { isIpad, widthPercent } from "../../lib/dimensions";
import { FacebookSignIn } from "../../lib/firebase/signin";
import { userLogin } from "../../screens/user/userActions";
import { toggleModalOverflow } from "../../screens/modal/modalActions";


class FacebookButtonLogin extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };
  }

  // handle event
  _onPress = () => {
    const { callbackSuccess, callbackCancel } = this.props;
    this.props.toggleModal({ isOpenModal: true, dataModal: {} });
    loginFacebook(
      result => {
        getAccessToken().then(authResponseFb => {
          const longLiveToken = authResponseFb.accessToken.toString();

          //  add facebook login to firebase
          FacebookSignIn(longLiveToken)
            .then(async firebaseUser => {
              console.log('userFirebase.uid =>', firebaseUser, authResponseFb);
              const { email, displayName, photoURL, uid } = firebaseUser;
              const paramsLogin = {
                email,
                username: displayName,
                picture: photoURL,
                token: uid || authResponse.userID,
                type: 1
              };
              const dataLogin = {
                paramsLogin,
                firebaseUser,
                authResponseFb,
                callbackLoginSuccess: this.props.callbackLoginSuccess || null,
              };
              console.log('dataLogin', dataLogin);
              this.props.userLogin(dataLogin);
            })
            .catch(error => {
              console.log("error fb", error);
              this.props.toggleModal({ isOpenModal: false, dataModal: {} });
            });

        });
      },
      cancelResult => {
        if (callbackCancel) {
          typeof callbackSuccess === 'function' && callbackCancel();
        }

        this.props.toggleModal({ isOpenModal: false, dataModal: {} });
      },
      function(error) {
        Alert.alert("Lỗi đăng nhập", error.message);
        this.props.toggleModal({ isOpenModal: false, dataModal: {} });
      }
    );

  }

  render() {
    const { label } = this.props;

    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={styles.container}
      >
        <Icon type="feather" name="facebook" size={25} color="#fff" />
          <Text style={styles.text}>
            {label ? label : "Tiếp tục với Facebook"}
          </Text>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	userLogin: (data) => dispatch(userLogin(data)),
	toggleModal: ({ isOpenModal, dataModal }) => dispatch(toggleModalOverflow({ isOpenModal, dataModal }))
});
export default connect(null, mapDispatchToProps)(FacebookButtonLogin);

const styles = StyleSheet.create({
  container: {
    height:
      (Platform.OS === "ios")
      ? isIpad
        ? 80
        : widthPercent(14)
      : widthPercent(12),
    width: widthPercent(70),
    backgroundColor: "#3B5998",
    borderRadius: widthPercent(7),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loading: {
    marginLeft: 15
  },
  text: {
    fontSize: widthPercent(4),
    color: "#ffffff",
    textAlign: "center",
    paddingLeft: 15,
    fontWeight: "bold"
  }
});
