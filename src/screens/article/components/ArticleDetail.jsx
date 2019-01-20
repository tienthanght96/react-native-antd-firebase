import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { ActivityIndicator, Flex, Badge, WhiteSpace } from "@ant-design/react-native";
import { isEmpty } from 'lodash';
import { fetchArticle } from "../articleActions";
import { ArticleApi } from "../../../api/ApiService";
import { articleDetailSelector, isPendingArticleDetailSelector } from "../articleSelector";
import { widthPercent, height } from '../../../lib/dimensions';
import { redColor, styleFlexRow } from '../../../utils/config';
import { formatCommentReplyTime } from '../../../utils/utils';
import BodyContentArticle from './BodyContentArticle';
import EmptyList from '../../../components/emptyList';
import BookmarkArticle from '../../../components/bookmarkArticle';

class ArticleDetail extends Component {

  componentDidMount(){
    const { article_id } = this.props;
    this.props.getDetailArticle(article_id)
    this.updateView();
  }

  componentDidUpdate(prevProps) {
    if(
      (this.props.article_id && (prevProps.article_id !== this.props.article_id)) ||
      (this.props.refreshing && (prevProps.refreshing !== this.props.refreshing))
    ){
      this.props.getDetailArticle(this.props.article_id)
    }
  }

  updateView = async () => {
    const { article_id } = this.props;
    if (article_id) {
      try {
       await ArticleApi.updateViewArticle(article_id);
      } catch (error) {
        console.log("error update", error);
      }
    }
  }

  render() {
    const { isPending, articleDetail } = this.props;
    if(isPending) {
      return (
        <View style={{flex: 1, height, backgroundColor: '#fff'}}>
          <WhiteSpace />
            <Flex align="center" justify="center">
              <WhiteSpace />
                <ActivityIndicator text="Đang tải dữ liệu.." color={redColor} size="large"/>
              <WhiteSpace />
            </Flex>
          <WhiteSpace />
        </View>
      );
    }
    
    if(isEmpty(articleDetail)){
      return (
        <View style={{flex: 1, height, backgroundColor: '#fff'}}>
          <WhiteSpace />
            <EmptyList />
          <WhiteSpace />
        </View>
      );
    }

    return (
      <View style={styles.articleDetail}>
        <WhiteSpace />
        <View>
          <Text style={styles.titleArticle}>{articleDetail.title || ''}</Text>
        </View>
        <WhiteSpace />
        <View>
          <Text style={styles.sapoArticle}>{articleDetail.sapo || ''}</Text>
        </View>
        <View>
          <Flex style={styles.metaArticle}>
            <Text style={styles.articleSource}>
              {"Theo: " + articleDetail.megazine}
            </Text>
            <View style={{...styleFlexRow}}>
              <Icon
                type="ionicon"
                name="ios-alarm"
                size={20}
                color="#c3c3c3"
                iconStyle={{marginRight: 5}}
              />
              <Text style={[styles.textCommon]}>
                {formatCommentReplyTime(articleDetail.date / 1000)}
              </Text>
            </View>
            <BookmarkArticle
              iconSize={20}
              iconColor="#c3c3c3"
              iconName="ios-bookmark"
              checkBookmark={articleDetail.bookmarked}
              style={{ ...styleFlexRow, padding: 7 }}
              article_id={articleDetail.id}
              // onHandleBookmarkSuccess={this.onHandleBookmarkSuccess}
            />
          </Flex>
        </View>
        <View>
          <BodyContentArticle
            imagesArticle={articleDetail.pictures}
            bodyHtml={articleDetail.content || ''}
          />
        </View>
        <WhiteSpace />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  articleDetail: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  titleArticle: {
    color: '#333',
    fontSize: widthPercent(5),
    fontWeight: '700',
  },
  sapoArticle: {
    color: '#666',
    fontSize: widthPercent(4),
    fontStyle: 'italic',
    fontWeight: '500'
  },
  metaArticle: {
    marginVertical: 10
  }, 
  textCommon: {
    marginRight: 5
  },
  articleSource: {
    backgroundColor: redColor,
    paddingHorizontal: 5,
    marginRight: 10,
    paddingVertical: 5,
    borderRadius: 3,
    color: '#fff'
  }
});

const mapStateToProps = (state) => ({
  articleDetail: articleDetailSelector(state),
  isPending: isPendingArticleDetailSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getDetailArticle: (article_id) => dispatch(fetchArticle(article_id)),
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ArticleDetail));
