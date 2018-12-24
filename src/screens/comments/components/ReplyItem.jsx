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
import { ReplyConsumer } from "../../../context/ReplyCommentContext";
import { formatCommentReplyTime } from "../../../utils/utils";

class ReplyItem extends Component {

  
  render() {
    const { reply } = this.props;

    if (!reply || !reply.reply_id) return null;

    return (
      <ReplyConsumer>
        {({ handleDeleteReply }) => (
          <View style={styles.replyItemContainer}>
            <ListItem
              roundAvatar
              avatar={{ uri: reply.picture }}
              title={
                <View
                  style={[
                    styleFlexRow,
                    styleFlexRowSpaceBetween,
                    { marginHorizontal: 10 }
                  ]}
                >
                  <Text style={{ fontWeight: "500", color: "#333" }}>
                    {reply.username}
                  </Text>
                  {reply.reply_date && (
                    <Text style={{ fontSize: widthPercent(4), color: "#666" }}>
                      {formatCommentReplyTime(reply.reply_date)}
                    </Text>
                  )}
                </View>
              }
              subtitle={
                <View style={[{ marginHorizontal: 10 }]}>
                  <Text style={{ fontSize: widthPercent(4), color: "#666" }}>
                    {reply.reply_content}
                  </Text>
                </View>
              }
              containerStyle={styles.replyItem}
              hideChevron
            />
          </View>
        )}
      </ReplyConsumer>
    );
  }
}
const styles = StyleSheet.create({
  replyItemContainer: {
   paddingLeft: 7,
  },
  replyItem: {
    borderBottomColor: "#ddd",
    backgroundColor: '#fff',
    marginLeft: 7,
    borderLeftColor: redColor,
    borderLeftWidth: 2,
  }
})
const mapStateToProps = state => ({
  user: userSelector(state)
});
export default withNavigation(connect(mapStateToProps)(ReplyItem));
