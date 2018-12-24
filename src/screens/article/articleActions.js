export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const FETCHING_ARTICLE = 'FETCHING_ARTICLE';
export const FETCHED_ARTICLE = 'FETCHED_ARTICLE';

export const FETCH_RELATIVE_ARTICLES = 'FETCH_RELATIVE_ARTICLES';
export const FETCHING_RELATIVE_ARTICLES = 'FETCHING_RELATIVE_ARTICLES';
export const FETCHED_RELATIVE_ARTICLES = 'FETCHED_RELATIVE_ARTICLES';

export const fetchArticle = (article_id) => ({
  type: FETCH_ARTICLE,
  data: article_id,
})
export const fetchingArticle = () => ({
  type: FETCHING_ARTICLE
})
export const fetchedArticle = (data) => ({
  type: FETCHED_ARTICLE,
  data
})