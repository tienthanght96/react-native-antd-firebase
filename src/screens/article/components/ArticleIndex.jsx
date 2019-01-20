import React, { Component } from 'react';
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Provider,
  Modal as ModalAnt
} from '@ant-design/react-native';
import EmptyList from '../../../components/emptyList';
import ArticleDetail from './ArticleDetail';
import { redColor } from '../../../utils/config';
import { sleep } from '../../../utils/utils';
import ModalOtherAction from './ModalOtherAction';
import FormComment from '../../../components/formComment';
import { CommentProvider } from '../../../context/CommentContext';
import RelativeArticles from './RelativeArticles';

export default class ArticleIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if(params.article_id) {
      this.props.navigation.setParams({
        onToggleModalOtherAction: this.onToggleModalOtherAction
      });
    }
  }
  
  onToggleModalOtherAction = () => {
    this.setState(prevState => ({ isOpenModal:  !prevState.isOpenModal }));
  }

  onBookmarkError = () => {
    ModalAnt.alert("Bookmark error");
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await sleep(300);
    this.setState({ refreshing: false });
  }

  render() {
    const { params } = this.props.navigation.state;
    if(params.article_id) {
      const { refreshing, isOpenModal }  = this.state;
      return (
        <React.Fragment>
          <ScrollView
            style={{
              flex: 1,
              position: 'relative',
              backgroundColor: "#fcfcfc"
            }}
            contentContainerStyle={{position: 'relative'}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <SafeAreaView>
              <Provider>
                <ModalOtherAction
                  {...this.props}
                  isOpenModal={isOpenModal}
                  onRequestClose={this.onToggleModalOtherAction}
                  onBookmarkError={this.onBookmarkError}
                />
              </Provider>
              <ArticleDetail article_id={params.article_id} refreshing={refreshing}/>
              {/* <NewestArticlesList /> */}
              <RelativeArticles article_id={params.article_id} refreshing={refreshing} />
            </SafeAreaView>
          </ScrollView>
          <CommentProvider article_id={params.article_id} refreshing={refreshing}>
            <FormComment
              {...this.props}
              refreshing={refreshing}
              article_id={params.article_id}
              onToggleModalActions={this.onToggleModalOtherAction}
            />
          </CommentProvider>
        </React.Fragment>
      );
    }
    return <EmptyList />
  }
}

ArticleIndex.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity
      style={{ paddingHorizontal: 10 }}
      onPress={() => {
        const { params } = navigation.state;
        if(params && typeof params.onToggleModalOtherAction === 'function'){
          params.onToggleModalOtherAction();
        }
      }}
    >
      <Icon
        type="ionicon"
        name="ios-keypad"
        size={24}
        color={redColor}
        iconStyle={{marginRight: 5}}
      />
    </TouchableOpacity>
  ),
});