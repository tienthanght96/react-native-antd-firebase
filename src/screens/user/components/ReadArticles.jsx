import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { ActivityIndicator, WhiteSpace } from "@ant-design/react-native";
import HorizontalArticleCard from '../../../components/articleCard/HorizontalArticleCard';
import { fetchHistoryArticles } from "../userActions";
import { userSelector, historyArticlesSelector } from '../../user/userSelector';
import { redColor } from '../../../utils/config';
import HeaderListArticles from '../../../components/headerListArticles';
import EmptyList from '../../../components/emptyList';

class ReadArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  componentDidMount() {
    this.props.getHistoryArticles();
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(() => {
        this.setState({ refreshing: false });
        this.props.getHistoryArticles();
      }, 250);
    });
  }

  onHandleBookmarkSuccess = () => {
    this.onRefresh();
  }

  renderListFooter = () => {
    return <View style={{ height: 150 }} />;
  };

  renderEmptyList = () => <EmptyList />

  render() {
    const { refreshing } = this.state;
    const { isPending, list } = this.props.historyArticles;
    return (
      <View style={{flex: 1}}>
        { (isPending)
          ? <React.Fragment>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <ActivityIndicator size="large" text="Đang tải dữ liệu..." color={redColor}/>
            </React.Fragment>
          : <FlatList
              removeClippedSubviews
              disableVirtualization={false}
              style={{
                backgroundColor: 'transparent',
                marginVertical: 5,
                marginHorizontal: 10,
                paddingBottom: 100,
                flex: 1,
              }}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              showsVerticalScrollIndicator={false}
              data={list}
              keyExtractor={( item ) => item.id.toString()}
              ListFooterComponent={this.renderListFooter}
              ListEmptyComponent={this.renderEmptyList}
              renderItem={({ item }) =>
                <HorizontalArticleCard
                  article={{...item }}
                  onHandleBookmarkSuccess={this.onHandleBookmarkSuccess}
                />
              }
          />
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: userSelector(state),
  historyArticles: historyArticlesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getHistoryArticles: () => dispatch(fetchHistoryArticles()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ReadArticles);