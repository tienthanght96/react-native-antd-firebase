import { put, take, select, call, takeLatest, all } from 'redux-saga/effects';
import {
  fetchingTagsArticles, fetchedTagsArticles, fetchingMoreTagsArticles,
  FETCH_TAGS_ARTICLES, FETCH_MORE_TAGS_ARTICLES, fetchedMoreTagsArticlesError
} from './tagsActions';
import { ArticleApi } from '../../api/ApiService';
import { tagsArticlesSelector } from './tagsSelector';
import { userSelector } from '../user/userSelector';

function* getTagsArticles(action) {
  const { limit, page, tag } = action.data;
  const user = yield select(userSelector);
  const params = { limit, page };
  if(user && user.id) {
    params.userId = user.id;
  }
  const data = { list : [], hasLoadMore: false };
  yield put(fetchingTagsArticles());
  try {
    const response = yield call(ArticleApi.getRecommendTagsArticles, tag, params);
    data.list = response;
    data.hasLoadMore = response.length >=  16;
    yield put(fetchedTagsArticles(data));
  } catch (error) {
    console.log(error)
    yield put(fetchedTagsArticles(data));
  }
}

function* getMoreTagsArticles(action) {
  const { limit, page, tag } = action.data;
  const user = yield select(userSelector);
  const { list } = yield select(tagsArticlesSelector);
  const params = { limit, page };
  if(user && user.id) {
    params.userId = user.id;
  }
  yield put(fetchingMoreTagsArticles());
  try {
    const response = yield call(ArticleApi.getRecommendTagsArticles, tag, params);
    const data = {
      list: list.concat(response),
      hasLoadMore: response.length >=  16
    };
    yield put(fetchedTagsArticles(data));
  } catch (error) {
    console.log(error)
    yield put(fetchedMoreTagsArticlesError());
  }
}

function* watchGetTagsArticles(){
  yield takeLatest(FETCH_TAGS_ARTICLES, getTagsArticles)  
}
function* watchGetMoreTagsArticles(){
  yield takeLatest(FETCH_MORE_TAGS_ARTICLES, getMoreTagsArticles)  
}

export function* tagsSaga(){
  yield all([
    watchGetTagsArticles(),
    watchGetMoreTagsArticles(),
  ]);
}