import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation'
import { Modal, Provider, Toast } from "@ant-design/react-native";
import { TouchableOpacity, ActivityIndicator, ToastAndroid } from "react-native";
import { redColor } from "../../utils/config";
import { Icon } from "react-native-elements";
import { userSelector } from "../../screens/user/userSelector";
import { ArticleApi } from "../../api/ApiService";
import { updateLoginState } from "../../screens/user/userActions";
import { sleep } from "../../utils/utils";
// import { bookmarkArticle } from "./Actions";

class BookMarkArticle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHandleAPI: false,
      isBookmark: false
    };
  }

  componentDidMount() {
    this._handleInitBookmarkStatus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checkBookmark !== this.props.checkBookmark) {
      this._handleInitBookmarkStatus();
    }
  }

  _handleInitBookmarkStatus = () => {
    const { checkBookmark } = this.props;
    if (typeof checkBookmark === "boolean") {
      this.setState({ isBookmark: checkBookmark });
      return;
    }
  };
  handleClickBookmark =  async () => {

		const { article_id, user, onHandleBookmarkSuccess } = this.props;
		
		if(!article_id ||!user || !(+user.id) || user.isAnonymous){
        this.props.updateLoginState({ routeToBack: '/', title: 'Đăng nhập để lưu bài viết !' });
        await sleep(200);
        this.props.navigation.navigate("Login");
				return;
		}
		this.setState({ isHandleAPI: true });

		try {
			const response = await ArticleApi.bookmarkArticle(user.id, article_id);
			if(response){
				this.setState(prevState => ({ isBookmark: !prevState.isBookmark, isHandleAPI: false }));
				typeof onHandleBookmarkSuccess === 'function' && onHandleBookmarkSuccess(article_id);
				return;
			}
			throw response;
		} catch (error) {
      this.setState({ isHandleAPI: false });
      Modal.alert('Thông báo', 'Đẫ có lỗi. Hãy thử lại !', [
        { text: 'Đóng', onPress: () => {}},
      ]);
		}
	}
    
  render() {
    const { isBookmark, isHandleAPI } = this.state;
    const { style, iconSize, iconColor, iconName, colorLoading, user } = this.props;
    // if(!user || !user.id || user.isAnonymous) return null;
    return (
      <React.Fragment>
        <Provider>
          <TouchableOpacity
            onPress={this.handleClickBookmark}
            style={[style ? style : {}]}
            disabled={isHandleAPI}
          >
            {isHandleAPI ? (
              <ActivityIndicator
                color={colorLoading || redColor}
                size={iconSize || 18}
              />
            ) : (
              <Icon
                type="ionicon"
                name={iconName || "ios-bookmark"}
                size={iconSize || 18}
                color={isBookmark ? redColor : iconColor || "#c3c3c3"}
              />
            )}
          </TouchableOpacity>
        </Provider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state)
});
const mapDispatchToProps = dispatch => ({
  updateLoginState: (data) => dispatch(updateLoginState(data)),
})
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(BookMarkArticle));
