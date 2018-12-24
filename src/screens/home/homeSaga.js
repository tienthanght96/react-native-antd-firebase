import { take, put, call, takeLatest, fork, all, select } from 'redux-saga/effects';
import { map } from 'lodash'
import { APP_LOADED } from '../root/rootActions';
import { ArticleApi } from '../../api/ApiService';
import {
  fetchedMostView, fetchedNewest, fetchingMostView,
  fetchingNewest, FETCH_NEWEST, FETCH_MOST_VIEW,
  fetchedMoreNewest, fetchMoreNewestError, FETCH_MORE_NEWEST,
  FETCH_TOP_CATEGORY, fetchedTopCategory,
  setListCategoryFetch, resetListTopCategory, FETCH_ONE_TOP_CATEGORY, fetchingTopCategory, fetchedMoreOneTopCategory, fetchedMoreOneTopCategoryError, FETCH_MORE_ONE_TOP_CATEGORY,
} from './homeActions';
import { getNewestSeletor, getTopCategorySelector } from './homeSelector';
import { userSelector, userFavoriteCategoriesSelector } from '../user/userSelector';
import { USER_LOGIN_SUCCESS } from '../user/userActions';
import { allCategoriesSelector } from '../root/rootSelector';

function* getMostView(action) {
  const { limit } = action.data;
  // yield take(APP_LOADED);
  yield put(fetchingMostView());
  try {
    
    const response = yield call(ArticleApi.getMostTopView, limit);
    yield put(fetchedMostView(response));

  } catch (error) {
    console.log(error)
    yield put(fetchedMostView([]));
  }
}

function* getNewest(action) {
  const { limit, page } = action.data;
  const user = yield select(userSelector);
  const userId = user && user.id ? user.id : null;
  // yield take(APP_LOADED);
  yield put(fetchingNewest());
  try {
    
    const response = yield call(ArticleApi.getNewestListArticle, page, limit, userId);
    yield put(fetchedNewest(response));
  } catch (error) {
    yield put(fetchedNewest([]));
  }
}
function* getMoreNewest(action) {
  const { page } = action.data;
  const { limit, list } = yield select(getNewestSeletor)
  try {
    const user = yield select(userSelector);
    const userId = user && user.id ? user.id : null;
    const response = yield call(ArticleApi.getNewestListArticle, page, limit, userId);
    if(Array.isArray(response)){
      yield put(fetchedMoreNewest({
        list: list.concat(response),
        hasLoadMore: response.length >= 10
      }));
    } else {
      yield put(fetchMoreNewestError());
    }
  } catch (error) {
    yield put(fetchMoreNewestError());
  }
}

function* loadTopCategoryItem(category){
  const data = { list: [], category_id: category.id, hasLoadMore: false };
  try {
    // yield put(fetchingTopCategory(category.id));
    const params = { limit: 20, page: 1 };
    const user = yield select(userSelector);
    const userId = user && user.id ? user.id : null;
    if(userId) {
      params.userId = userId;
    }
    // console.log('params', params)
    const response = yield call(ArticleApi.getTopArticleByCategoryId, category.id, params);
    data.hasLoadMore = response.length >=20;
    data.list = response;
    // console.log({ response })
    yield put(fetchedTopCategory(data));    
  } catch (error) {
    // console.log('err fetchedTopCategory', error)
    yield put(fetchedTopCategory(data));    
  }
}
function* loadMoreOneTopCategoryItem(category_id){
  const data = { list: [], category_id, hasLoadMore: false };
  const topCategoryArticles = yield select(getTopCategorySelector);
  try {
    const { page, list } = topCategoryArticles[category_id];
    const params = { limit: 50, page };
    const user = yield select(userSelector);
    const userId = user && user.id ? user.id : null;
    if(userId) {
      params.userId = userId;
    }
    const response = yield call(ArticleApi.getTopArticleByCategoryId, category_id, params);
    data.list = list.concat(response);
    data.hasLoadMore = response.length >=50 ;
    console.log(response, params)
    // yield put(fetchedMoreOneTopCategory(data));    
  } catch (error) {
    console.log(error)
    // yield put(fetchedMoreOneTopCategoryError(category_id));    
  }
}

function* getTopCategory(){
  // yield take(APP_LOADED);
  const topCategoryArticles = {}
  yield put(resetListTopCategory());
  const allCategories = yield select(allCategoriesSelector);
  const favoriteCategories = yield select(userFavoriteCategoriesSelector);
  // console.log('favoriteCategories', favoriteCategories)
  if(Array.isArray(favoriteCategories) && favoriteCategories.length > 0) {
    favoriteCategories.forEach(category => {
      topCategoryArticles[category.id] = {
        isPending: true,
        ...category,
        limit: 20,
        page: 1,
        hasLoadMore: false,
        isLoadingMore: false,
        list: []
      }
    });
  } else {
    allCategories.forEach(category => {
      topCategoryArticles[category.id] = {
        isPending: true,
        ...category,
        limit: 20,
        page: 1,
        hasLoadMore: false,
        isLoadingMore: false,
        list: []
      }
    });
  }
  yield put(setListCategoryFetch(topCategoryArticles));
  // yield all(map(topCategoryArticles, item => call(loadTopCategoryItem, item)));
}

function* getOneTopCategory(action) {
  const { category } = action.data;
  yield call(loadTopCategoryItem, category)
}

function* getMoreOneTopCategory(action) {
  const { category_id } = action.data;
  console.log('category', category_id)
  yield call(loadMoreOneTopCategoryItem, category_id)
}

function* watchGetMostView() {
  yield takeLatest([FETCH_MOST_VIEW, USER_LOGIN_SUCCESS], getMostView)
}

function* watchGetNewest() {
  yield takeLatest(FETCH_NEWEST, getNewest)
}
function* watchGetMoreNewest() {
  yield takeLatest(FETCH_MORE_NEWEST, getMoreNewest)
}

function* watchGetTopCategory() {
  yield takeLatest(FETCH_TOP_CATEGORY, getTopCategory)
}
function* watchGetOneTopCategory() {
  yield takeLatest(FETCH_ONE_TOP_CATEGORY, getOneTopCategory)
}
function* watchMoreGetOneTopCategory() {
  yield takeLatest(FETCH_MORE_ONE_TOP_CATEGORY, getMoreOneTopCategory)
}

export function* homeSaga(){
  yield all([
    watchGetMostView(),
    watchGetNewest(),
    watchGetMoreNewest(),
    watchGetTopCategory(),
    watchGetOneTopCategory(),
    watchMoreGetOneTopCategory()
  ])
}