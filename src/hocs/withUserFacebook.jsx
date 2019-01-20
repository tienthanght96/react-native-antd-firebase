import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { View, Text } from "react-native";
import { Card, NoticeBar, Icon, Modal, ActivityIndicator, Provider } from "@ant-design/react-native";
import { connect } from "react-redux";
import { userSelector } from "../screens/user/userSelector";
import { modalOverflowSelector } from "../screens/modal/modalSelector";
import { redColor } from "../utils/config";
import { widthPercent } from "../lib/dimensions";
import FacebookLoginButton from "../components/facebookLogin";

export const withUserFacebook = (ComposedComp, styleWrapper) => {
  class WithUserFaceBookWrapper extends React.Component {
    render() {
      const { user, modalOverflow } = this.props;

      if (user && !user.isAnonymous) {
        return <ComposedComp {...this.props} />;
      }

      return (
        <View style={styleWrapper || {}}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor: "#fff",
              padding: 10
            }}
          >
          
            <View style={{ marginVertical: 10 }}>
              <Text style={{
                 fontSize: 20,
                 textAlign: "center",
                 margin: 10
              }}>
                Bạn chưa đăng nhập !
              </Text>
            </View>
            <FacebookLoginButton />
          </View>
          {/* <Provider>
            <View>
              <Modal
                title="Đang thực hiện"
                transparent
                maskClosable={false}
                visible={modalOverflow.isOpenModal}
                closable={false}
                footer={null}
              >
                <View style={{ paddingVertical: 20 }}>
                  <ActivityIndicator
                    size="large"
                    text="Vui lòng đợi trong giây lát !."
                    color={redColor}
                  />
                </View>
              </Modal>
            </View>
          </Provider> */}
        </View>
      );
    }
  }
  const mapStateToProps = state => ({
    user: userSelector(state),
    modalOverflow: modalOverflowSelector(state)
  });
  return withNavigation(connect(mapStateToProps)(WithUserFaceBookWrapper));
};
