import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  RefreshControl
} from "react-native";
import { ActivityIndicator, WhiteSpace } from '@ant-design/react-native';
import Carousel from 'react-native-snap-carousel';
import { redColor } from "../../../utils/config";
import HeaderList from "../../../components/headerListArticles";
import SliderEntry from "../../../components/articleCard/CarouselCard";
import { sliderWidth, itemWidth } from "../../../styles/SliderEntry.style";
import styles from '../../../styles/index.style';
import { fetchRelativeArticles, fetchMoreRelativeArticles } from "../articleActions";
import { relativeArticlesSelector } from "../articleSelector";
import { formatCommentReplyTime } from "../../../utils/utils";

class RelativeArticles extends React.Component {

  componentDidMount() {
    const { article_id } = this.props;
    if(article_id){
      this.props.getRelativeArticles({ article_id });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      ((this.props.refreshing !== prevProps.refreshing) &&this.props.refreshing) ||
      ((prevProps.article_id !== this.props.article_id) && this.props.article_id)
    ) {
      this.props.getRelativeArticles({ article_id: this.props.article_id });
    }
  }

  onRefresh = () => {
    const { article_id } = this.props;
    if(article_id){
      this.props.getRelativeArticles({ article_id });
    }
  };

  renderItem ({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  onLoadMore = (slideIndex) => {
    const { hasLoadMore, list } = this.props.relativeArticles;
    if((slideIndex >= list.length) && hasLoadMore) {
      this.props.getMoreRelativeArticles({ article_id: this.props.article_id });
    }
  }

  render() {
    const { relativeArticles } = this.props;
    const { refreshing } = this.props;
    const { isPending, list, } = relativeArticles;
    if (isPending) {
      return (
        <View style={{ paddingVertical: 100 }}>
          <HeaderList name="Tin liên quan" isShowRightHeader />
          <WhiteSpace />
          <WhiteSpace />
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
    const listFormated = list.map(ele => ({ ...ele, date: (new Date(ele.date).getTime()) }));
    return (
      <View>
        <HeaderList name="Tin liên quan" isShowRightHeader />
        <Carousel
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              tintColor={redColor}
              onRefresh={this.onRefresh}
              refreshing={refreshing}
            />
          }
          data={listFormated}
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
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  relativeArticles: relativeArticlesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getRelativeArticles: ({ article_id }) => dispatch(fetchRelativeArticles({ article_id })),
  getMoreRelativeArticles: ({ article_id }) => dispatch(fetchMoreRelativeArticles({ article_id }))
})
export default connect( mapStateToProps, mapDispatchToProps)(RelativeArticles);
