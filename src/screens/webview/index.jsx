import React, { Component } from "react";
import {
  WebView,
  ActivityIndicator,
  View,
  Linking,
  Alert,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import { redColor } from "../../utils/config";

class WebviewContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      headerTitle: title,
      headerTintColor: redColor,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "#fff"
      }
    };
  };

  constructor() {
    super();

    this.state = {
      lastUrl: ""
    };
  }

  componentDidMount() {
    //  check title
    const { title, navigation } = this.props;
    if (title) {
      //  set params
      navigation.setParams({
        title: title
      });
    }
  }

  _errorHandler = () => {
    Alert.alert("Có lỗi xảy ra");
  };

  _renderLoading = () => {
    return <ActivityIndicator style={{ marginTop: 30 }} color={redColor} />;
  };

  render() {
    const { url } = this.props.navigation.state.params;

    if (!url) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          onLoadEnd={() => {
            this.setState({ isLoaded: true });
          }}
          renderError={this._errorHandler}
          startInLoadingState={true}
          renderLoading={this._renderLoading}
          source={{
            uri: url
          }}
         
        />
      </View>
    );
  }
}

export default WebviewContainer;
