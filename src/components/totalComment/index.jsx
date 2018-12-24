import React, { PureComponent } from "react";
import { isEmpty } from "lodash";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getDirectData } from "../../lib/firebase/database";
import { widthPercent } from "../../lib/dimensions";

class TotalCommentArticle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalComment: 0
    };
  }

  componentDidMount() {
    this.getTotalComment();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.article_id !== prevProps.article_id &&
      this.props.article_id
    ) {
      this.getTotalComment();
    }
  }

  getTotalComment = () => {
    const { article_id } = this.props;

    if (!article_id) {
      this.setState({ totalComment: 0 });
      return;
    }
    const pathNode = `articles/${article_id}/article_comments/`;
    // if(this.isUnmounted) return;
    getDirectData(pathNode, response => {
      if (response && !isEmpty(response) && Object.keys(response).length > 0) {
        if(this.isUnmounted) return;
        this.setState({ totalComment: Object.keys(response).length });
      }
    });
  };

  componentWillUnmount() {
    this.isUnmounted = true;
  }
  

  render() {
    const { totalComment } = this.state;
    const { iconColor, iconSize, textStyle } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.action, styles.totalComment]}
        onPress={this.onNavigateToComemnt}
      >
        <Icon
          type="ionicon"
          name="ios-chatbubbles"
          size={iconSize || 18}
          color={iconColor || "#bbb"}
        />
        <Text
          style={
            textStyle
              ? textStyle
              : { color: "#666", fontSize: widthPercent(3), marginLeft: 5 }
          }
        >
          {totalComment}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  action: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row"
  }
});

export default TotalCommentArticle;
