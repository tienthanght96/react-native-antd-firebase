import { put, take, select, call, takeLatest, all } from 'redux-saga/effects';
import { APP_LOADED } from '../root/rootActions';
import { ArticleApi } from '../../api/ApiService';
import { userSelector } from '../user/userSelector';
import {
  fetchedArticle, fetchingArticle, FETCH_ARTICLE,
  fetchingRelativeArticles, fetchedRelativeArticles,
  fetchedMoreRelativeArticles, FETCH_RELATIVE_ARTICLES, FETCH_MORE_RELATIVE_ARTICLES
} from './articleActions';
import { relativeArticlesSelector } from './articleSelector';

function* getDetailArticle(action) {
  const article_id  = action.data;
  const user = yield select(userSelector);
  const userId = user && user.id ? user.id : null;
  yield put(fetchingArticle());
  try {
    const response = yield call(ArticleApi.getDetailArticle, article_id, userId);
    yield put(fetchedArticle(response));
  } catch (error) {
    console.log(error)
    yield put(fetchedArticle({}));
  }
}

function* getRelativeArticles(action) {
  const { article_id } = action.data;
  try {
    yield put(fetchingRelativeArticles());
    const response = yield call(ArticleApi.getRelativeArticles, article_id, null);
    const hasLoadMore = response.length >= 17;
    yield put(fetchedRelativeArticles({ list: response, hasLoadMore }));
  } catch (error) {
    yield put(fetchedRelativeArticles({ list: [], hasLoadMore: false }));
  }
}

function* getMoreRelativeArticles(action) {
  const { article_id } = action.data;
  try {
    const { list } = yield select(relativeArticlesSelector);
    const startIndex = list.length > 0 ? list[list.length -1].id : null;
    const response = yield call(ArticleApi.getRelativeArticles, article_id, startIndex);
    const hasLoadMore = response.length >= 17;
    yield put(fetchedRelativeArticles({ list: list.concat(response), hasLoadMore }));
  } catch (error) {
    console.log('error', error)
    yield put(fetchedMoreRelativeArticles());
  }
}

function* watchGetArticle(){
  yield takeLatest(FETCH_ARTICLE, getDetailArticle)  
}

function* watchGetRelativeArticles() {
  yield takeLatest(FETCH_RELATIVE_ARTICLES, getRelativeArticles)
}

function* watchGetMoreRelativeArticles() {
  yield takeLatest(FETCH_MORE_RELATIVE_ARTICLES, getMoreRelativeArticles)
}

export function* articleSaga(){
  yield all([
    watchGetArticle(),
    watchGetRelativeArticles(),
    watchGetMoreRelativeArticles(),
  ]);
}