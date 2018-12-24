import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { widthPercent } from "../../../lib/dimensions";
import { Icon } from "react-native-elements";

import {
  redColor,
} from "../../../utils/config";

class HeaderSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onHandleNavigateSearchScence = () => {
    this.props.navigate("Search");
  };

  render() {
    return (
      <View style={styles.wrapperHeader}>
        <TouchableOpacity style={styles.logo}>
          <Icon type="ionicon" name="ios-planet" size={35} color={redColor} />
        </TouchableOpacity>
        <View style={styles.containerButtonSearch}>
          <TouchableOpacity
            onPress={this.onHandleNavigateSearchScence}
            style={styles.buttonSearch}
          >
            <Icon
              type="ionicon"
              name="ios-search"
              size={26}
              color={"rgb(72, 72, 72)"}
            />
            <Text style={styles.textSearch}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperHeader: {
    width: "100%",
    padding: 10,
    height: 65,
    // paddingBottom: widthPercent(1),
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    width: 50,
    height: "100%"
  },
  containerButtonSearch: {
    flex: 1,
    height: "100%"
  },
  buttonSearch: {
    borderColor: "rgb(220, 224, 224)",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderRadius: 4
  },
  textSearch: {
    color: "rgb(72, 72, 72)",
    marginLeft: 10,
    fontSize: widthPercent(3.5)
  }
});

export default HeaderSearchContainer;
