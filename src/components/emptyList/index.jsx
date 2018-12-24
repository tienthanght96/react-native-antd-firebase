import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex } from "@ant-design/react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { redColor } from '../../utils/config';
import { widthPercent } from '../../lib/dimensions';
export default function EmptyList(){
  return (
    <View style={styles.container}>
      <Flex direction="column">
        <Flex.Item style={{ paddingBottom: 10 }}>
          <Ionicons
            name={'ios-cube' }
            size={40}
            style={{ color: redColor }}
          />
        </Flex.Item>
        <Flex.Item>
          <Text style={styles.textNodata}>Không có dữ liệu !</Text>
        </Flex.Item>
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textNodata: {
    fontSize: widthPercent(4.5),
    color: redColor,
    fontWeight: '500',
  }
})