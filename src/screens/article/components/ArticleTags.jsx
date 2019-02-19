import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { redColor } from '../../../utils/config';
import { widthPercent } from '../../../lib/dimensions';

export const TagsArticles = ({tags, navigation }) => {
  if(!Array.isArray(tags) || tags.length < 1) return null;
  return (
    <View style={styles.tags}>
      <Icon
        type="ionicon"
        name="ios-pricetag"
        size={18}
        color={"#c3c3c3"}
        iconStyle={{ marginRight: 5 }}
      />
      <Text style={{ marginRight: 5 }}>
        Tags:
      </Text>
      { tags.map((tag, index) => (
          <TouchableOpacity style={styles.tag} key={index} onPress={() => navigation.navigate("Tags", { tag, title: tag })}>
            <Text style={styles.textTag}>{tag}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  tag: {
    backgroundColor: redColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
    marginBottom: 5,
    borderRadius: 5, 
  },
  textTag: {
    fontSize: widthPercent(3.2),
    color: '#fff'
  }
});