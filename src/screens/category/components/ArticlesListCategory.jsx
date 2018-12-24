import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { isEmpty, map } from 'lodash';
import { widthPercent } from '../../../lib/dimensions';
import HorizontalArticleCard from '../../../components/articleCard/HorizontalArticleCard';
import { redColor } from '../../../utils/config';

export default class ArticlesListCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    this.props.getCategoryArticles({ category_id: this.props.category_id, limit: 10, page: 1 });
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.refreshing !== prevProps.refreshing && this.props.refreshing) ||
      (prevProps.category_id !== this.props.category_id && this.props.category_id)
    ) {
      this.props.getCategoryArticles({ category_id: this.props.category_id, limit: 10, page: 1 });
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.props.getCategoryArticles({ category_id: this.props.category_id, limit: 10, page: 1 });
    }, 200);
  }

  onLoadMore = () => {
    const { category_id } = this.props;
    const { page, limit } = this.props.categoryArticles;
    this.props.getMoreCategoryArticles({ category_id, limit , page: page + 1 });
  }

  renderListFooter = () => {
    const { hasLoadMore, isLoadingMore } = this.props.categoryArticles;
    if(isLoadingMore){
      return (
        <View style={{height: 150, paddingVertical: 15, justifyContent: 'flex-start', alignItems: 'center'}}>
          <ActivityIndicator color={redColor} size="small" />
          <Text style={{color: redColor, fontSize: widthPercent(3)}}>Đang tải...</Text>
        </View>
      );
    }
    
    if(hasLoadMore){
      return (
        <View
          style={{
            height: 150,
            paddingVertical: 15,
            justifyContent: 'flex-start', alignItems: 'center'
          }}
        >
          <TouchableOpacity
            style={styles.buttonLoadMore}
            onPress={this.onLoadMore}
          >
            <Text style={{color: '#fff', fontSize: widthPercent(4)}}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <View style={{ height: 150 }} />;
  };

  renderItem = ({ item }) => {
    return <HorizontalArticleCard article={item} />
  }

  render() {
    const { refreshing } = this.state;
    const { list, isPending } = this.props.categoryArticles;
    
    if (isPending) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 15}}>
          <ActivityIndicator color={redColor} size="small" />
          <Text style={{paddingVertical: 5, color: redColor}}>Đang tải...</Text>
        </View>
      )
    }

    if (list.length < 1) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
          <Text style={{color: redColor}}>Không có bài viết cho chuyên mục này !</Text>
        </View>
      )
    }
    return (
      <FlatList
        removeClippedSubviews
        disableVirtualization
        style={{
          backgroundColor: 'transparent',
          marginVertical: 5,
          marginHorizontal: 10,
          paddingBottom: 100
        }}
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={( item ) => item.id.toString()}
        ListFooterComponent={this.renderListFooter}
        onEndReached={this.onLoadMore}
        onEndReachedThreshold={0.7}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonLoadMore: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: redColor,
    borderRadius: 3,
  }
})

