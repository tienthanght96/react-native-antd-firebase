export const FETCH_CATEGORY_ARTICLES = 'FETCH_CATEGORY_ARTICLES';
export const FETCHING_CATEGORY_ARTICLES = 'FETCHING_CATEGORY_ARTICLES';
export const FETCHED_CATEGORY_ARTICLES = 'FETCHED_CATEGORY_ARTICLES';

export const FETCH_MORE_CATEGORY_ARTICLES = 'FETCH_MORE_CATEGORY_ARTICLES';
export const FETCHING_MORE_CATEGORY_ARTICLES = 'FETCHING_MORE_CATEGORY_ARTICLES';
export const FETCHED_MORE_CATEGORY_ARTICLES = 'FETCHED_MORE_CATEGORY_ARTICLES';
export const FETCHED_MORE_CATEGORY_ARTICLES_ERROR = 'FETCHED_MORE_CATEGORY_ARTICLES_ERROR';

export const fetchCategoryArticles = ({ limit, page, category_id }) => ({
  type: FETCH_CATEGORY_ARTICLES,
  data: {
    limit, page, category_id
  }
});

export const fetchingCategoryArticles = () => ({
  type: FETCHING_CATEGORY_ARTICLES,
});

export const fetchedCategoryArticles = ({ list, hasLoadMore }) => ({
  type: FETCHED_CATEGORY_ARTICLES,
  data: { list, hasLoadMore }
});

// load more
export const fetchMoreCategoryArticles = ({ limit, page, category_id }) => ({
  type: FETCH_MORE_CATEGORY_ARTICLES,
  data: {
    limit, page, category_id
  }
});

export const fetchingMoreCategoryArticles = () => ({
  type: FETCHING_MORE_CATEGORY_ARTICLES,
});

export const fetchedMoreCategoryArticlesError = () => ({
  type: FETCHED_MORE_CATEGORY_ARTICLES_ERROR,
});