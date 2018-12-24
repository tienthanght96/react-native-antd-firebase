import React, { Component } from 'react';
import {
  StyleSheet, Dimensions, ActivityIndicator,
  Text, View, ScrollView, Animated,
  TouchableNativeFeedback
} from 'react-native';
import { map, isEmpty, isEqual } from 'lodash'
import { connect } from 'react-redux'
import { allCategoriesSelector } from '../../root/rootSelector';
import { getTopCategorySelector } from '../homeSelector';
import { userFavoriteCategoriesSelector, isLoginSelector } from '../../user/userSelector';
import { fetchTopCategory, fetchOneTopCategory, fetchMoreOneTopCategory } from '../homeActions';
import { redColor } from '../../../utils/config';
import TabTopCategoryItem from './TabTopCategoryItem';
import { widthPercent, height } from '../../../lib/dimensions';

class TabsTopCategory extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      routes: null,
      currentTab: null,
    };
  }

  componentDidMount(){
    this.props.fetchTopCategory();
    this.handleInitRouteTabs();
  }

  componentDidUpdate(prevProps) {
    if(
      (!isEqual(prevProps.categories.length, this.props.categories.length)) ||
      (prevProps.isLogin !== this.props.isLogin) ||
      (prevProps.favoriteCategories.length !== this.props.favoriteCategories.length)
    ){
      this.props.fetchTopCategory();
      this.handleInitRouteTabs();
    }
  }
  getListFavoriteCategory = () => {
    const { categories, favoriteCategories } = this.props;
    if(favoriteCategories && !isEmpty(favoriteCategories)){
      return favoriteCategories;
    }

    return categories || [];
  }
  handleInitRouteTabs = () => {
    let routes = this.getListFavoriteCategory();
    if(routes && !isEmpty(routes)){

      routes = routes.map(category => ({ 
          id: category.id,
          title: category.name,
          key: category.code,
      }));
      const currentTab = routes[0];
      this.setState({ routes, index: 0, currentTab });
      return;
    }
    this.setState({ routes: [], index: 0, currentTab: null });
  }

  getCurrentTopCategory = () => {
    let currentTopCategory = null;
    const { currentTab } = this.state;
    const { topCategoryArticles } = this.props;
    if(currentTab && !isEmpty(topCategoryArticles) && topCategoryArticles[currentTab.id] ){
      currentTopCategory = topCategoryArticles[currentTab.id];
    }
    return currentTopCategory;
  }

  render() {
    const { routes, currentTab } = this.state;
    const currentTopCategory = this.getCurrentTopCategory();
    if(!routes){
      return (
        <View style={{height, paddingVertical: 15, alignItems: 'center' }}>
          <ActivityIndicator color={redColor}/>
          <Text style={{paddingVertical: 5, color: redColor}}>Đang tải ...</Text>
        </View>
      );
    }

    if(isEmpty(routes)){
      return null;
    }

    return (
      <View>
        <ScrollView horizontal style={styles.containerTabsItem} showsHorizontalScrollIndicator={false}>
          { routes.map((route) => {
              const active = currentTab && currentTab.id === route.id; 
              return (
                <TouchableNativeFeedback
                  delayPressIn={0}
                  accessible={true}
                  key={route.key}
                  accessibilityLabel={route.title}
                  accessibilityTraits='button'
                  background={TouchableNativeFeedback.Ripple('transparent')} // eslint-disable-line new-cap
                  onPress={() => this.setState({ currentTab: {...route} })}
                >
                  <View pointerEvents="box-only" style={[styles.tabItem, active ? styles.tabItemActive : {}]}>
                    <Text style={[active ? styles.textTabActive : styles.textTab]}>
                      {route.title}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )
            })
          }
        </ScrollView>
        { (currentTopCategory && currentTopCategory.id) && 
          <TabTopCategoryItem
            {...this.props}
            currentTopCategory={currentTopCategory}
            category={{...currentTab, name: currentTab.title}}
          />
        }
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    // backgroundColor: '#3f51b5',
    backgroundColor: 'transparent',
  },
  tab: {
    width: 120,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  indicator: {
    // backgroundColor: '#ffeb3b',
    backgroundColor: redColor,
  },
  label: {
    color: '#333',
    fontWeight: '500',
  },
  tabItem: {
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabItemActive: {
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: redColor,
  },
  textTab: {
    color: '#848d95',
    fontSize: widthPercent(4.25),
    fontWeight: '500'
  },
  textTabActive: {
    color: redColor,
    fontSize: widthPercent(4.25),
    fontWeight: '500'
  },
  containerTabsItem: {
    height: 50,
    marginHorizontal: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

const mapStateToProps = (state) => ({
  categories: allCategoriesSelector(state),
  topCategoryArticles: getTopCategorySelector(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
  isLogin: isLoginSelector(state),
})
const mapDispatchToProps = dispatch => ({
  fetchTopCategory: () => dispatch(fetchTopCategory()),
  fetchOneTopCategory: (category) => dispatch(fetchOneTopCategory(category)),
  fetchMoreOneTopCategory: ({ category_id, page }) => dispatch(fetchMoreOneTopCategory({ category_id, page })),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabsTopCategory);