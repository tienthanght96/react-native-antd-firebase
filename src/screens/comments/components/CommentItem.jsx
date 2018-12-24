import React, { Component } from "react";
import { isEmpty, map, isEqual } from "lodash";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import { withNavigation } from 'react-navigation'
import {
  redColor,
  styleFlexRowSpaceBetween,
  styleFlexRow
} from "../../../utils/config";
import { ListItem } from "react-native-elements";
import { Icon } from 'react-native-elements';
import { widthPercent } from "../../../lib/dimensions";
import { userSelector } from "../../user/userSelector";
import { CommentConsumer } from "../../../context/CommentContext";
import { WhiteSpace, Flex } from "@ant-design/react-native";
import { formatCommentReplyTime } from "../../../utils/utils";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowReply: false,
      listReply: []
    };
  }

  handleNavigateReply = (handleReplySuccess) => () => {
    this.props.navigation.navigate("ListReplyComment", {
      comment: this.props.comment,
      article_id: this.props.article_id,
      handleReplySuccess: handleReplySuccess
    });
  };

  render() {
    const { comment } = this.props;

    if (!comment || !comment.comment_id) return null;

    return (
      <CommentConsumer>
        {({ handleReplySuccess }) => (
          <View>
            <ListItem
              roundAvatar
              avatar={{ uri: comment.picture }}
              title={
                <View
                  style={[
                    styleFlexRow,
                    styleFlexRowSpaceBetween,
                    { marginHorizontal: 10 }
                  ]}
                >
                  <Text style={{ fontWeight: "500", color: "#333" }}>
                    {comment.username}
                  </Text>
                  {comment.comment_date && (
                    <Text style={{ fontSize: widthPercent(4), color: "#666" }}>
                      {formatCommentReplyTime(comment.comment_date)}
                    </Text>
                  )}
                </View>
              }
              subtitle={
                <View style={[{ marginHorizontal: 10 }]}>
                  <Text style={{ fontSize: widthPercent(4), color: "#666" }}>
                    {comment.comment_content}
                  </Text>
                  <Flex>

                    {!isEmpty(comment.reply_comments) && (
                      <TouchableOpacity style={{ marginRight: 20 }} onPress={this.handleNavigateReply(handleReplySuccess)}>
                        <WhiteSpace/>
                        <Flex>
                          <Icon
                            type="ionicon"
                            name="ios-chatboxes"
                            size={20}
                            color={redColor}
                            iconStyle={{marginRight: 5}}
                          />
                          <Text style={{ textAlign: 'left', color: redColor, fontWeight: '400' }}>Có {Object.keys(comment.reply_comments).length} phản hồi </Text>
                        </Flex>
                      </TouchableOpacity>
                      )
                    }
                    <TouchableOpacity onPress={this.handleNavigateReply(handleReplySuccess)}>
                      <WhiteSpace/>
                      <Flex>
                        <Icon
                          type="ionicon"
                          name="ios-redo"
                          size={20}
                          color={redColor}
                          iconStyle={{marginRight: 5}}
                        />
                        <Text style={{ textAlign: 'left', color: redColor, fontWeight: '400' }}>Phản hồi </Text>
                      </Flex>
                    </TouchableOpacity>
                  </Flex>
                </View>
              }
              containerStyle={{ borderBottomColor: "#ddd", backgroundColor: '#fff' }}
              hideChevron
            >
            </ListItem>
          </View>
        )}
      </CommentConsumer>
    );
  }
}
const mapStateToProps = state => ({
  user: userSelector(state)
});
export default withNavigation(connect(mapStateToProps)(CommentItem));
