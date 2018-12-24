export const FETCH_MOST_VIEW = 'FETCH_MOST_VIEW';
export const FETCHING_MOST_VIEW = 'FETCHING_MOST_VIEW';
export const FETCHED_MOST_VIEW = 'FETCHED_MOST_VIEW';

export const FETCH_NEWEST = 'FETCH_NEWEST';
export const FETCHING_NEWEST = 'FETCHING_NEWEST';
export const FETCHED_NEWEST = 'FETCHED_NEWEST';
export const FETCH_MORE_NEWEST = 'FETCH_MORE_NEWEST';
export const FETCHED_MORE_NEWEST = 'FETCHED_MORE_NEWEST';
export const FETCH_MORE_NEWEST_ERROR = 'FETCH_MORE_NEWEST_ERROR';

export const FETCH_TOP_CATEGORY= 'FETCH_TOP_CATEGORY';
export const FETCH_ONE_TOP_CATEGORY= 'FETCH_ONE_TOP_CATEGORY';
export const FETCHING_TOP_CATEGORY= 'FETCHING_TOP_CATEGORY';
export const FETCHED_TOP_CATEGORY= 'FETCHED_TOP_CATEGORY';
export const SET_LIST_CATEGORY_FETCH= 'SET_LIST_CATEGORY_FETCH';
export const RESET_LIST_CATEGORY_FETCH= 'RESET_LIST_CATEGORY_FETCH';

export const FETCH_MORE_ONE_TOP_CATEGORY= 'FETCH_MORE_ONE_TOP_CATEGORY';
export const FETCHED_MORE_ONE_TOP_CATEGORY_ERROR= 'FETCHED_MORE_ONE_TOP_CATEGORY_ERROR';
export const FETCHED_MORE_ONE_TOP_CATEGORY= 'FETCHED_MORE_ONE_TOP_CATEGORY';


export const fetchMostView = ({ limit }) => ({
  type: FETCH_MOST_VIEW,
  data: { limit }
});
export const fetchingMostView = () => ({
  type: FETCHING_MOST_VIEW
});
export const fetchedMostView = (data = []) => ({
  type: FETCHED_MOST_VIEW,
  data
});

// moi nhat
export const fetchNewest = ({ limit, page }) => ({
  type: FETCH_NEWEST,
  data: { limit, page }
});
export const fetchingNewest = () => ({
  type: FETCHING_NEWEST
});
export const fetchedNewest = (data = []) => ({
  type: FETCHED_NEWEST,
  data
});
export const fetchMoreNewest = ({ page }) => ({
  type: FETCH_MORE_NEWEST,
  data: { page }
});
export const fetchedMoreNewest = ({ list, hasLoadMore }) => ({
  type: FETCHED_MORE_NEWEST,
  data: { list, hasLoadMore }
});
export const fetchMoreNewestError = () => ({
  type: FETCH_MORE_NEWEST_ERROR,
});

// by top category
export const setListCategoryFetch = (data) => ({
  type: SET_LIST_CATEGORY_FETCH,
  data,
})
export const resetListTopCategory = () => ({
  type: RESET_LIST_CATEGORY_FETCH,
})

export const fetchOneTopCategory = (category, params) => ({
  type: FETCH_ONE_TOP_CATEGORY,
  data: { category, params },
});
export const fetchTopCategory = () => ({
  type: FETCH_TOP_CATEGORY
});

export const fetchingTopCategory = (category_id) => ({
  type: FETCHING_TOP_CATEGORY,
  data: { category_id }
});

export const fetchedTopCategory = ({ category_id, list, params, hasLoadMore }) => ({
  type: FETCHED_TOP_CATEGORY,
  data: {
    category_id,
    list,
    params,
    hasLoadMore
  }
});

//load more one top category
export const fetchMoreOneTopCategory = ({ category_id, page }) => ({
  type: FETCH_MORE_ONE_TOP_CATEGORY,
  data: {
    category_id,
    page
  }
});
export const fetchedMoreOneTopCategory  = ({ category_id, list, hasLoadMore }) => ({
  type: FETCHED_MORE_ONE_TOP_CATEGORY,
  data: { list, hasLoadMore, category_id }
});
export const fetchedMoreOneTopCategoryError  = (category_id) => ({
  type: FETCHED_MORE_ONE_TOP_CATEGORY_ERROR,
  data: { category_id }
});