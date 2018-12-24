import {
  CLOSE_MODAL,
  OPEN_MODAL,
  UPDATE_MODAL_LOGIN
} from "./actionTypes";

const initialState = {
  "title": "",
  "body": "",
  "image": "",
  "isShow": false,
  "link": "",
  "modalType": "notification",
  modalLogin: {
    isOpen: false,
    title: '',
  }
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_MODAL:
      return Object.assign({}, state, {
        "isShow": true,
        ...action["data"],
        modalLogin: {
          isOpen: false,
          title: '',
        }
      });
    case UPDATE_MODAL_LOGIN:
      return Object.assign({}, state, {
        modalLogin: {
          ...action.data
        }
      });

    case CLOSE_MODAL:
      return Object.assign({}, state, {
        "title": "",
        "body": "",
        "image": "",
        "isShow": false,
        "link": "",
        "modalType": "notification",
        modalLogin: {
          isOpen: false,
          title: '',
        }
      });

    default:
      return state;
  }
};
