import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { WhiteSpace, ActivityIndicator, Flex } from '@ant-design/react-native';
import { Icon } from 'react-native-elements';
import { CommentConsumer, CommentProvider } from '../../../context/CommentContext';
import { sleep, formatCommentReplyTime } from '../../../utils/utils';
import { redColor, styleFlexRow } from '../../../utils/config';
import FormComment from '../../../components/formComment';
import EmptyList from '../../../components/emptyList';
import CommentItem from './CommentItem';
import { height, widthPercent } from '../../../lib/dimensions';
import { articleDetailSelector } from '../../article/articleSelector';

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

class ArticleComments extends Component {
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

  renderEmptyList = () => <EmptyList />;

  renderItem = ({ item }) => {
    return <CommentItem comment={item} article_id={this.props.articleDetail.id}/>;
  }

  renderKey = (item ) => `${item.comment_id}`;

  renderHeader = () => {
    const { articleDetail } = this.props;
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.titleArticle}>{articleDetail.title || ''}</Text>
        </View>
        <WhiteSpace />
        <View>
          <Text style={styles.sapoArticle}>{articleDetail.sapo || ''}</Text>
        </View>
        <WhiteSpace />
        <WhiteSpace />
        <Flex>
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
        </Flex>
      </View>
    );
  }
  
  render() {
    const { params } = this.props.navigation.state;
    const { refreshing } = this.state;
    if(!params.article_id) {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <EmptyList />
        </View>
      )
    }
    return (
      <CommentProvider article_id={params.article_id} refreshing={refreshing}>
        <View style={{ flex: 1 }}>
          <CommentConsumer>
            {({ listComment, isLoading }) => (
              isLoading
              ? <Loading />
              : <FlatList
                  showsVerticalScrollIndicator={false}
                  data={listComment}
                  keyExtractor={this.renderKey}
                  renderItem={this.renderItem}
                  ListHeaderComponent={this.renderHeader}
                  ListEmptyComponent={this.renderEmptyList}
                />
            )}
          </CommentConsumer>
          <FormComment
            {...this.props}
            refreshing={refreshing}
            article_id={params.article_id}
            handleAddCommentSuccess={params.handleAddCommentSuccess}
            isHideOtherActions={true}
          />
        </View>
      </CommentProvider>
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

const mapStateToProps = (state) => ({
  articleDetail: articleDetailSelector(state),
})
export default connect(mapStateToProps)(ArticleComments);