import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { isIpad, widthPercent } from "../../lib/dimensions";
import { redColor } from "../../utils/config";
import BookMarkArticle from "../bookmarkArticle";
import TotalCommentArticle from "../totalComment";
import { formatCommentReplyTime } from "../../utils/utils";
import { assets } from '../../utils/config';

class NewestPopularCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onNavigateDetailArticle = () => {
    if (!this.props.article) return;
    this.props.navigation.navigate("ArticleDetail", {
      article_id: this.props.article.id
    });
  };

  render() {
    const { article } = this.props;
    const isImageHttp = article.picture && article.picture.length >  5 && article.picture.includes('http');

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.containerFluid}
        onPress={this.onNavigateDetailArticle}
      >
        <View style={styles.containerImage}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={isImageHttp ? { uri: article.picture } : assets.noImage}
          />
        </View>
        <View style={styles.bgBlur} />
        <View style={[{ flexDirection: "row" }, styles.dateTimeArticle]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 7,
              paddingVertical: 3,
              backgroundColor: redColor,
              marginVertical: 3
            }}
          >
            <Icon
              type="ionicon"
              name="ios-time"
              size={isIpad ? 35 : 18}
              color={"#fff"}
              iconStyle={{ marginRight: 5 }}
            />
            <Text style={{ color: "#fff", fontSize: widthPercent(3.25) }}>
              {formatCommentReplyTime(article.date / 1000) || ""}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.titleText}>
            {article.title}
          </Text>
          <View style={styles.containerLikeBookmark}>
            <TotalCommentArticle
              iconSize={isIpad ? 35 : 20}
              article_id={article.id}
              iconColor="#fff"
              textStyle={{
                color: "#fff",
                fontSize: widthPercent(3.2),
                marginLeft: 5
              }}
            />
            <BookMarkArticle
              iconSize={isIpad ? 35 : 20}
              iconColor="#fff"
              iconName="ios-bookmark"
              checkBookmark={article.checkBookmark}
              style={styles.bookmarkButton}
              article_id={article.id}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerFluid: {
    width: "100%",
    height: 150,
    position: "relative",
    overflow: "hidden"
  },
  containerImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  image: {
    // height: '100%',
    flex: 1
  },
  bgBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  content: {
    position: "absolute",
    top: 0,
    bottom: 5,
    left: 10,
    right: 10,
    zIndex: 3,
    overflow: "hidden",
    justifyContent: "flex-end"
  },
  titleText: {
    color: "#fff",
    fontSize: widthPercent(3.5),
    // textAlign: 'center',
    fontWeight: "700"
  },
  authText: {
    color: "#fff",
    fontSize: widthPercent(3.2),
    // backgroundColor: redColor,
    borderRadius: 3
    // textAlign: 'center'
  },
  containerDateCountView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textNormal: {
    color: "#666",
    fontSize: widthPercent(3.2)
  },
  containerLikeBookmark: {
    flexDirection: "row",
    alignItems: "center"
  },
  likeButton: {
    marginRight: 10
  },
  bookmarkButton: {
    // marginLeft: 10,
    padding: 5
  },
  dateTimeArticle: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 4
  }
});

export default withNavigation(NewestPopularCard);
