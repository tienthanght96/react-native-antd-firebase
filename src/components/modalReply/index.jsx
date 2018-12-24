import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from "react-native";
import { Icon } from "react-native-elements";
import { styleFlexRow, redColor } from "../../utils/config";
import { widthPercent } from "../../lib/dimensions";
import { getUnixTime } from "../../utils/utils";
import { userSelector, isLoginSelector } from "../../screens/user/userSelector";
import { ReplyConsumer } from "../../context/ReplyCommentContext";
import { CommentConsumer } from "../../context/CommentContext";

class ModalReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyValue: "",
      isSubmitting: false
    };
  }

  onRequestClose = () => {
    typeof this.props.onRequestClose === "function" &&
      this.props.onRequestClose();
  };

  onChangeInput = replyValue => {
    this.setState({ replyValue });
  };

  handleSubmitReply = async (handleAddReply, comment_id) => {
    const { replyValue } = this.state;
    if (replyValue.length < 8) {
      return;
    }
    const { user } = this.props;
    if (!user || !user.id || user.isAnonymous || user.type !== 1) {
      return;
    }
    const currentUnixTime = getUnixTime();
    this.setState({ isSubmitting: true });
    const dataReply = {
      user_id: user.id,
      picture: user.picture || "",
      username: user.username || "",
      reply_content: replyValue,
      reply_id: `reply_${comment_id}_${currentUnixTime}`,
      reply_date: currentUnixTime
    };
    console.log('dataReply', dataReply)
    typeof handleAddReply === "function" &&
      handleAddReply(dataReply, status => {
        if (status === 200) {
          console.log('handleReplySuccess', this.props.handleReplySuccess)
          typeof this.props.handleReplySuccess === 'function' && this.props.handleReplySuccess();
          this.setState({ isSubmitting: false, replyValue: "" });
        } else {
          ToastAndroid.show("Chưa thể thêm phản hồi ! Vui lòng thử lại", 1000);
          this.setState({ isSubmitting: false });
        }
        this.onRequestClose();
      });
  };

  render() {
    const { replyValue, isSubmitting } = this.state;
    const disabledButton = !replyValue || replyValue.trim().length < 8;
    return (
      <Modal
        visible
        animationType="fade"
        onRequestClose={this.onRequestClose}
        transparent
      >
        <CommentConsumer>
          {({ handleReplySuccess }) => (
            <View style={styles.container}>
              <ReplyConsumer>
                {({ handleAddReply, comment_id }) => (
                  <React.Fragment>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={this.onRequestClose}
                    />
                    <View style={styles.modalContent}>
                      <View style={[styleFlexRow, { alignItems: "center" }]}>
                        <TextInput
                          value={replyValue}
                          onChangeText={this.onChangeInput}
                          editable={!isSubmitting}
                          style={styles.textInput}
                          placeholder="Nhập phản hồi..."
                          underlineColorAndroid="transparent"
                          multiline
                          autoFocus
                        />
                        <TouchableOpacity
                          style={[styles.buttonSubmit, styleFlexRow]}
                          onPress={() =>
                            this.handleSubmitReply(handleAddReply, comment_id)
                          }
                          disabled={disabledButton}
                        >
                          <Icon
                            type="ionicon"
                            name="ios-paper-plane"
                            size={24}
                            color={disabledButton ? "#c3c3c3" : redColor}
                          />
                          <Text
                            style={{
                              color: disabledButton ? "#c3c3c3" : redColor,
                              marginLeft: 5,
                              fontSize: widthPercent(4.25)
                            }}
                          >
                            Gửi
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.bottomComment}>
                        <Text style={styles.subtitle}>
                          Phản hồi của bạn phải ít nhất 8 kí tự !
                        </Text>
                      </View>
                    </View>
                  </React.Fragment>
                )}
                
              </ReplyConsumer>
            </View>
          )}
        </CommentConsumer>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10
  },
  textInput: {
    flex: 1
  },
  buttonSubmit: {
    paddingHorizontal: 10,
    alignItems: "center",
    borderLeftColor: "#bbb",
    borderLeftWidth: 1
  },
  bottomComment: {
    borderTopColor: "#ddd",
    paddingHorizontal: 10
  },
  subtitle: {
    color: "#bbb",
    marginBottom: 10,
    fontSize: 13,
    textAlign: "right",
    fontStyle: "italic"
  }
});

const mapStateToProps = state => ({
  user: userSelector(state),
  isLoggedIn: isLoginSelector(state)
});

export default connect(mapStateToProps)(ModalReply);
