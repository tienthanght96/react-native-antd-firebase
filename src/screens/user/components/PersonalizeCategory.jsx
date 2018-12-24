import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { isEmpty, isEqual } from "lodash";
import { connect } from "react-redux";
import { Modal, ActivityIndicator, Button, Toast, Provider } from "@ant-design/react-native";

import { widthPercent } from "../../../lib/dimensions";
import { redColor } from "../../../utils/config";
// import { updateFavoriteCategory } from "./Actions";
import { allCategoriesSelector } from "../../root/rootSelector";
import { userFavoriteCategoriesSelector, userSelector, isUpdatingFavoriteCategoriesSelector } from "../userSelector";
import { modalPersonalizeSelector } from "../../modal/modalSelector";
import { toggleModalPersonalize } from "../../modal/modalActions";
import { updateFavoriteCategory } from "../userActions";
import { sleep } from "../../../utils/utils";
import { withAppLoaded } from "../../../hocs/withAppLoaded";


class PersonalizeCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: 1,
          code: "thegioi",
          name: "Thế giới",
          icon: "globe",
          selected: false
        },
        {
          id: 2,
          code: "thoisu",
          name: "Thời sự",
          icon: "planet",
          selected: false
        },
        {
          id: 3,
          code: "kinhdoanh",
          name: "Kinh doanh",
          icon: "briefcase",
          selected: false
        },
        {
          id: 4,
          code: "giaitri",
          name: "Giải trí",
          icon: "images",
          selected: false
        },
        {
          id: 5,
          code: "thethao",
          name: "Thể thao",
          icon: "bicycle",
          selected: false
        },
        {
          id: 6,
          code: "phapluat",
          name: "Pháp luật",
          icon: "megaphone",
          selected: false
        },
        {
          id: 7,
          code: "giaoduc",
          name: "Giáo dục",
          icon: "school",
          selected: false
        },
        {
          id: 8,
          code: "giadinh",
          name: "Gia đình",
          icon: "contacts",
          selected: false
        },
        {
          id: 9,
          code: "dulich",
          name: "Du lịch",
          icon: "subway",
          selected: false
        },
        {
          id: 10,
          code: "khoahoc",
          name: "Khoa học",
          icon: "search",
          selected: false
        },
        {
          id: 11,
          code: "sohoa",
          name: "Số hóa",
          icon: "phone-portrait",
          selected: false
        },
        {
          id: 12,
          code: "xe",
          name: "Xe",
          icon: "car",
          selected: false
        },
        {
          id: 13,
          code: "congdong",
          name: "Cộng đồng",
          icon: "people",
          selected: false
        },
        {
          id: 14,
          code: "tamsu",
          name: "Tâm sự",
          icon: "mic",
          selected: false
        }
      ]
    };
  }

  componentDidMount() {
    this._handleInitFavotiteCategory(this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.favorite_categories, prevProps.favorite_categories) ||
      !isEqual(this.props.categories, prevProps.categories)
    ) {
      this._handleInitFavotiteCategory();
    }
  }

  _handleInitFavotiteCategory = (props = this.props) => {
    // const { categories, favorite_categories } = props;
    const { favorite_categories } = props;
    const { categories } = this.state;
    if (!isEmpty(categories)) {
      const categorieFavoriteIds = favorite_categories.map(cate => cate.id);
      const tempCategories = [];

      categories.forEach(category => {
        if (categorieFavoriteIds.indexOf(category.id) > -1) {
          tempCategories.push({ ...category, selected: true });
        } else {
          tempCategories.push({ ...category, selected: false });
        }
      });
      this.setState({ categories: tempCategories });
    }
  };

  _handleSelectFavoriteCategory = categoryId => () => {
    const { categories } = this.state;
    const newCategories = categories.map((category, i) => {
      if (category) {
        if (categoryId === category.id)
          return { ...category, selected: category.selected ? false : true };
        return category;
      }
    });
    this.setState({ categories: newCategories });
  };

  callbackUpdateFavoriteCategories = async (type) => {
    if(type === 'success') {
      // Toast.success('Cập nhật danh mục thành công !', 1);
      // await sleep(2500);
      this.props.navigation.navigate('Home', { reloadAll: true });
      return;
    }
    Toast.fail('Cập nhật danh mục lỗi, hãy thử lại !');
  }

  submitHandler = async () => {
    const { categories } = this.state;
    const favorite_categories = [];

    categories.forEach(category => {
      if (category && category.selected) {
        favorite_categories.push(category);
      }
      return;
    });
    const user = this.props.user || null;

    if (!user) return;

    const categorieIds = favorite_categories.map(cate => cate.id);
    this.props.updateFavoriteCategory({
      categorieIds,
      favorite_categories,
      callback: this.callbackUpdateFavoriteCategories
    });
  };

  render() {
    const { categories } = this.state;
    const { isUpdatingFavoriteCategories } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
        <Provider>
          <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <View style={styles.headerModal}>
                <Text style={styles.titleModal}>Chào bạn</Text>
                <Text style={styles.subtitleModal}>Hãy lựa chọn danh mục yêu thích</Text>
              </View>
              <View style={styles.listCategory}>
                {categories.map(category => (
                  <TouchableOpacity
                    onPress={this._handleSelectFavoriteCategory(category.id)}
                    key={category.id}
                    // style={styles.categoryItem}
                    style={styles.categoryItem}
                  >
                    <Icon
                      type="ionicon"
                      name={"ios-" + category.icon}
                      size={40}
                      color={category.selected ? redColor : "#333"}
                    />
                    <Text
                      style={[
                        styles.categoryItemText,
                        { color: category.selected ? redColor : "#333" }
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <Button
            onPress={this.submitHandler}
            style={styles.buttonSave}
            loading={isUpdatingFavoriteCategories}
            disabled={isUpdatingFavoriteCategories}
          >
            <Text style={styles.buttonSaveText}>Hoàn tất</Text>
          </Button>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerModal: {
    paddingRight: 20,
    marginTop: 30
  },
  titleModal: {
    fontSize: widthPercent(5),
    color: "#333",
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitleModal: {
    textAlign: "center"
  },
  listCategory: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%"
  },
  categoryItem: {
    // flex: 0.33,
    width: "33.33%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  categoryItemText: {
    textAlign: "center",
    fontSize: widthPercent(4.25),
    color: "#333"
  },
  buttonSave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: redColor,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSaveText: {
    color: "#fff",
    fontSize: widthPercent(4.5),
    // fontWeight: 'bold',
    textAlign: "center"
  }
});


const mapStateToProps = state => {
  return {
    categories: allCategoriesSelector(state),
    favorite_categories: userFavoriteCategoriesSelector(state),
    modalPersonalize: modalPersonalizeSelector(state),
    user: userSelector(state),
    isUpdatingFavoriteCategories: isUpdatingFavoriteCategoriesSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  toggleModal: ({ isOpenModal, dataModal }) =>
    dispatch(toggleModalPersonalize({ isOpenModal, dataModal })),
  updateFavoriteCategory: (data) =>
    dispatch(updateFavoriteCategory(data))
});

export default withAppLoaded(
  connect(mapStateToProps, mapDispatchToProps)(PersonalizeCategory)
);
