import React from 'react';
import { Text, View, FlatList, Animated } from 'react-native';
import { isEqual } from 'lodash'
import HeaderListArticles from '../../../components/headerListArticles';
import HorizontalArticleCard from '../../../components/articleCard/HorizontalArticleCard';
import { ActivityIndicator } from '@ant-design/react-native';
import { redColor } from '../../../utils/config';
import { widthPercent } from '../../../lib/dimensions';
import { ListView, Button } from '@ant-design/react-native';

export default class TabTopCategoryItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentOffsetY: 0
    }
  }
  componentDidMount() {
    this.getTopArticleCategory();
  }

  componentDidUpdate({ currentTopCategory, refreshing }) {
    if(
      (currentTopCategory === null && this.props.currentTopCategory !== null) ||
      ((currentTopCategory !== null) && this.props.currentTopCategory.id !== currentTopCategory.id) ||
      (refreshing !== this.props.refreshing)
    ){
      // console.log('reshres')
      this.getTopArticleCategory();
    }
  }
  
  handleViewCategory = () => {
    const { navigation } = this.props;
    const { category } = this.props;
    typeof navigation.navigate === 'function' && navigation.navigate("Category", { category_id: category.id });
  }

  handleLoadMore = () => {
    const { currentTopCategory } = this.props;
    const { page, hasLoadMore, isLoadingMore } = currentTopCategory;
    if(hasLoadMore && isLoadingMore === false && page){
      this.props.fetchMoreOneTopCategory({
        category_id: currentTopCategory.id,
        page: page + 1
      });
    }
  }

  getTopArticleCategory = () => {
    const { currentTopCategory } = this.props;
    if(currentTopCategory && currentTopCategory.id){
      this.props.fetchOneTopCategory(currentTopCategory);
    }
  }

  _onScroll = (e) => {
    const contentOffset = e.nativeEvent.contentOffset.y;
    this.state.contentOffsetY < contentOffset ? console.log("Scroll Down") : console.log("Scroll Up");
    this.setState({contentOffsetY: contentOffset});
  }

  renderListFooter = () => {
  
    const { currentTopCategory } = this.props;
    const { page, hasLoadMore, isLoadingMore } = currentTopCategory;
    
    return null;

    if(hasLoadMore && !isLoadingMore){
      return (
        <Button
          onPress={this.handleLoadMore}
          type="warning"
          style={{
            marginHorizontal: 10,
            marginVertical: 10
          }}
        >
          Xem thêm
        </Button>
      );
    }
    if(hasLoadMore && isLoadingMore) {
      return <ActivityIndicator text="Đang tải..." size="small"/>;
    }
    return null;
  };

  keyExtractor = (item) => `${item.id}`;

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }


  render() {
    const { category, refreshing, currentTopCategory } = this.props;
      
    return (
      <View>
        <HeaderListArticles
          name={category.name}
          isViewMore
          isShowRightHeader
          onViewMore={this.handleViewCategory}
        />
        { (() => {
            if(!currentTopCategory || currentTopCategory.isPending){
              return (
                <View style={{height: 100, paddingVertical: 15, alignItems: 'center' }}>
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

            if(currentTopCategory.list.length < 1) return null;
            
              return (
                <FlatList
                  style={{backgroundColor: 'transparent', marginVertical: 5, marginHorizontal: 10}}
                  removeClippedSubviews
                  disableVirtualization
                  refreshing={refreshing}
                  showsHorizontalScrollIndicator={false}
                  data={currentTopCategory.list}
                  keyExtractor={this.keyExtractor}
                  ListFooterComponent={this.renderListFooter}
                  onScroll={this._onScroll}
                  renderItem={({ item }) =>
                      <HorizontalArticleCard article={item} />
                  }
                />
              );
            })()
        }
      </View>
    );
  }
}

export const title = 'ListView';
export const description = 'ListView Example';