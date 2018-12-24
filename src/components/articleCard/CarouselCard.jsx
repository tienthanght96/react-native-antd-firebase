// import React, { Component } from "react";
// import {
//   View, Text, Image, TouchableOpacity,
//   StyleSheet, Dimensions, Platform
// } from "react-native";
// import styles from '../../styles/SliderEntry.style';
// import { ParallaxImage } from "react-native-snap-carousel";

// export default class SliderEntry extends Component {
  
//   get image() {
//     const {
//       data: { illustration },
//       parallax,
//       parallaxProps,
//       even
//     } = this.props;

//     return parallax ? (
//       <ParallaxImage
//         source={{ uri: illustration }}
//         containerStyle={[
//           styles.imageContainer,
//           even ? styles.imageContainerEven : {}
//         ]}
//         style={styles.image}
//         parallaxFactor={0.35}
//         showSpinner={true}
//         spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
//         {...parallaxProps}
//       />
//     ) : (
//       <Image source={{ uri: illustration }} style={styles.image} />
//     );
//   }

//   render() {
//     const {
//       data: { title, subtitle },
//       even
//     } = this.props;

//     const uppercaseTitle = title ? (
//       <Text
//         style={[styles.title, even ? styles.titleEven : {}]}
//         numberOfLines={2}
//       >
//         {title.toUpperCase()}
//       </Text>
//     ) : (
//       false
//     );

//     return (
//       <TouchableOpacity
//         activeOpacity={1}
//         style={styles.slideInnerContainer}
//         onPress={() => {
//           alert(`You've clicked '${title}'`);
//         }}
//       >
//         <View style={styles.shadow} />
//         <View
//           style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
//         >
//           {this.image}
//           <View
//             style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
//           />
//         </View>
//         <View
//           style={[styles.textContainer, even ? styles.textContainerEven : {}]}
//         >
//           {uppercaseTitle}
//           <Text
//             style={[styles.subtitle, even ? styles.subtitleEven : {}]}
//             numberOfLines={2}
//           >
//             {subtitle}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

import React, { Component } from "react";
import {
  View, Text, Image, TouchableOpacity,
} from "react-native";
import { Flex } from "@ant-design/react-native";
import BookmarkArticle from '../bookmarkArticle';
import TotalCommentArticle from "../totalComment";
import styles from '../../styles/SliderEntry.style';
import { withNavigation } from 'react-navigation';
import { ParallaxImage } from "react-native-snap-carousel";
import { styleFlexRow, assets } from "../../utils/config";
import { Icon } from "react-native-elements";
import { widthPercent } from "../../lib/dimensions";

export default withNavigation(class CarouselCard extends Component {
  
  get image() {
    const {
      data: { picture },
      parallax,
      parallaxProps,
      even
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: picture || assets.noImage }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: picture || assets.noImage }} style={styles.image} />
    );
  }

  onHandleBookmarkSuccess = () => {
    if (this.props.data && this.props.data.id) {
      typeof this.props.onHandleBookmarkSuccess === "function" &&
        this.props.onHandleBookmarkSuccess(this.props.data.id);
    }
  };
  onNavigateDetailArticle = () => {
    if (!this.props.data) return;
    this.props.navigation.navigate("ArticleDetail", {
      article_id: this.props.data.id
    });
  };

  render() {
    const {
      data: { title, sapo, date, id, view, checkBookmark },
      even
    } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={this.onNavigateDetailArticle}
      >
        <View style={styles.shadow} />
        <View
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        >
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}
        >
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            {sapo}
          </Text>
          <View style={[styleFlexRow, styles.articleActions]}>
            <View style={[styleFlexRow, { marginRight: 5 }]}>
              <Icon
                type="ionicon"
                name="ios-person"
                size={18}
                color={"#c3c3c3"}
                iconStyle={{ marginRight: 5 }}
              />
              <Text style={even ? { color: '#c3c3c3' } : {}}>{view || 0}</Text>
            </View>
            <TotalCommentArticle
              article_id={id}
              textStyle={{
                color: even ? "#c3c3c3" : "#666", fontSize: widthPercent(4), marginLeft: 5
              }}
            />
            <BookmarkArticle
              iconSize={18}
              iconColor={"#c3c3c3"}
              iconName="ios-bookmark"
              checkBookmark={checkBookmark}
              style={{ ...styleFlexRow, padding: 7 }}
              article_id={id}
              onHandleBookmarkSuccess={this.onHandleBookmarkSuccess}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
})
