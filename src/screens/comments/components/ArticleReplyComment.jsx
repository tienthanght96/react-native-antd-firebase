import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { WhiteSpace, ActivityIndicator, Flex } from '@ant-design/react-native';
import { Icon, ListItem } from 'react-native-elements';
import { ReplyConsumer,  ReplyCommentProvider} from '../../../context/ReplyCommentContext';
import { sleep, formatCommentReplyTime } from '../../../utils/utils';
import { redColor, styleFlexRow, styleFlexRowSpaceBetween } from '../../../utils/config';
import FormReply from '../../../components/formReply';
import EmptyList from '../../../components/emptyList';
import CommentItem from './CommentItem';
import { height, widthPercent } from '../../../lib/dimensions';
import { articleDetailSelector } from '../../article/articleSelector';
import ReplyItem from './ReplyItem';

const Loading = () => (
  <View style={{flex: 1, height, backgroundColor: '#fff'}}>
    <WhiteSpace />
      <Flex align="center" justify="center">
        <WhiteSpace />
          <ActivityIndicator text="Đang tải dữ liệu.." color={redColor} size="large"/>
        <WhiteSpace />
      </Flex>
    <WhiteSpace />
  </View>
)

class ArticleReplyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      refreshing: false,
    };
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await sleep(300);
    this.setState({ refreshing: false });
  }

  renderEmptyList = () => <EmptyList />

  renderItem = ({ item }) => {
    return <ReplyItem reply={item} />;
  }

  renderKey = (item ) => `${item.reply_id}`;

  renderHeader = () => {
    const { params } = this.props.navigation.state;
    if(params && params.comment){
      const { comment } = params;
      return (
        <ListItem
          roundAvatar
          avatar={{ uri: comment.picture }}
          title={
            <View
              style={[
                styleFlexRow,
                styleFlexRowSpaceBetween,
                { marginHorizontal: 10 }
              ]}
            >
              <Text style={{ fontWeight: "500", color: "#333" }}>
                {comment.username}
              </Text>
              {comment.comment_date && (
                <Text style={{ fontSize: widthPercent(4), color: "#666" }}>
                  {formatCommentReplyTime(comment.comment_date)}
                </Text>
              )}
            </View>
          }
          subtitle={
            <View style={[{ marginHorizontal: 10 }]}>
              <Text style={{ fontSize: widthPercent(4), color: "#666" }}>
                {comment.comment_content}
              </Text>
            </View>
          }
          containerStyle={{
            borderBottomColor: "#ddd",
            backgroundColor: '#fff',
            marginBottom: 5
          }}
          hideChevron
        />
      );
    }
  }
  
  render() {
    const { params } = this.props.navigation.state;
    const { refreshing } = this.state;
    if(!params.article_id || !params.comment) {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <EmptyList />
        </View>
      )
    }
    return (
      <ReplyCommentProvider
        article_id={params.article_id}
        refreshing={refreshing}
        comment_id={params.comment.comment_id}
      >
        <View style={{ flex: 1 }}>
          <ReplyConsumer>
            {({ listReply, isLoading }) => (
              isLoading
              ? <Loading />
              : <FlatList
                  showsVerticalScrollIndicator={false}
                  data={listReply}
                  keyExtractor={this.renderKey}
                  renderItem={this.renderItem}
                  ListHeaderComponent={this.renderHeader}
                  ListEmptyComponent={this.renderEmptyList}
                />
            )}
          </ReplyConsumer>
          <FormReply
            {...this.props}
            handleReplySuccess={params.handleReplySuccess}
            refreshing={refreshing}
            article_id={params.article_id}
          />
        </View>
      </ReplyCommentProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 5,
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

export default ArticleReplyComments;