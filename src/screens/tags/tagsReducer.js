import * as ActionTypes from './tagsActions';
const initialState = {
  list: [],
  isPending: false,
  hasLoadMore: false,
  isLoadingMore: false,
  page: 1,
  limit: 16,
}

export const tagsReducer = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.FETCH_MORE_TAGS_ARTICLES: 
  case ActionTypes.FETCH_TAGS_ARTICLES: {
    const { page, limit } = action.data;
    return {
      ...state,
      page,
      limit,
    }
  }
  case ActionTypes.FETCHING_TAGS_ARTICLES: {
    return {
      ...state,
      isPending: true,
    }
  }
  case ActionTypes.FETCHED_MORE_TAGS_ARTICLES:
  case ActionTypes.FETCHED_TAGS_ARTICLES: {
    const { list, hasLoadMore } = action.data;
    return {
      ...state,
      isPending: false,
      isLoadingMore: false,
      list,
      hasLoadMore,
    }
  }
  case ActionTypes.FETCHING_MORE_TAGS_ARTICLES: {
    return {
      ...state,
      isLoadingMore: true,
    }
  }
  case ActionTypes.FETCHED_MORE_TAGS_ARTICLES_ERROR: {
    return {
      ...state,
      isLoadingMore: false,
    }
  }

  default:
    return state
  }
}
