import { put, take, select, call, takeLatest, all } from 'redux-saga/effects';
import {
  fetchingCategoryArticles, fetchedCategoryArticles, fetchingMoreCategoryArticles,
  FETCH_CATEGORY_ARTICLES, FETCH_MORE_CATEGORY_ARTICLES, fetchedMoreCategoryArticlesError
} from './categoryActions';
import { APP_LOADED } from '../root/rootActions';
import { ArticleApi } from '../../api/ApiService';
import { categoryArticlesSelector } from './categorySelector';
import { userSelector } from '../user/userSelector';

function* getCategoryArticles(action) {
  // yield take(APP_LOADED);
  const { limit, page, category_id } = action.data;
  const user = yield select(userSelector);
  const params = { limit, page, category_id };
  if(user && user.id) {
    params.userId = user.id;
  }
  const data = { list : [], hasLoadMore: false };
  yield put(fetchingCategoryArticles());
  try {
    const response = yield call(ArticleApi.getArticleByCategoryId, params);
    data.list = response;
    data.hasLoadMore = response.length >=  16;
    yield put(fetchedCategoryArticles(data));
  } catch (error) {
    console.log("error",error)
    yield put(fetchedCategoryArticles(data));
  }
}

function* getMoreCategoryArticles(action) {
  const { limit, page, category_id } = action.data;
  const user = yield select(userSelector);
  const { list } = yield select(categoryArticlesSelector);
  const params = { limit, page, category_id };
  if(user && user.id) {
    params.userId = user.id;
  }
  yield put(fetchingMoreCategoryArticles());
  try {
    const response = yield call(ArticleApi.getArticleByCategoryId, params);
    const data = {
      list: list.concat(response),
      hasLoadMore: response.length >=  16
    };
    yield put(fetchedCategoryArticles(data));
  } catch (error) {
    console.log(error)
    yield put(fetchedMoreCategoryArticlesError());
  }
}

function* watchGetCategoryArticles(){
  yield takeLatest(FETCH_CATEGORY_ARTICLES, getCategoryArticles)  
}
function* watchGetMoreCategoryArticles(){
  yield takeLatest(FETCH_MORE_CATEGORY_ARTICLES, getMoreCategoryArticles)  
}

export function* categorySaga(){
  yield all([
    watchGetCategoryArticles(),
    watchGetMoreCategoryArticles(),
  ]);
}