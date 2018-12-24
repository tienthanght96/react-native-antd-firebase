export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCHED_CATEGORY = 'FETCHED_CATEGORY';

export const APP_LOAD = 'APP_LOAD';
export const APP_LOADED = 'APP_LOADED';

export const appLoading = () => ({
  type: APP_LOAD,
});

export const appLoaded = () => ({
  type: APP_LOADED,
});

export const fetchCategories = () => ({
  type: FETCH_CATEGORY,
});

export const fetchedCategories = (data) => ({
  type: FETCHED_CATEGORY,
  data,
});