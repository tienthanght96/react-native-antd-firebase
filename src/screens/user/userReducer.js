import * as ActionTypes from "./userActions";

const initialState = {
  user: null,
  isLogin: false,
  profile: null,
  favorite_categories: [],
  isFetchedFavoriteCategories: false,
  isLogging: false,
  isUpdattingFavoriteCategories: false,
  messageLogin: null,
  bookmarkArticles: {
    isPending: false,
    list: [],
    limit: 12,
    page: 1,
    isLoadingMore: false,
    hasLoadMore: false,
  },
  historyArticles: {
    isPending: false,
    list: []
  },
  loginState: {
    routeToBack: '/',
    title: '',
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  
  case ActionTypes.UPDATE_LOGIN_STATE: {
    const { routeToBack, title } = action.data;
    return {
      ...state,
      loginState: {
        routeToBack,
        title,
      }
    }
  }
  case ActionTypes.USER_LOGIN_SUCCESS: {
    return {
      ...state,
      user: action.data,
      isLogin: true,
    }
  }
  case ActionTypes.USER_LOGIN_ERROR: {
    return {
      ...state,
      user: null,
      isLogin: false,
      messageLogin: action.data
    }
  }
  case ActionTypes.USER_LOGOUT: {
    return {
      ...state,
      user: null,
      isLogin: false,
      favorite_categories: [],
    }
  }
  case ActionTypes.UPDATE_FAVORITE_CATEGORIES_PENDING: {
    return {
      ...state,
      isUpdattingFavoriteCategories: true,
    }
  }
  case ActionTypes.UPDATE_FAVORITE_CATEGORIES_SUCCESS: {
    return {
      ...state,
      isUpdattingFavoriteCategories: false,
      favorite_categories: action.data,
      isFetchedFavoriteCategories: true,
    }
  }
  case ActionTypes.FETCH_MORE_BOOKMARK_ARTICLES:
  case ActionTypes.FETCH_BOOKMARK_ARTICLES: {
    const { limit, page } = action.data;
    return {
      ...state,
      bookmarkArticles: {
        ...state.bookmarkArticles,
        isLoadingMore: true,
        limit,
        page,
      },
    }
  }
  case ActionTypes.FETCHING_BOOKMARK_ARTICLES: {
    return {
      ...state,
      bookmarkArticles: {
        ...state.bookmarkArticles,
        isPending: true,
      },
    }
  }
  case ActionTypes.FETCHED_MORE_BOOKMARK_ARTICLES: 
  case ActionTypes.FETCHED_BOOKMARK_ARTICLES: {
    const { list, hasLoadMore } = action.data;
    return {
      ...state,
      bookmarkArticles: {
        ...state.bookmarkArticles,
        list,
        isPending: false,
        isLoadingMore: false,
        hasLoadMore,
      },
    }
  }
  case ActionTypes.FETCHING_MORE_BOOKMARK_ARTICLES: {
    return {
      ...state,
      bookmarkArticles: {
        ...state.bookmarkArticles,
        isLoadingMore: true,
      },
    }
  }
  case ActionTypes.FETCHED_MORE_BOOKMARK_ARTICLES_ERROR: {
    return {
      ...state,
      bookmarkArticles: {
        ...state.bookmarkArticles,
        isLoadingMore: false,
      },
    }
  }
  case ActionTypes.FETCHING_HISTORY_ARTICLES: {
    return {
      ...state,
      historyArticles: {
        ...state.historyArticles,
        isPending: true,
      },
    }
  }
  case ActionTypes.FETCHED_HISTORY_ARTICLES: {
    return {
      ...state,
      historyArticles: {
        list: action.data,
        isPending: false,
      },
    }
  }
  default:
    return state
  }
}
