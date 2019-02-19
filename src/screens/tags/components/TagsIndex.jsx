import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { isEmpty, map, isEqual } from 'lodash';
import { widthPercent } from '../../../lib/dimensions';
import HorizontalArticleCard from '../../../components/articleCard/HorizontalArticleCard';
import { redColor } from '../../../utils/config';
import { tagsArticlesSelector } from '../tagsSelector';
import { fetchTagsArticles, fetchMoreTagsArticles } from '../tagsActions';

class TagsIndex extends Component {
  
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title || 'Chuyên mục'}`,
      headerTintColor: redColor,
      // navigationOptions: () => ({
      //   headerTintColor: redColor,
      //   headerTitle: "Chuyên mục"
      // }) 
    };
  };

  constructor(props){
    super(props);
    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    const { tag } = this.props.navigation.state.params;
    this.props.getTagsArticles({ limit: 50, page: 1, tag });
  }
  
  componentDidUpdate(prevProps) {
    // if(!isEqual(prevProps.navigation.state.params !== this.props.navigation.state.params) && this.props.navigation.state.params.tag) {
    //   const { tag } = this.props.navigation.state.params;
    //   this.props.getTagsArticles({ limit: 50, page: 1, tag });
    // }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      const { tag } = this.props.navigation.state.params;
      this.props.getTagsArticles({ limit: 50, page: 1, tag });
    }, 200);
  }

  renderListFooter = () => {
    return <View style={{ height: 150 }} />;
  };

  renderItem = ({ item }) => {
    return <HorizontalArticleCard article={item} />
  }

  render() {
    const { refreshing } = this.state;
    const { tagsArticles } = this.props;
    const { isPending, list } = tagsArticles;

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
          <Text style={{color: redColor}}>Không có bài viết cho tag này !</Text>
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


const mapStateToProps = (state) => ({
  tagsArticles: tagsArticlesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getTagsArticles: ({ limit, page, tag }) => dispatch(fetchTagsArticles({ limit, page, tag })),
  getMoreTagsArticles: ({ limit, page, tag }) => dispatch(fetchMoreTagsArticles({ limit, page, tag }))
})

export default (connect(mapStateToProps, mapDispatchToProps)(TagsIndex));