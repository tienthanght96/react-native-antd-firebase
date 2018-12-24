import * as ActionTypes from './rootActions';

const initialState = {
  appLoaded: false,
  isAppLoading: false,
  categories: [],
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.APP_LOAD:
    return {
      ...state,
      appLoaded: false,
      isAppLoading: true,
    }
  case ActionTypes.APP_LOADED:{
    return {
      ...state,
      appLoaded: true,
      isAppLoading: false,
    }
  }
  case ActionTypes.FETCHED_CATEGORY:
    return {
      ...state,
      categories: action.data
    }

  default:
    return state
  }
}
