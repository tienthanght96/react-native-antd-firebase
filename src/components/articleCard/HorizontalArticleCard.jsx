import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import {  widthPercent } from "../../lib/dimensions";
import {
  assets, redColor,
  styleFlexRow, styleFlexRowSpaceBetween
} from "../../utils/config";
import { formatCommentReplyTime } from '../../utils/utils'
import BookMarkArticle from "../bookmarkArticle";
import TotalCommentArticle from "../totalComment";

class HorizontalArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onNavigateDetailArticle = () => {
    const { article } = this.props;
    if (!article || !article.id) return;
    this.props.navigation.navigate("ArticleDetail", { article_id: article.id });
  };

  onHandleBookmarkSuccess = () => {
    if (this.props.article && this.props.article.id) {
      typeof this.props.onHandleBookmarkSuccess === "function" &&
        this.props.onHandleBookmarkSuccess(this.props.article.id);
    }
  };

  render() {
    const { article } = this.props;
    const { category } = article;
    const isImageHttp = article.picture && article.picture.length >  5 && article.picture.includes('http');

    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={this.onNavigateDetailArticle}
        activeOpacity={1}
      >
        {/* left */}
        <View style={styles.leftArticle}>
          <Image
            style={
              article.picture
                ? styles.imageArticle
                : { height: widthPercent(25), width: "100%" }
            }
            source={isImageHttp ? { uri: article.picture } : assets.noImage}
          />
        </View>

        {/* right */}
        <View style={styles.rightArticle}>
          <View style={[styleFlexRow, styleFlexRowSpaceBetween]}>
            {category && category.name ? (
              <Text style={styles.articleCategory}>
                {category && category.name ? category.name : ""}
              </Text>
            ) : (
              <Text />
            )}
            <View style={[styles.timeArticle, styleFlexRow]}>
              <Icon
                type="ionicon"
                name="ios-time"
                size={18}
                iconStyle={{ marginRight: 5 }}
                color="#c3c3c3"
              />
              <Text style={styles.textNormal}>
                {formatCommentReplyTime(article.date / 1000 || -1)}
              </Text>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.titleText} numberOfLines={2}>
              {article.title || ""}
            </Text>
          </View>

          {/* footer */}
          <View
            style={[
              styles.footerArticle,
              styleFlexRow,
              styleFlexRowSpaceBetween
            ]}
          >
            {/* auth */}
            <View style={[styleFlexRow, styles.authArticle]}>
              {article.author ? (
                <React.Fragment>
                  <Icon
                    type="foundation"
                    name="pencil"
                    size={16}
                    color="#c3c3c3"
                    iconStyle={{ marginRight: 5 }}
                  />
                  <Text style={styles.authText}>{article.author || ""}</Text>
                </React.Fragment>
              ) : (
                <Text />
              )}
            </View>
          </View>
          {/* actions */}
          <View style={[styleFlexRow, styles.articleActions]}>
            {/* number read  */}
            <View style={[styleFlexRow, { marginRight: 5 }]}>
              <Icon
                type="ionicon"
                name="ios-person"
                size={18}
                color={"#c3c3c3"}
                iconStyle={{ marginRight: 5 }}
              />
              <Text style={styles.textNormal}>{article.view || 0}</Text>
            </View>
            {/* comment */}
            <TotalCommentArticle article_id={article.id} />
            {/*  bookmark */}
            <BookMarkArticle
              iconSize={18}
              iconColor="#c3c3c3"
              iconName="ios-bookmark"
              checkBookmark={article.checkBookmark}
              style={{ ...styleFlexRow, padding: 7 }}
              article_id={article.id}
              onHandleBookmarkSuccess={this.onHandleBookmarkSuccess}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    margin: widthPercent(1),
    backgroundColor: "#fff",
    borderRadius: 7,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 1.5,
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: '#ededed'
  },
  leftArticle: {
    flex: 4.5
  },
  imageArticle: {
    flex: 1,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
  },
  rightArticle: {
    flex: 7.5,
    margin: 10,
    backgroundColor: "#fff"
  },
  articleCategory: {
    borderRadius: 3,
    backgroundColor: redColor,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: widthPercent(3)
  },
  containerTitle: {
    // marginTop: 5,
    // marginBottom: 5
  },
  titleText: {
    color: "#333",
    fontSize: widthPercent(3.5),
    marginVertical: 5
    // textAlign: 'center',
    // fontWeight: '700',
  },
  authText: {
    color: "#c3c3c3",
    fontSize: widthPercent(3)
    // textAlign: 'center'
  },
  textNormal: {
    color: "#666",
    fontSize: widthPercent(3)
  },
  articleActions: {
    justifyContent: "flex-end"
  }
});

export default withNavigation(HorizontalArticleCard);
