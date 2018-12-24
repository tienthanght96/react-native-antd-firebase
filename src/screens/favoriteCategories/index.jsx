import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  Text,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { isEmpty, isEqual } from "lodash";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import ArticlesListCategory from "../category/components/ArticlesListCategory";
import { height, widthPercent } from "../../lib/dimensions";
import { redColor } from "../../utils/config";
import { userFavoriteCategoriesSelector, userSelector } from "../user/userSelector";
import { categoryArticlesSelector } from "../category/categorySelector";
import { allCategoriesSelector } from "../root/rootSelector";
import { fetchCategoryArticles, fetchMoreCategoryArticles } from "../category/categoryActions";

class FavoriteCategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: 0,
      tabsCategories: null
    };
  }

  handleChangeTab = tab => {
    this.setState(
      {
        initialPage: tab.i
      },
      () => {
        // console.log(tab.ref.props);
      }
    );
  };

  componentDidMount() {
    this.handleInitRouteTabs();
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.favorite_categories, this.props.favorite_categories)
    ) {
      this.handleInitRouteTabs();
    }
  }

  handleInitRouteTabs = () => {
    const { params } = this.props.navigation.state;
    const category_id =
      !isEmpty(params) && typeof params.category_id !== "undefined"
        ? params.category_id
        : 0;
    const listCategoryOrder = this.getListOrderCategory() || [];

    let initialPage = 0;

    if (category_id) {
      initialPage = listCategoryOrder.findIndex(
        category => category.id === category_id
      );
      initialPage = initialPage > -1 ? initialPage : 0;
    }

    this.setState({ tabsCategories: listCategoryOrder, initialPage });
    return;
    this.setState({ tabsCategories: [], initialPage: 0 });
  };

  getListOrderCategory = () => {
    const { favorite_categories } = this.props;
    if (favorite_categories && !isEmpty(favorite_categories)) {
      return favorite_categories;
    }

    return [];
  };

  render() {
    const { tabsCategories, initialPage } = this.state;

    if (!tabsCategories) {
      return (
        <View>
          <View
            style={{ height: 100, paddingVertical: 15, alignItems: "center" }}
          >
            <ActivityIndicator color={redColor} />
            <Text style={{ paddingVertical: 5, color: redColor }}>
              Đang tải ...
            </Text>
          </View>
        </View>
      );
    }

    if (isEmpty(tabsCategories) || !Array.isArray(tabsCategories)) {
      return (
        <View>
          <View
            style={{ height: 100, paddingVertical: 15, alignItems: "center" }}
          >
            <Text style={{ paddingVertical: 5, color: redColor }}>
              Bạn chưa có danh mục yêu thích nào !
            </Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1, backgroundColor: "#fff" }}
      >
        <ScrollableTabView
          style={{ marginTop: 5 }}
          tabBarPosition="bottom"
          initialPage={initialPage}
          renderTabBar={() => (
            <ScrollableTabBar
              tabsContainerStyle={{
                justifyContent: "flex-start",
                borderTopColor: '#eee',
                borderTopWidth: 1
              }}
            />
          )}
          onChangeTab={this.handleChangeTab}
          tabBarBackgroundColor={"transparent"}
          tabBarTextStyle={{
            fontSize: widthPercent(4.25)
            // color: '#848d95',
          }}
          tabBarActiveTextColor={redColor}
          tabBarInactiveTextColor="#848d95"
          tabBarUnderlineStyle={{ backgroundColor: redColor, height: 2 }}
        >
          {tabsCategories.map(category => {
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
          })}
        </ScrollableTabView>
      </ScrollView>
    );
  }
}

// FavoriteCategoryContainer.navigationOptions = { header: null };

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


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCategoryContainer);
