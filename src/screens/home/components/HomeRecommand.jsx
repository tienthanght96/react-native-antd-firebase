import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, TouchableNativeFeedback, ScrollView } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { connect } from "react-redux";
import { redColor, styleFlexRow, assets } from '../../../utils/config';
import { widthPercent } from '../../../lib/dimensions';
import { Icon } from "react-native-elements";
import TotalCommentArticle from '../../../components/totalComment';
import { fetchRecommendTopic } from '../homeActions';
import { getRecommendTopicSelector } from '../homeSelector';
import { userFavoriteCategoriesSelector } from '../../user/userSelector';
import HeaderListArticles from '../../../components/headerListArticles';
import { replaceSizeImage, formatCommentReplyTime } from '../../../utils/utils';


class TagArticle extends React.PureComponent {
  onPress = () => {
    const { article, navigation } = this.props;
    navigation.navigate("ArticleDetail", { article_id: article.id });
  }
  render() {
    const { article } = this.props;
    const isImageHttp = article.picture && article.picture.length >  5 && article.picture.includes('http');
    return (
      <TouchableOpacity style={styles.tagArticle} onPress={this.onPress}>
        <View style={styles.tagImageContainer}>
          <Image style={styles.tagImage} source={isImageHttp ? { uri: article.picture } : assets.noImage}/>
        </View>
        <View style={styles.tagContent}>
          <View>
            <Text style={styles.tagTitle} numberOfLines={2}>{article.title}</Text>
          </View>
          <View>
            <Text style={styles.tagSapo} numberOfLines={2}>{article.sapo}</Text>
          </View>
          <View style={[styleFlexRow,styles.tagMeta]}>
            <View style={[styleFlexRow, { marginRight: 5 }]}>
              <Icon
                type="ionicon"
                name="ios-time"
                size={18}
                color={"#c3c3c3"}
                iconStyle={{ marginRight: 5 }}
              />
              <Text style={styles.textNormal}>{article.date || 0}</Text>
              </View>
            <View style={[styleFlexRow, { marginRight: 5 }]}>
              <Icon
                type="ionicon"
                name="ios-person"
                size={18}
                color={"#c3c3c3"}
                iconStyle={{ marginRight: 5 }}
              />
              <Text style={styles.textNormal}>{article.view || 0}</Text>
            </View>
            <TotalCommentArticle article_id={article.id} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class HomeRecommand extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      currentTab: 0,
    }
  }

  componentDidMount() {
    this.props.fetchRecommendTopic();
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.refreshing !== prevProps.refreshing && this.props.refreshing) ||
      (prevProps.favoriteCategories.length !== this.props.favoriteCategories.length)
    ) {
      this.props.fetchRecommendTopic();
    }
  }

  renderItem = ({ item }) => {
    return <TagArticle article={item} navigation={this.props.navigation}/>
  }

  renderListFooter = () => {
    return <View style={{ height: 150 }} />;
  };

  onViewMore = (tagName) => {
    if(tagName) {
      this.props.navigation.navigate("Tags", { tag: tagName, title: tagName });
    }
  }

  render() {

    const { refreshing, currentTab } = this.state;
    const { list, isPending } = this.props.recommendTopic;
    if(isPending){
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

    if(!list || !Array.isArray(list) ||list.length < 1){
      return null;
    }

    const currentItem = list.find((ele, index) => index === currentTab);
    const currentArticles = currentItem && currentItem.relatedArticles
      ?  currentItem.relatedArticles.map(ele => ({
          ...ele,
          picture: replaceSizeImage(ele.picture),
          date: formatCommentReplyTime(new Date(ele.date).getTime() / 1000)
        }))
      : [];
    const currentTagName = currentItem.tagName || null;
    return (
      <View>
        <HeaderListArticles name="Chủ đề được đề xuất" isShowRightHeader />
        <ScrollView horizontal style={styles.containerTabsItem} showsHorizontalScrollIndicator={false}>
          { list.map((tab, tabIndex) => {
              const active = tabIndex === currentTab; 
              return (
                <TouchableNativeFeedback
                  delayPressIn={0}
                  accessible={true}
                  key={tabIndex}
                  accessibilityLabel={tab.tagName}
                  accessibilityTraits='button'
                  background={TouchableNativeFeedback.Ripple('transparent')} // eslint-disable-line new-cap
                  onPress={() => this.setState({ currentTab: tabIndex })}
                >
                  <View pointerEvents="box-only" style={[styles.tabItem, active ? styles.tabItemActive : {}]}>
                    <Text style={[active ? styles.textTabActive : styles.textTab]}>
                      {tab.tagName}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )
            })
          }
        </ScrollView>
        { (currentArticles.length > 0) &&
            <React.Fragment>
              <FlatList
                style={{backgroundColor: 'transparent', marginVertical: 5, marginHorizontal: 10}}
                removeClippedSubviews
                disableVirtualization
                horizontal={true}
                refreshing={refreshing}
                showsHorizontalScrollIndicator={false}
                data={currentArticles}
                keyExtractor={( item ) => item.id.toString()}
                ListFooterComponent={this.renderListFooter}
                renderItem={this.renderItem}
              />
            </React.Fragment>
          }
          { currentTagName &&
             <View style={{ marginVertical: 10, alignItems: "center" }}>
                <TouchableOpacity style={[styleFlexRow, styles.buttonViewMore]} onPress={() => this.onViewMore(currentTagName)}>
                  <Text style={{ color: '#fff' }}>Xem thêm về <Text numberOfLines={1} style={{ fontWeight: "500", color: '#fff' }}>{currentTagName}</Text></Text>
                  <Icon
                    type="ionicon"
                    name="ios-arrow-round-forward"
                    size={22}
                    color={"#fff"}
                    iconStyle={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerTabsItem: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  tabItem: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  tabItemActive: {
    backgroundColor: redColor
  },
  textTab: {
    color: '#aaaaaa',
    fontSize: widthPercent(4),
    fontWeight: '500'
  },
  textTabActive: {
    color: "#fff",
  },
  tagArticle: {
    width: widthPercent(70),
    marginRight: 20,
  },
  tagImageContainer: {
    marginBottom: 10
  },
  tagImage: {
    borderRadius: 3,
    height: 200,
    width: "100%"
  },
  tagTitle: {
    fontSize: widthPercent(4.25),
    fontWeight: '500',
    color: "#333",
  },
  tagSapo: {
    fontSize: widthPercent(3.5),
    marginBottom: 5
  },
  buttonViewMore: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: redColor,
    width: widthPercent(80),
    borderRadius: 20,
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  recommendTopic: getRecommendTopicSelector(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchRecommendTopic: () => dispatch(fetchRecommendTopic()),
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HomeRecommand));