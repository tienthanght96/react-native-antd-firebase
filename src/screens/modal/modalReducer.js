import { TOGGLE_MODAL, TOGGLE_MODAL_OVER_FLOW, TOGGLE_MODAL_PERSONALIZE, TOGGLE_MODAL_LOGIN } from "./modalActions";

const initialState = {
  modalPersonalize: {
    isOpenModal: false,
    dataModal: {}
  },
  modalOverflow: {
    isOpenModal: false,
    dataModal: {}
  },
  modalLogin: {
    isOpenModal: false,
    dataModal: {}
  },
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {

  case TOGGLE_MODAL: {
    const { isOpenModal, dataModal, typeModal } = action.data;
    return {
      ...state,
      isOpenModal,
      typeModal,
      dataModal: {
        ...dataModal
      }
    }
  }
  case TOGGLE_MODAL_OVER_FLOW: {
    const { isOpenModal, dataModal } = action.data;
    return {
      ...state,
      modalOverflow: {
        isOpenModal,
        dataModal
      }
    }
  }
  case TOGGLE_MODAL_PERSONALIZE: {
    const { isOpenModal, dataModal } = action.data;
    return {
      ...state,
      modalPersonalize: {
        isOpenModal,
        dataModal
      }
    }
  }
  case TOGGLE_MODAL_LOGIN: {
    const { isOpenModal, dataModal } = action.data;
    return {
      ...state,
      modalLogin: {
        isOpenModal,
        dataModal
      }
    }
  }

  default:
    return state
  }
}
