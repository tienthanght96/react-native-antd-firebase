import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { redColor } from '../../utils/config';
import { CommentConsumer } from '../../context/CommentContext';

export default withNavigation (
  class ButtonCommentContainer extends React.Component {
    onNavigateToComemnt = (article_id, handleAddCommentSuccess) => () => {
      this.props.navigation.navigate("ListComment", { article_id, handleAddCommentSuccess });
    }
    render(){
      return (
        <CommentConsumer>
          { ({ totalComment, article_id, handleAddCommentSuccess }) => (
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.action, styles.totalComment]}
                onPress={this.onNavigateToComemnt(article_id, handleAddCommentSuccess)}
              >
                <Icon
                  type="ionicon"
                  name="ios-chatbubbles"
                  size={24}
                  color="#bbb"
                />
                { (totalComment > 0) &&
                    <Text style={styles.bageNumber}>{totalComment}</Text>
                }
              </TouchableOpacity>
            )
          }
        </CommentConsumer>
      );
    }
  }
)

const styles = StyleSheet.create({
  action: {
    paddingHorizontal: 10,
    alignItems: "center",
    position: "relative"
  },
  bageNumber: {
    position: "absolute",
    backgroundColor: redColor,
    fontSize: 11,
    zIndex: 1,
    width: 17,
    height: 17,
    borderRadius: 8.5,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    top: 0,
    right: 5
  }
});
