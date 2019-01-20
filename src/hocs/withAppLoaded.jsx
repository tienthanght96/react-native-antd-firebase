import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text } from 'react-native';
import { ActivityIndicator, Modal, Provider } from '@ant-design/react-native';
import { connect } from 'react-redux'
import { appLoadedSelector } from '../screens/root/rootSelector'
import { appLoaded } from '../screens/root/rootActions';
import { redColor } from '../utils/config';
import { userSelector, isFetchedFavoriteCategoriesSelector } from '../screens/user/userSelector';

export const withAppLoaded = (ComposedComp) => {
  class AppLoadedWrapper extends React.Component {
    
    render(){
      const { appLoaded, user, isFetchedFavoriteCategories } = this.props;
      
      if(appLoaded && user && user.id && isFetchedFavoriteCategories){
        return <ComposedComp {...this.props}/>
      }

      // if(!appLoaded) {
        return (
          <Provider>
            <View style={{ paddingTop: 100 }}>
              <Modal
                title=""
                transparent
                // onClose={this.onClose}
                maskClosable={false}
                visible={true}
                closable={false}
                footer={null}
              >
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" text="Đang lấy thông tin..." color={redColor}/>
              </View>
              </Modal>
            </View>
          </Provider>
        )
      // }
      // return <ComposedComp {...this.props}/>
    }
  }
  const mapStateToProps = (state) => ({
    appLoaded: appLoadedSelector(state),
    user: userSelector(state),
    isFetchedFavoriteCategories: isFetchedFavoriteCategoriesSelector(state)
  });
  const mapDispatchToProps = (dispatch) => ({
    appLoad: () => dispatch(appLoaded())
  })
  return withNavigation(connect(mapStateToProps, mapDispatchToProps)(AppLoadedWrapper));
}