import { put, take, select, call, takeLatest, all } from 'redux-saga/effects';
import { APP_LOADED } from '../root/rootActions';
import { ArticleApi } from '../../api/ApiService';
import { userSelector } from '../user/userSelector';
import { fetchedArticle, fetchingArticle, FETCH_ARTICLE } from './articleActions';

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

function* watchGetArticle(){
  yield takeLatest(FETCH_ARTICLE, getDetailArticle)  
}

export function* articleSaga(){
  yield all([
    watchGetArticle(),
  ]);
}