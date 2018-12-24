import * as ActionTypes from './categoryActions';
const initialState = {
  list: [],
  isPending: false,
  hasLoadMore: false,
  isLoadingMore: false,
  page: 1,
  limit: 16,
}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.FETCH_MORE_CATEGORY_ARTICLES: 
  case ActionTypes.FETCH_CATEGORY_ARTICLES: {
    const { page, limit } = action.data;
    return {
      ...state,
      page,
      limit,
    }
  }
  case ActionTypes.FETCHING_CATEGORY_ARTICLES: {
    return {
      ...state,
      isPending: true,
    }
  }
  case ActionTypes.FETCHED_MORE_CATEGORY_ARTICLES:
  case ActionTypes.FETCHED_CATEGORY_ARTICLES: {
    const { list, hasLoadMore } = action.data;
    return {
      ...state,
      isPending: false,
      isLoadingMore: false,
      list,
      hasLoadMore,
    }
  }
  case ActionTypes.FETCHING_MORE_CATEGORY_ARTICLES: {
    return {
      ...state,
      isLoadingMore: true,
    }
  }
  case ActionTypes.FETCHED_MORE_CATEGORY_ARTICLES_ERROR: {
    return {
      ...state,
      isLoadingMore: false,
    }
  }

  default:
    return state
  }
}
