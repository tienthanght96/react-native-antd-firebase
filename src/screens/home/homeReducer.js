import * as ActionTypes from './homeActions';

const initialState = {
  mostViewsArticles: {
    isPending: false,
    list: [],
    limit: 10
  },
  newestArticles: {
    isPending: false,
    list: [],
    limit: 10,
    page: 1,
    isLoadingMore: false,
    hasLoadMore: false,
  },
  recomendTopicArticles: {
    isPending: false,
    list: [],
  },
  topCategoryArticles: {},
}

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.FETCH_NEWEST: {
    const { limit, page } = action.data;
    return {
      ...state,
      newestArticles: {
        ...state.newestArticles,
        limit: limit || state.newestArticles.limit,
        page: page || state.newestArticles.page,
      }
    }
  }
  case ActionTypes.FETCHING_NEWEST: {
    return {
      ...state,
      newestArticles: {
        ...state.newestArticles,
        isPending: true
      }
    }
  }
  case ActionTypes.FETCHED_NEWEST: {
    return {
      ...state,
      newestArticles: {
        ...state.newestArticles,
        isPending: false,
        list: action.data,
        isLoadingMore: false,
        hasLoadMore: (action.data.length >= 4)
      }
    }
  }
  
  case ActionTypes.FETCH_MORE_NEWEST: {
    const { page } = action.data;
    return {
      ...state,
      newestArticles: {
        ...state.newestArticles,
        page,
        isLoadingMore: true,
      }
    }
  }
  case ActionTypes.FETCHED_MORE_NEWEST: {
    return {
      ...state,
      newestArticles: {
        ...state.newestArticles,
        isLoadingMore: false,
        list: action.data.list,
        hasLoadMore: action.data.hasLoadMore
      }
    }
  }
  case ActionTypes.FETCH_MORE_NEWEST_ERROR: {
    return {
      ...state,
      newestArticles: {
        ...state.newestArticles,
        isLoadingMore: false,
      }
    }
  }
  case ActionTypes.FETCH_MOST_VIEW: {
    const { limit } = action.data;
    return {
      ...state,
      mostViewsArticles: {
        ...state.mostViewsArticles,
        limit: limit || state.mostViewsArticles.limit,
      }
    }
  }
  case ActionTypes.FETCHING_MOST_VIEW: {
    return {
      ...state,
      mostViewsArticles: {
        ...state.mostViewsArticles,
        isPending: true,
      }
    }
  }
  case ActionTypes.FETCHED_MOST_VIEW: {
    return {
      ...state,
      mostViewsArticles: {
        ...state.mostViewsArticles,
        isPending: false,
        list: action.data,
      }
    }
  }
  case ActionTypes.SET_LIST_CATEGORY_FETCH: {
    return {
      ...state,
      topCategoryArticles: action.data,
    }
  }
  case ActionTypes.RESET_LIST_CATEGORY_FETCH: {
    return {
      ...state,
      topCategoryArticles: {},
    }
  }
  case ActionTypes.FETCHING_TOP_CATEGORY: {
    const currentCategory = state.topCategoryArticles[action.category_id];
    return {
      ...state,
      topCategoryArticles: {
        ...state.topCategoryArticles,
        [action.category_id]: {
          ...currentCategory,
          limit: 20,
          isPending: true,
        }
      },
    }
  }
  case ActionTypes.FETCHED_TOP_CATEGORY: {
    const { list, category_id, hasLoadMore, page } = action.data;
    const currentCategory = state.topCategoryArticles[category_id];
    return {
      ...state,
      topCategoryArticles: {
        ...state.topCategoryArticles,
        [category_id]: {
          ...currentCategory,
          limit: 20,
          list,
          isPending: false,
          hasLoadMore 
        }
      },
    }
  }
// load more danh category articles
  case ActionTypes.FETCH_MORE_ONE_TOP_CATEGORY: {
    const { category_id, page } = action.data;
    console.log('FETCH_MORE_ONE_TOP_CATEGORY', action.data)
    const currentCategory = state.topCategoryArticles[category_id];
    return {
      ...state,
      topCategoryArticles: {
        ...state.topCategoryArticles,
        [category_id]: {
          ...currentCategory,
          isLoadingMore: true,
          page 
        }
      },
    }
  }
  case ActionTypes.FETCHED_MORE_ONE_TOP_CATEGORY: {
    const { category_id, list, hasLoadMore } = action.data;
    const currentCategory = state.topCategoryArticles[category_id];
    return {
      ...state,
      topCategoryArticles: {
        ...state.topCategoryArticles,
        [category_id]: {
          ...currentCategory,
          isLoadingMore: false,
          hasLoadMore,
          list,
        }
      },
    }
  }
  case ActionTypes.FETCHED_MORE_ONE_TOP_CATEGORY_ERROR: {
    const { category_id } = action.data;
    const currentCategory = state.topCategoryArticles[category_id];
    return {
      ...state,
      topCategoryArticles: {
        ...state.topCategoryArticles,
        [category_id]: {
          ...currentCategory,
          isLoadingMore: false,
        }
      },
    }
  }
  
  case ActionTypes.FETCHING_RECOMMEND_TOPIC: {
    return {
      ...state,
      recomendTopicArticles: {
        ...state.recomendTopicArticles,
        isPending: true
      }
    }
  }
  case ActionTypes.FETCHED_RECOMMEND_TOPIC: {
    return {
      ...state,
      recomendTopicArticles: {
        isPending: false,
        list: action.data,
      }
    }
  }

  default:
    return state
  }
}
