export const FETCH_TAGS_ARTICLES = 'FETCH_TAGS_ARTICLES';
export const FETCHING_TAGS_ARTICLES = 'FETCHING_TAGS_ARTICLES';
export const FETCHED_TAGS_ARTICLES = 'FETCHED_TAGS_ARTICLES';

export const FETCH_MORE_TAGS_ARTICLES = 'FETCH_MORE_TAGS_ARTICLES';
export const FETCHING_MORE_TAGS_ARTICLES = 'FETCHING_MORE_TAGS_ARTICLES';
export const FETCHED_MORE_TAGS_ARTICLES = 'FETCHED_MORE_TAGS_ARTICLES';
export const FETCHED_MORE_TAGS_ARTICLES_ERROR = 'FETCHED_MORE_TAGS_ARTICLES_ERROR';

export const fetchTagsArticles = ({ limit, page, tag }) => ({
  type: FETCH_TAGS_ARTICLES,
  data: {
    limit, page, tag
  }
});

export const fetchingTagsArticles = () => ({
  type: FETCHING_TAGS_ARTICLES,
});

export const fetchedTagsArticles = ({ list, hasLoadMore }) => ({
  type: FETCHED_TAGS_ARTICLES,
  data: { list, hasLoadMore }
});

// load more
export const fetchMoreTagsArticles = ({ limit, page, tag }) => ({
  type: FETCH_MORE_TAGS_ARTICLES,
  data: {
    limit, page, tag
  }
});

export const fetchingMoreTagsArticles = () => ({
  type: FETCHING_MORE_TAGS_ARTICLES,
});

export const fetchedMoreTagsArticlesError = () => ({
  type: FETCHED_MORE_TAGS_ARTICLES_ERROR,
});