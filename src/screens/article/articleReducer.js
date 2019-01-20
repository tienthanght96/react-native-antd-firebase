import * as ActionTypes from './articleActions'
const initialState = {
  articleDetail: null,
  isPending: false,
  startAt: null,
  relativeArticles: {
    startIndex: null,
    list: [],
    isPending: false,
    hasLoadMore: false,
    isLoadingMore: false
  },
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
    case ActionTypes.FETCHING_RELATIVE_ARTICLES: {
      return {
        ...state,
        relativeArticles: {
          ...state.relativeArticles,
          list: [],
          isPending: true,
        }
      }
    }
    case ActionTypes.FETCHED_RELATIVE_ARTICLES: {
      const { list, hasLoadMore } = action.data;
      return {
        ...state,
        relativeArticles: {
          ...state.relativeArticles,
          isPending: false,
          list,
          hasLoadMore,
          isLoadingMore: false,
        }
      }
    }
    case ActionTypes.FETCH_MORE_RELATIVE_ARTICLES: {
      return {
        ...state,
        relativeArticles: {
          ...state.relativeArticles,
          isLoadingMore: true,
        }
      }
    }
    case ActionTypes.FETCHED_MORE_RELATIVE_ARTICLES_ERROR: {
      return {
        ...state,
        relativeArticles: {
          ...state.relativeArticles,
          isLoadingMore: false,
          hasLoadMore: false,
        }
      }
    }
  default:
    return state
  }
}
