export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const FETCHING_ARTICLE = 'FETCHING_ARTICLE';
export const FETCHED_ARTICLE = 'FETCHED_ARTICLE';

export const FETCH_RELATIVE_ARTICLES = 'FETCH_RELATIVE_ARTICLES';
export const FETCHING_RELATIVE_ARTICLES = 'FETCHING_RELATIVE_ARTICLES';
export const FETCHED_RELATIVE_ARTICLES = 'FETCHED_RELATIVE_ARTICLES';

export const FETCH_MORE_RELATIVE_ARTICLES = 'FETCH_MORE_RELATIVE_ARTICLES';
export const FETCHING_MORE_RELATIVE_ARTICLES = 'FETCHING_MORE_RELATIVE_ARTICLES';
export const FETCHED_MORE_RELATIVE_ARTICLES = 'FETCHED_MORE_RELATIVE_ARTICLES';
export const FETCHED_MORE_RELATIVE_ARTICLES_ERROR = 'FETCHED_MORE_RELATIVE_ARTICLES_ERROR';

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

// get relative articles
export const fetchRelativeArticles = ({ article_id }) => ({
  type: FETCH_RELATIVE_ARTICLES,
  data: { article_id }
});

export const fetchingRelativeArticles = () => ({
  type: FETCHING_RELATIVE_ARTICLES,
});

export const fetchedRelativeArticles = ({ hasLoadMore, list }) => ({
  type: FETCHED_RELATIVE_ARTICLES,
  data: { list, hasLoadMore }
});

// get more relative articles
export const fetchMoreRelativeArticles = ({ article_id }) => ({
  type: FETCH_MORE_RELATIVE_ARTICLES,
  data: { article_id }
});

export const fetchingMoreRelativeArticles = () => ({
  type: FETCHING_MORE_RELATIVE_ARTICLES,
});

export const fetchedMoreRelativeArticles = () => ({
  type: FETCHED_MORE_RELATIVE_ARTICLES_ERROR,
});