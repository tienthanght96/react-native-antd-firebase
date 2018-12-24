import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Icon } from "react-native-elements";
import { widthPercent } from "../../lib/dimensions";
import { redColor, styleFlexRow } from "../../utils/config";
import ModalComment from "../modalComment";
import ButtonFormCommentContainer from "../buttonFormComment";
import { updateLoginState } from "../../screens/user/userActions";
import { userSelector } from "../../screens/user/userSelector";
import { articleDetailSelector, isPendingArticleDetailSelector } from "../../screens/article/articleSelector";
import { sleep } from "../../utils/utils";

class FormCommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    };
  }

  onToggleModalComment = async () => {
    const { user } = this.props;
    if (user && user.id && (user.type === 1 || !user.isAnonymous)) {
      this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
      return;
    }
    this.props.updateLoginState({ routeToBack: '/', title: 'Đăng nhập để bình luận !' });
    await sleep(200);
    this.props.navigation.navigate("Login");
  };

  onToggleModalActions = () => {
    typeof this.props.onToggleModalActions === "function" &&
      this.props.onToggleModalActions();
  };

  onSubmitCommentSuccess = dataComment => {
    typeof this.props.onSubmitCommentSuccess === "function" &&
      this.props.onSubmitCommentSuccess(dataComment);
    this.onToggleModalComment();
  };

  render() {
    const { article_id, isHideCommentButton, article, isPendingArticle } = this.props;
    const { isOpenModal } = this.state;
    if(isPendingArticle || !article || !article.id) return null;
    return (
      <View style={styles.wrapperHeader}>
        {isOpenModal && article_id && (
          <ModalComment
            {...this.props}
            onSubmitCommentSuccess={this.onSubmitCommentSuccess}
            onRequestClose={this.onToggleModalComment}
          />
        )}
        <TouchableOpacity style={styles.logo}>
          <Icon type="ionicon" name="ios-create" size={24} color="#bbb" />
        </TouchableOpacity>
        <View style={styles.containerButtonSearch}>
          <TouchableOpacity
            onPress={this.onToggleModalComment}
            style={styles.buttonSearch}
          >
            <Text style={styles.textSearch}>Nhập bình luận ...</Text>
          </TouchableOpacity>
        </View>
        <View style={[styleFlexRow, { alignItems: "center" }]}>
          {isHideCommentButton ? null : (
            <ButtonFormCommentContainer {...this.props} />
          )}
          <TouchableOpacity
            style={styles.action}
            onPress={this.onToggleModalActions}
          >
            <Icon type="ionicon" name="ios-share-alt" size={24} color="#bbb" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperHeader: {
    width: "100%",
    paddingHorizontal: 5,
    height: 50,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    height: "100%",
    paddingHorizontal: 10,
    justifyContent: "center"
  },
  action: {
    paddingHorizontal: 10,
    alignItems: "center"
  },
  containerButtonSearch: {
    flex: 1,
    height: "100%",
    justifyContent: "center"
  },
  buttonSearch: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderRadius: 4
  },
  textSearch: {
    color: "#bbb",
    marginLeft: 10,
    fontSize: widthPercent(4)
  }
});
const mapStateToProps = (state) => ({
  user: userSelector(state),
  article: articleDetailSelector(state),
  isPendingArticle: isPendingArticleDetailSelector(state)
})

const mapDispatchToProps = dispatch => ({
  updateLoginState: (data) => dispatch(updateLoginState(data)),
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FormCommentContainer));
