import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Share, TouchableOpacity, Linking, Modal, ToastAndroid
} from "react-native";
import { ShareDialog } from "react-native-fbsdk";
import { connect } from 'react-redux';
import {
  Button, WhiteSpace, Provider,
  Toast, Flex, ActivityIndicator,
  Modal as ModalAnt
} from '@ant-design/react-native';
import { Icon, ListItem } from "react-native-elements";
import { widthPercent, isIpad } from '../../../lib/dimensions';
import { redColor, styleFlexRow } from '../../../utils/config';
import { articleDetailSelector, isPendingArticleDetailSelector } from '../articleSelector';
import BookmarkArticle from '../../../components/bookmarkArticle';
import { userSelector } from '../../user/userSelector';
import { ArticleApi } from '../../../api/ApiService';

const constants = {
  BOOKMARK: "BOOKMARK",
  SHARE: "SHARE",
  VIEW_ARTICLE: "VIEW_ARTICLE",
  VIEW_FAVORIT_CATEGORY: "VIEW_FAVORIT_CATEGORY",
  REPORT_ARTICLE: "REPORT_ARTICLE",
  OPEN_BROWSER_LINK: "OPEN_BROWSER_LINK",
};


class ModalOtherAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHandlingAPI: false
    };
  }

  onRequestClose = () => {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose();
    }
  };

  _handleShareArticle = () => {
    const { articleDetail } = this.props;

    Share.share({
      // message: articleDetail.title,
      url: articleDetail.link,
      title: articleDetail.title
    });
  };

  _handleViewArticleWebView = () => {
    const { articleDetail, navigation } = this.props;
    if (articleDetail && navigation) {
      this.onRequestClose();

      setTimeout(() => {
        navigation.navigate("Webview", {
          title: articleDetail.title,
          url: articleDetail.link
        });
      }, 400);
    }
  };

  _handleViewFavoriteCategory = () => {
    const { articleDetail, navigation } = this.props;
    if (articleDetail && navigation) {
      this.onRequestClose();

      setTimeout(() => {
        navigation.navigate("FavoriteCategories");
      }, 400);
    }
  };
  
  _handleOpenInBrowser = () => {
		const { articleDetail } = this.props;
		Linking.canOpenURL(articleDetail.link).then(supported => {
			if (supported) {
				this.onRequestClose();

				setTimeout(() => {
					Linking.openURL(articleDetail.link);
				}, 400);
			} else {
					// console.log('Don\'t know how to open URI: ' + event.url);
          Toast.fail('Không hỗ trợ trình duyệt!');
			}
			return false
		});
  }
  
  shareLinkWithShareDialog = () => {
    const { articleDetail } = this.props;
    const shareLinkContent = {
      contentType: "link",
      contentUrl: articleDetail.link,
      contentDescription: articleDetail.title
    };

    this.onRequestClose();

    ShareDialog.canShow(shareLinkContent)
      .then(function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      })
      .then(
        function(result) {
          if (result.isCancelled) {
            // alert('Share cancelled');
            this.onRequestClose();
          } else {
            Toast.success('Chia sẻ qua facebook thành công');
            // alert('Share success with postId: ' + result.postId);
          }
        },
        function(error) {
          Toast.fail('Đã xảy ra lỗi. Vui lòng thử lại !');
        }
      );
  };

  onBookmark = async () => {
    const { articleDetail, user, onHandleBookmarkSuccess } = this.props;
		if(!articleDetail || !articleDetail.id || !user || !(+user.id) || user.isAnonymous){
      this.onRequestClose();
				// message.error("Bạn cần đăng nhập !");
        ToastAndroid.show( 'Bạn cần đăng nhập để lưu bài viết !', 1500);
				return;
		}
		this.setState({ isHandlingAPI: true });

		try {
			const response = await ArticleApi.bookmarkArticle(user.id, articleDetail.id);
			if(response){
				this.setState(prevState => ({ isBookmark: !prevState.isBookmark, isHandlingAPI: false }));
				typeof onHandleBookmarkSuccess === 'function' && onHandleBookmarkSuccess(articleDetail.id);
				return;
			}
			throw response;
		} catch (error) {
      this.setState({ isHandlingAPI: false });
      ToastAndroid.show( 'Đẫ có lỗi. Hãy thử lại !', 1500);
		}
  }

  onClickListItem = type => () => {
    switch (type) {
      case constants.BOOKMARK: {
        this.onBookmark();
        return;
      }
      case constants.SHARE: {
        // this._handleShareArticle();
        this.shareLinkWithShareDialog();
        return;
      }
      case constants.VIEW_ARTICLE: {
        this._handleViewArticleWebView();
        return;
      }
      case constants.VIEW_FAVORIT_CATEGORY: {
        this._handleViewFavoriteCategory();
        return;
      }
      case constants.VIEW_FAVORIT_CATEGORY: {
        this._handleViewFavoriteCategory();
        return;
      }
      case constants.OPEN_BROWSER_LINK: {
        this._handleOpenInBrowser();
        return;
      }
      default:
        break;
    }
  };

  renderLeftIcon = ({ iconType, iconName }) => {
    return (
      <View style={styles.leftIconContainer}>
        <Icon
          type={iconType || "ionicon"}
          name={iconName || "ios-bookmark"}
          size={isIpad ? 35 : 24}
          color="#fff"
        />
      </View>
    )
  }
  

  render() {
    const { isOpenModal, isPending, articleDetail } = this.props;
    const { isHandlingAPI } = this.state;
    if(isPending && isOpenModal) {
      return (
        <Provider>
          <Modal
            popup
            visible={isPending}
            animationType="slide"
            onClose={this.onRequestClose}
          >
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
              <WhiteSpace />
                <Flex align="center" justify="center">
                  <WhiteSpace />
                    <ActivityIndicator text="Đang tải dữ liệu.." color={redColor} size="large"/>
                  <WhiteSpace />
                </Flex>
              <WhiteSpace />
            </View>
          </Modal>
        </Provider>
      );
    }
    if(!articleDetail || !articleDetail.id) return null;

    return (
        <Modal
          visible={isOpenModal}
          animationType="slide"
          onRequestClose={this.onRequestClose}
          transparent
        >
           <View style={styles.container}>
            <Provider/>
            <TouchableOpacity style={{flex: 1}} onPress={this.onRequestClose} />
            <View style={styles.modalContent}>
              {/* <ListItem
                containerStyle={styles.containerListItemStyle}
                titleStyle={styles.titleListItemStyle}
                underlayColor="#333"
                title="Đánh dấu tin"
                onPress={this.onClickListItem(constants.BOOKMARK)}
                leftIcon={
                  isHandlingAPI
                  ?  <ActivityIndicator
                      color={redColor}
                      size={18}
                    />
                  : this.renderLeftIcon({
                      iconType: 'ionicon',
                      iconName: 'ios-bookmark'
                    })
                }
                hideChevron
              /> */}
              <ListItem
                containerStyle={styles.containerListItemStyle}
                titleStyle={styles.titleListItemStyle}
                title="Chia sẻ qua Facebook"
                underlayColor="#333"
                onPress={this.onClickListItem(constants.SHARE)}
                leftIcon={this.renderLeftIcon({
                  iconType: 'ionicon',
                  iconName: 'ios-share-alt'
                })}
                hideChevron
              />
              <ListItem
                containerStyle={styles.containerListItemStyle}
                titleStyle={styles.titleListItemStyle}
                title="Danh mục yêu thích"
                underlayColor="#333"
                onPress={this.onClickListItem(constants.VIEW_FAVORIT_CATEGORY)}
                leftIcon={this.renderLeftIcon({
                  iconType: 'ionicon',
                  iconName: 'ios-heart'
                })}
                hideChevron
              />
              <ListItem
                containerStyle={styles.containerListItemStyle}
                titleStyle={styles.titleListItemStyle}
                title="Xem bài viết gốc"
                underlayColor="#333"
                onPress={this.onClickListItem(constants.VIEW_ARTICLE)}
                leftIcon={this.renderLeftIcon({
                  iconType: 'ionicon',
                  iconName: 'ios-link'
                })}
                hideChevron
              />
              <ListItem
                // containerStyle={styles.containerListItemStyle}
                titleStyle={[styles.titleListItemStyle]}
                title="Xem trên trình duyệt"
                underlayColor="#333"
                onPress={this.onClickListItem(constants.OPEN_BROWSER_LINK)}
                leftIcon={this.renderLeftIcon({
                  iconType: 'ionicon',
                  iconName: 'ios-globe'
                })}
                hideChevron
              />
              <ListItem
                title="Đóng"
                underlayColor="#333"
                containerStyle={{
                  borderBottomColor: "transparent",
                  paddingVertical: 10
                }}
                titleStyle={{
                  color: redColor,
                  fontSize: widthPercent(4),
                  textAlign: "center",
                  fontWeight: "bold"
                }}
                titleContainerStyle={{ width: "100%" }}
                onPress={this.onRequestClose}
                hideChevron
              />
            </View>
          </View>
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
    backgroundColor: "#333"
  },
  containerListItemStyle: {
    borderBottomColor: "transparent",
    backgroundColor: "#333"
  },
  titleListItemStyle: {
    color: "#fff",
    fontSize: widthPercent(4.25)
  },
  leftIconContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = (state) => ({
  articleDetail: articleDetailSelector(state),
  isPending: isPendingArticleDetailSelector(state),
  user: userSelector(state)
});

export default connect(mapStateToProps)(ModalOtherAction);