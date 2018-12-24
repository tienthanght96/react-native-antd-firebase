export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGINING = 'USER_LOGINING';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_LOGIN_STATE = 'UPDATE_LOGIN_STATE';

export const UPDATE_FAVORITE_CATEGORIES = 'UPDATE_FAVORITE_CATEGORIES';
export const UPDATE_FAVORITE_CATEGORIES_SUCCESS = 'UPDATE_FAVORITE_CATEGORIES_SUCCESS';
export const UPDATE_FAVORITE_CATEGORIES_ERRORS = 'UPDATE_FAVORITE_CATEGORIES_ERRORS';
export const UPDATE_FAVORITE_CATEGORIES_PENDING = 'UPDATE_FAVORITE_CATEGORIES_PENDING';

export const FETCH_BOOKMARK_ARTICLES = 'FETCH_BOOKMARK_ARTICLES';
export const FETCHING_BOOKMARK_ARTICLES = 'FETCHING_BOOKMARK_ARTICLES';
export const FETCHED_BOOKMARK_ARTICLES = 'FETCHED_BOOKMARK_ARTICLES';

export const FETCH_MORE_BOOKMARK_ARTICLES = 'FETCH_MORE_BOOKMARK_ARTICLES';
export const FETCHING_MORE_BOOKMARK_ARTICLES = 'FETCHING_MORE_BOOKMARK_ARTICLES';
export const FETCHED_MORE_BOOKMARK_ARTICLES = 'FETCHED_MORE_BOOKMARK_ARTICLES';
export const FETCHED_MORE_BOOKMARK_ARTICLES_ERROR = 'FETCHED_MORE_BOOKMARK_ARTICLES_ERROR';


export const FETCH_HISTORY_ARTICLES = 'FETCH_HISTORY_ARTICLES';
export const FETCHING_HISTORY_ARTICLES = 'FETCHING_HISTORY_ARTICLES';
export const FETCHED_HISTORY_ARTICLES = 'FETCHED_HISTORY_ARTICLES';

export const updateLoginState = ({ routeToBack, title }) => ({
  type: UPDATE_LOGIN_STATE,
  data: {
    routeToBack, title 
  }
});

export const userLogin = (data) => ({
  type: USER_LOGIN,
  data
});

export const userLogining = () => ({
  type: USER_LOGINING,
});

export const userLoginSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  data
});
export const userLoginError = (data) => ({
  type: USER_LOGIN_ERROR,
  data
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
export const updateFavoriteCategory = ({ categorieIds, favorite_categories, callback }) => ({
  type: UPDATE_FAVORITE_CATEGORIES,
  data: { categorieIds, favorite_categories, callback },
});
export const updateFavoriteCategoryPending = () => ({
  type: UPDATE_FAVORITE_CATEGORIES_PENDING,
});
export const updateFavoriteCategorySuccess= (data = []) => ({
  type: UPDATE_FAVORITE_CATEGORIES_SUCCESS,
  data
});

export const fetchBookmarkArticles = ({ page, limit }) => ({
  type: FETCH_BOOKMARK_ARTICLES,
  data: { page, limit }
})
export const fetchingBookmarkArticles = () => ({
  type: FETCHING_BOOKMARK_ARTICLES
})
export const fetchedBookmarkArticles = ({ list, hasLoadMore }) => ({
  type: FETCHED_BOOKMARK_ARTICLES,
  data: { list, hasLoadMore },
})

export const fetchMoreBookmarkArticles = ({ page, limit }) => ({
  type: FETCH_MORE_BOOKMARK_ARTICLES,
  data: { page, limit }
});
export const fetchingMoreBookmarkArticles = () => ({
  type: FETCHING_MORE_BOOKMARK_ARTICLES
})
export const fetchedMoreBookmarkArticlesError = () => ({
  type: FETCHED_MORE_BOOKMARK_ARTICLES,
});

export const fetchHistoryArticles = () => ({
  type: FETCH_HISTORY_ARTICLES,
})
export const fetchingHistoryArticles = () => ({
  type: FETCHING_HISTORY_ARTICLES
})
export const fetchedHistoryArticles = (data) => ({
  type: FETCHED_HISTORY_ARTICLES,
  data
})