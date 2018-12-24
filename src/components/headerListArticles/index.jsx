import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercent } from "../../lib/dimensions";
import { Icon } from "react-native-elements";

import { fontColor, redColor } from "../../utils/config";

class HeaderListArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleViewMore = () => {
    if (typeof this.props.onViewMore === "function") {
      this.props.onViewMore();
    }
  };

  render() {
    const { isShowRightHeader, isViewMore, isHaveBookmark } = this.props;
    return (
      <View style={styles.wrapperHeader}>
        <View>
          <Text style={styles.textCategory}>
            {this.props.name || "Thế giới"}
          </Text>
        </View>
        {isShowRightHeader && (
          <View style={styles.rightHeader}>
            {isHaveBookmark && (
              <TouchableOpacity style={styles.buttonTag}>
                <Icon
                  type="evilicon"
                  name="tag"
                  size={26}
                  color={"rgb(72, 72, 72)"}
                />
              </TouchableOpacity>
            )}
            {isViewMore && (
              <TouchableOpacity
                style={styles.buttonViewMore}
                onPress={this.handleViewMore}
              >
                <Text style={{ color: redColor }}>Xem thêm</Text>
                <Icon
                  type="evilicon"
                  name="chevron-right"
                  size={26}
                  color={redColor}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperHeader: {
    width: "100%",
    padding: 10,
    // height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textCategory: {
    // height: '100%',
    borderLeftWidth: 3,
    borderColor: redColor,
    paddingLeft: 10,
    fontSize: widthPercent(5),
    color: fontColor,
    justifyContent: "center",
    fontWeight: "500"
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttonTag: {
    marginRight: 5
  },
  buttonViewMore: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default HeaderListArticles;
