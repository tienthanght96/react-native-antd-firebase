import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator, Modal, Provider } from "@ant-design/react-native";
import { redColor } from "../../../utils/config";

export const LogoutModal = () => {
  return (
    <Provider>
      <View style={{ paddingTop: 100 }}>
        <Modal
          title=""
          transparent
          // onClose={this.onClose}
          maskClosable={false}
          visible={true}
          closable={false}
          footer={null}
        >
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator
              size="large"
              text="Đang xử lý..."
              color={redColor}
            />
          </View>
        </Modal>
      </View>
    </Provider>
  );
};
