import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  // ActivityIndicator,
  FlatList,
  RefreshControl
} from "react-native";
import { ActivityIndicator } from '@ant-design/react-native';
import Carousel from 'react-native-snap-carousel';

import { fetchNewest, fetchMoreNewest } from "../homeActions";
import { getNewestSeletor } from "../homeSelector";
import { userFavoriteCategoriesSelector } from "../../user/userSelector";
import { widthPercent } from "../../../lib/dimensions";
import NewestPopularCard from "../../../components/articleCard/NewestPopularCard";
import { redColor } from "../../../utils/config";
import HeaderList from "../../../components/headerListArticles";
import SliderEntry from "../../../components/articleCard/CarouselCard";
import { sliderWidth, itemWidth } from "../../../styles/SliderEntry.style";
import styles from '../../../styles/index.style'
class NewestArticlesList extends React.Component {

  componentDidMount() {
    this.props.getNewest({ limit: 10, page: 1 });
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.refreshing !== prevProps.refreshing && this.props.refreshing) ||
      (
        (this.props.favoriteCategories.length !== prevProps.favoriteCategories.length ) &&
        this.props.favoriteCategories.length
      )
      // (this.props.user.id !== prevProps.user.id && this.props.user.id)
    ) {
      this.props.getNewest({ limit: 10, page: 1 });
    }
  }

  onRefresh = () => {
    this.props.getNewest({ limit: 10, page: 1 });
  };

  renderItem ({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  onLoadMore = (slideIndex) => {
    const { hasLoadMore, list, page } = this.props.newestArticles;
    if((slideIndex >= list.length - 3) && hasLoadMore) {
      this.props.getMoreNewest({ page: page + 1 })
    }
  }

  render() {
    const { newestArticles } = this.props;
    const { refreshing } = this.props;
    const { isPending, list, isLoadingMore, hasLoadMore } = newestArticles;
    if (isPending) {
      return (
        <View style={{ paddingVertical: 100 }}>
          <ActivityIndicator
            size="small"
            color={redColor}
            text="Đang lấy dữ liệu..." 
            animating={true}
            styles={{
              color: redColor 
            }}
          />
        </View>
      );
    }

    return (
      <View>
        <HeaderList name="Tin mới nhất" isShowRightHeader />
        <Carousel
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              tintColor={redColor}
              onRefresh={this.onRefresh}
              refreshing={refreshing}
            />
          }
          data={list}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          loop={false}
          onSnapToItem={this.onLoadMore}
          activeSlideAlignment={'start'}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40
          }}
        />
        {/* <FlatList
          removeClippedSubviews
          disableVirtualization
          style={{ backgroundColor: "transparent", marginVertical: 5 }}
          horizontal
          refreshing={refreshing}
          // onRefresh={this._onRefresh}
          showsHorizontalScrollIndicator={false}
          data={list}
          keyExtractor={(item, index) => item.id.toString()}
          ListFooterComponent={this._renderListFooter}
          onEndReached={info => {
            // this.loadMoreHandler();
          }}
          onEndReachedThreshold={0.7}
          renderItem={({ item }) => (
            <View style={{ width: widthPercent(60), marginLeft: 5 }}>
              <NewestPopularCard article={item} />
            </View>
          )}
        /> */}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  newestArticles: getNewestSeletor(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getNewest: ({ limit, page }) => dispatch(fetchNewest({ limit, page })),
  getMoreNewest: ({ page }) => dispatch(fetchMoreNewest({ page }))
});

export default connect( mapStateToProps, mapDispatchToProps)(NewestArticlesList);
