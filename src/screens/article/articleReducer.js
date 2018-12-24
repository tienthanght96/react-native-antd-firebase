import * as ActionTypes from './articleActions'
const initialState = {
  articleDetail: null,
  isPending: false,
  relativeArticles: [],
  startAt: null,
  isPendingRelative: false
}

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.FETCHING_ARTICLE:
    return {
      ...state,
      isPending: true,
    }
  case ActionTypes.FETCHED_ARTICLE:
    return {
      ...state,
      isPending: false,
      articleDetail: action.data,
    }

  default:
    return state
  }
}
