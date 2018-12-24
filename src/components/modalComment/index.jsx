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
import { getUnixTime, formatCurrentUnixTime } from "../../utils/utils";
import { saveDirectPath } from "../../lib/firebase/database";
import { userSelector, isLoginSelector } from "../../screens/user/userSelector";
import { CommentConsumer } from "../../context/CommentContext";

class ModalComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentValue: "",
      isSubmitting: false
    };
  }

  onRequestClose = () => {
    typeof this.props.onRequestClose === "function" &&
      this.props.onRequestClose();
  };

  onChangeInput = commentValue => {
    this.setState({ commentValue });
  };

  handleSubmitComment = async (handleAddComment, article_id) => {
    const { commentValue } = this.state;
    if (commentValue.length < 8) {
      return;
    }
    const { user } = this.props;
    if (!user || !user.id || user.isAnonymous || user.type !== 1) {
      return;
    }
    const currentUnixTime = getUnixTime();
    this.setState({ isSubmitting: true });
    const dataComment = {
      user_id: user.id,
      picture: user.picture || "",
      username: user.username || "",
      comment_content: commentValue,
      comment_id: `comment_${article_id}_${currentUnixTime}`,
      comment_date: currentUnixTime
    };
    typeof handleAddComment === 'function' && handleAddComment(article_id, dataComment, (status) => {
      if(status === 200){
        this.setState({ isSubmitting: false, commentValue: "" });
        typeof this.props.handleAddCommentSuccess === 'function' && this.props.handleAddCommentSuccess();
      } else {
        ToastAndroid.show("Chưa thể thêm bình luận ! Vui lòng thử lại", 1000);
        this.setState({ isSubmitting: false });
      }
      this.onRequestClose();
    })
  };

  render() {
    const { commentValue, isSubmitting } = this.state;
    const disabledButton = (!commentValue || commentValue.trim().length < 8 )
    return (
      <Modal
        visible
        animationType="fade"
        onRequestClose={this.onRequestClose}
        transparent
        >
        <CommentConsumer>
        { ({ handleAddComment, article_id }) => (
          <View style={styles.container}>
            <TouchableOpacity style={{flex: 1}} onPress={this.onRequestClose} />
            <View style={styles.modalContent}>
              <View style={[styleFlexRow, { alignItems: "center" }]}>
                <TextInput
                  value={commentValue}
                  onChangeText={this.onChangeInput}
                  editable={!isSubmitting}
                  style={styles.textInput}
                  placeholder="Nhập bình luận"
                  underlineColorAndroid="transparent"
                  multiline
                  autoFocus
                />
                <TouchableOpacity
                  style={[styles.buttonSubmit, styleFlexRow]}
                  onPress={() => this.handleSubmitComment(handleAddComment, article_id)}
                  disabled={disabledButton}
                >
                  <Icon
                    type="ionicon"
                    name="ios-paper-plane"
                    size={24}
                    color={disabledButton ? '#c3c3c3' : redColor}
                  />
                  <Text
                    style={{
                      color: disabledButton ? '#c3c3c3' : redColor,
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
                  Bình luận của bạn phải ít nhất 8 kí tự !
                </Text>
              </View>
            </View>
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

export default connect(mapStateToProps)(ModalComment);
