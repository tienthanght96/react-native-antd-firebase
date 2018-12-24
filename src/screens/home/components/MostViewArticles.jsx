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

import { userFavoriteCategoriesSelector } from "../../user/userSelector";
import { redColor } from "../../../utils/config";
import HeaderList from "../../../components/headerListArticles";
import SliderEntry from "../../../components/articleCard/CarouselCard";
import { sliderWidth, itemWidth } from "../../../styles/SliderEntry.style";
import styles from '../../../styles/index.style'
import { fetchMostView, fetchMoreNewest } from "../homeActions";
import { getMostViewSeletor } from "../homeSelector";
class MostViewArticles extends React.Component {

  componentDidMount() {
    this.props.getHomeMostView({ limit: 50 });
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
      this.props.getHomeMostView({ limit: 50 });
    }
  }

  onRefresh = () => {
    this.props.getHomeMostView({ limit: 50 });
  };

  renderItem ({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  onLoadMore = (slideIndex) => {
    // const { hasLoadMore, list, page } = this.props.newestArticles;
    // if((slideIndex >= list.length - 3) && hasLoadMore) {
    //   this.props.getMoreNewest({ page: page + 1 })
    // }
  }

  render() {
    const { mostViewsArticles } = this.props;
    const { refreshing } = this.props;
    const { isPending, list, isLoadingMore, hasLoadMore } = mostViewsArticles;
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
        <HeaderList name="Đọc nhiều nhất" isShowRightHeader />
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
          loop={true}
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
      </View>
    );
  }
}


const mapStateToProps = state => ({
  mostViewsArticles: getMostViewSeletor(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getHomeMostView: ({ limit }) => dispatch(fetchMostView({ limit })),
  getMoreNewest: ({ page }) => dispatch(fetchMoreNewest({ page }))
});

export default connect( mapStateToProps, mapDispatchToProps)(MostViewArticles);
