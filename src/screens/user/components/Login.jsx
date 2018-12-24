import React, { Component } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";

import { widthPercent } from "../../../lib/dimensions";
import { redColor } from "../../../utils/config";
import FacebookButtonLogin from "../../../components/facebookLogin";
import { userSelector, loginStateSelector } from "../userSelector";
import { updateLoginState } from "../userActions";
import { sleep } from "../../../utils/utils";

class LoginContainer extends Component {
  _closeModal = async () => {
      this.props.updateLoginState({ routeToBack: '/', title: '' });
      await sleep(250);
      this.props.navigation.goBack();
  };

  render() {
    const { title } = this.props.loginState;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.headerModal}>
              <Text style={styles.titleModal}>
                {title || 'Đăng nhập ngay !'}
                
              </Text>
            </View>
            <FacebookButtonLogin callbackLoginSuccess={this._closeModal} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerModal: {
    paddingRight: 20,
    marginTop: 30
  },
  titleModal: {
    fontSize: widthPercent(5),
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15
  },
  subtitleModal: {
    textAlign: "center"
  },
  listCategory: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%"
  },
  categoryItem: {
    // flex: 0.33,
    width: "33.33%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  categoryItemText: {
    textAlign: "center",
    fontSize: widthPercent(4.25),
    color: "#333"
  },
  buttonSave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: redColor,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    loginState: loginStateSelector(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateLoginState: (data) => dispatch(updateLoginState(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
