export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_MODAL_OVER_FLOW = 'TOGGLE_MODAL_OVER_FLOW';
export const TOGGLE_MODAL_PERSONALIZE = 'TOGGLE_MODAL_PERSONALIZE';
export const TOGGLE_MODAL_LOGIN = 'TOGGLE_MODAL_LOGIN';

export const toggleModal = ({ typeModal, isOpenModal , dataModal }) => ({
  type: TOGGLE_MODAL,
  data: {
    isOpenModal,
    dataModal,
    typeModal
  }
});

export const toggleModalOverflow = ({ isOpenModal, dataModal }) => ({
  type: TOGGLE_MODAL_OVER_FLOW,
  data: {
    isOpenModal,
    dataModal,
  }
})

export const toggleModalPersonalize = ({ isOpenModal, dataModal }) => ({
  type: TOGGLE_MODAL_PERSONALIZE,
  data: {
    isOpenModal,
    dataModal
  }
});

export const toggleModalLogin = ({ isOpenModal, dataModal }) => ({
  type: TOGGLE_MODAL_LOGIN,
  data: {
    isOpenModal,
    dataModal
  }
})
