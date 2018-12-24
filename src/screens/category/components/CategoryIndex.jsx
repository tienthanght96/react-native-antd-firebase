import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { categoryArticlesSelector } from '../categorySelector';
import { fetchCategoryArticles, fetchMoreCategoryArticles } from '../categoryActions';
import { formatCommentReplyTime } from '../../../utils/utils';
import { withAppLoaded } from '../../../hocs/withAppLoaded';
import ArticlesListCategory from './ArticlesListCategory';
import { widthPercent } from '../../../lib/dimensions';
import { userSelector, userFavoriteCategoriesSelector } from '../../user/userSelector';
import { allCategoriesSelector } from '../../root/rootSelector';
import { redColor } from '../../../utils/config';

class CategoryIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      initialPage: 0,
      tabsCategories: null
    }
  }

  componentDidMount(){
    this.handleInitRouteTabs();
  }

  componentDidUpdate(prevProps) {
    if(
      !isEqual(prevProps.favorite_categories, this.props.favorite_categories) ||
      (this.props.user && this.props.user.id && !isEqual(prevProps.user.id, this.props.user.id)) ||
      (!isEqual(this.props.navigation.state.params, prevProps.navigation.state.params))
    ){
      this.handleInitRouteTabs();
    }
  }

  handleChangeTab = (tab) => {
    this.setState({
      initialPage: tab.i,
    });
  }

  handleInitRouteTabs = () => {
    if(this.props.categories && !isEmpty(this.props.categories)){
      const { params } = this.props.navigation.state;
      console.log('params', params)
      const category_id = (!isEmpty(params) && typeof params.category_id !== 'undefined')
        ?  params.category_id
        : 0;
      const listCategoryOrder = this.getListOrderCategory() || [];
    
      let initialPage = 0;

      if(category_id){
        initialPage = listCategoryOrder.findIndex(category => category.id === category_id);
        initialPage = initialPage > -1 ? initialPage : 0;
      }

      this.setState({ tabsCategories: listCategoryOrder, initialPage });
      return;
    }
    this.setState({ tabsCategories: [], initialPage: 0 });
  }

  getListOrderCategory = () => {
    const { categories, favorite_categories } = this.props;
    if(categories && favorite_categories && !isEmpty(favorite_categories)){

      const favoriteCategoriesIds = favorite_categories.map(cate => cate.id);
      const listFavorties = [];
      const listNotFavorites = [];

      categories.forEach((category) => {
        if(favoriteCategoriesIds.indexOf(category.id) > -1){
          listFavorties.push({ ...category, selected: true })
        } else {
          listNotFavorites.push({ ...category, selected: false })
        }
      });
      
      return listFavorties.concat(listNotFavorites);
    }

    return categories || [];
  }

  render() {
    const { tabsCategories, initialPage } = this.state;
    if(!tabsCategories){
      return (
          <View style={{height: 100, paddingVertical: 15, alignItems: 'center' }}>
              <ActivityIndicator color={redColor}/>
              <Text style={{paddingVertical: 5, color: redColor}}>Đang tải ...</Text>
          </View>
      );
    }
    if(isEmpty(tabsCategories) || !Array.isArray(tabsCategories)){
      return (
          <View style={{height: 100, paddingVertical: 15, alignItems: 'center' }}>
              <Text style={{paddingVertical: 5, color: redColor}}>Không tìm thấy dữ liệu ...</Text>
          </View>
      );
    }
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollableTabView
          style={{marginTop: 5, }}
          page={initialPage}
          renderTabBar={() => <ScrollableTabBar />}
          onChangeTab={this.handleChangeTab}
          tabBarBackgroundColor={"transparent"}
          tabBarTextStyle={{
              fontSize: widthPercent(4.25),
              // color: '#848d95',
          }}
          tabBarActiveTextColor={redColor}
          tabBarInactiveTextColor="#848d95"
          tabBarUnderlineStyle ={{backgroundColor: redColor, height: 2 }}
        >
        { tabsCategories.map(category => {
            return (
              <ArticlesListCategory
                key={category.id}
                {...this.props}
                user={this.props.user}
                category={{...category}}
                category_id={category.id}
                tabLabel={category.name}
              />
            );
          })
        }
        </ScrollableTabView>
      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => ({
  categoryArticles: categoryArticlesSelector(state),
  categories: allCategoriesSelector(state),
  favorite_categories : userFavoriteCategoriesSelector(state),
  user: userSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getCategoryArticles: ({ limit, page, category_id }) => dispatch(fetchCategoryArticles({ limit, page, category_id })),
  getMoreCategoryArticles: ({ limit, page, category_id }) => dispatch(fetchMoreCategoryArticles({ limit, page, category_id }))
})

export default withAppLoaded(connect(mapStateToProps, mapDispatchToProps)(CategoryIndex));