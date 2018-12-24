import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
export default class UpdateProfile extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Go to Category"
          onPress={() => this.props.navigation.navigate('Category')}
        />
        <Text>Update proflie</Text>
      </View>
    );
  }
}