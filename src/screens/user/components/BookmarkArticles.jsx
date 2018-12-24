import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ActivityIndicator } from "@ant-design/react-native";
import { withAppLoaded } from '../../../hocs/withAppLoaded';
import { withUserFacebook } from '../../../hocs/withUserFacebook';
import HorizontalArticleCard from '../../../components/articleCard/HorizontalArticleCard';
import { fetchBookmarkArticles, fetchMoreBookmarkArticles } from "../userActions";
import { widthPercent } from '../../../lib/dimensions';
import { userSelector, bookmarkArticlesSelector } from '../../user/userSelector';
import { redColor } from '../../../utils/config';
import HeaderListArticles from '../../../components/headerListArticles';
import EmptyList from '../../../components/emptyList';
import styles from '../../../styles/loadmore.style';
class BookmarkArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  componentDidMount() {
    this.props.getBookmarkArticles({ limit: 12, page: 1 });
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.user !== this.props.user &&
  //     this.props.user &&
  //     this.props.user.id
  //   ) {
  //     this.props.getBookmarkArticles({ limit: 12, page: 1 });
  //   }
  // }

  onHandleLoadMore = () => {
    const { limit, page } = this.props.bookmarkArticles;
    this.props.getMoreBookmarkArticles({ limit, page: page + 1 });
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(() => {
        this.setState({ refreshing: false });
        this.props.getBookmarkArticles({ limit: 12, page: 1 });
      }, 250);
    });
  }

  onHandleBookmarkSuccess = () => {
    this.onRefresh();
  }

  renderListFooter = () => {
    const { isLoadingMore, hasLoadMore } = this.props.bookmarkArticles;

    if(hasLoadMore && isLoadingMore){
        return (
          <View style={{height: 150, paddingVertical: 15, justifyContent: 'flex-start', alignItems: 'center'}}>
            <ActivityIndicator color={redColor} size="small" />
            <Text style={{color: redColor, fontSize: widthPercent(3)}}>Đang tải...</Text>
          </View>
        );
    }
    
    if(hasLoadMore){
      return (
        <View style={{ height: 150, paddingVertical: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.buttonLoadMore}
            onPress={this.loadMoreHandler}
          >
            <Text style={{color: '#fff', fontSize: widthPercent(4)}}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <View style={{ height: 150 }} />;
  };

  renderEmptyList = () => <EmptyList />

  render() {
    const { refreshing } = this.state;
    const { isPending, list } = this.props.bookmarkArticles;
    return (
      <View style={{flex: 1}}>
        <HeaderListArticles name="Tin đã lưu" />
        { (isPending)
          ? <ActivityIndicator size="large" text="Đang tải dữ liệu..." color={redColor}/>
          : <FlatList
              removeClippedSubviews
              disableVirtualization={false}
              style={{
                backgroundColor: 'transparent',
                marginVertical: 5,
                marginHorizontal: 10,
                paddingBottom: 100,
                flex: 1,
                // backgroundColor: '#fff'
              }}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              showsVerticalScrollIndicator={false}
              data={list}
              keyExtractor={( item ) => item.id.toString()}
              ListFooterComponent={this.renderListFooter}
              ListEmptyComponent={this.renderEmptyList}
              onEndReached={this.onHandleLoadMore}
              onEndReachedThreshold={0.7}
              renderItem={({ item }) =>
                <HorizontalArticleCard
                  article={{...item }}
                  onHandleBookmarkSuccess={this.onHandleBookmarkSuccess}
                />
              }
          />
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: userSelector(state),
  bookmarkArticles: bookmarkArticlesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getBookmarkArticles: (data) => dispatch(fetchBookmarkArticles(data)),
  getMoreBookmarkArticles: ({ limit, page }) =>
    dispatch(fetchMoreBookmarkArticles({ limit, page })),
})
export default withAppLoaded(
  withUserFacebook(
    connect(mapStateToProps, mapDispatchToProps)(BookmarkArticles),
    {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
      paddingHorizontal: 20
    }
  )
);