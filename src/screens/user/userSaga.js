import { put, all, call, takeLatest, select, take } from 'redux-saga/effects';
import { UserApi, ArticleApi } from '../../api/ApiService';
import {
  userLogining, userLoginSuccess, userLoginError,
  USER_LOGIN, USER_LOGIN_SUCCESS,
  updateFavoriteCategorySuccess, updateFavoriteCategoryPending,
  UPDATE_FAVORITE_CATEGORIES, fetchedBookmarkArticles,
  FETCH_BOOKMARK_ARTICLES, fetchingBookmarkArticles,
  fetchingMoreBookmarkArticles, fetchedMoreBookmarkArticlesError,
  FETCH_MORE_BOOKMARK_ARTICLES, fetchingHistoryArticles,
  fetchedHistoryArticles, FETCH_HISTORY_ARTICLES
} from './userActions';
import { userSelector, bookmarkArticlesSelector } from './userSelector';
import { formatInfoUserToSaveLocal } from '../../utils/utils';
import { saveDirectPath } from '../../lib/firebase/database';
import { toggleModalOverflow } from '../modal/modalActions';
import { appLoaded } from '../root/rootActions';
import { setListCategoryFetch } from '../home/homeActions';
import { storeDataToLocalStorage } from '../../utils/storage';

function* userLoginServer(action){
  const {
    paramsLogin,
    firebaseUser,
    authResponseFb,
    callbackLoginSuccess
  } = action.data;
  yield put(userLogining());
  // yield put(toggleModalOverflow({ isOpenModal: true, dataModal: {} }))
  try {
    const responseServer = yield call(UserApi.login, paramsLogin);
    // format user data
    const dataUserFormated = formatInfoUserToSaveLocal(
      {...authResponseFb , ...firebaseUser},
      responseServer
    );

    // save to firebase
    yield saveDirectPath(`/users/${dataUserFormated.userFirebaseID}`, {...dataUserFormated });
    // save local
    // localStorage.setItem("user", JSON.stringify(dataUserFormated));
    storeDataToLocalStorage("user", JSON.stringify(dataUserFormated));
    typeof callbackLoginSuccess === 'function' && callbackLoginSuccess(dataUserFormated);
    // update in redux store
    yield put(userLoginSuccess(dataUserFormated));
    // hide modal and app loaded
    yield put(toggleModalOverflow({ isOpenModal: false, dataModal: {} }))
    // yield put(appLoaded());
  } catch (error) {
    console.log('error login', error)
    yield put(userLoginError(error.message));
    yield put(toggleModalOverflow({ isOpenModal: false, dataModal: {} }));
    // yield put(appLoaded());
  }
}

function* getFavoriteCategoriesUser() {
  const user = yield select(userSelector);
  // yield put(appLoaded());
  if(user && user.id) {
    yield put(updateFavoriteCategoryPending());
    try {
      const favoriteCategories = yield call(UserApi.getFavoriteCategoryForUser, user.id);
      // console.log('getFavoriteCategoriesUser', favoriteCategories)
      yield put(updateFavoriteCategorySuccess(favoriteCategories));
      if(Array.isArray(favoriteCategories) && favoriteCategories.length > 0) {
       
        const topCategoryArticles = {};
        favoriteCategories.forEach(category => {
          topCategoryArticles[category.id] = {
            isPending: true,
            ...category,
            list: []
          }
        });
        yield put(setListCategoryFetch(topCategoryArticles));
      }
      yield put(appLoaded());
    } catch (error) {
      console.log('error', error)
      yield put(updateFavoriteCategorySuccess([]));
      yield put(appLoaded());
    }
  } else {
    yield put(appLoaded());
  }
}

function* updateFavoriteCategories(action){
  const { categorieIds, favorite_categories, callback } = action.data;
  const user = yield select(userSelector);
  yield put(updateFavoriteCategoryPending());
  try {
    const reponse = yield call(UserApi.updateCategoryForUser, user.id, categorieIds);
    yield put(updateFavoriteCategorySuccess(favorite_categories));
    callback("success");
  } catch (error) {
    callback("error");
    console.log('error', error)
  }
}

function* getBookmarkArticles(action){
  const { limit, page, } = action.data
  const user = yield select(userSelector);
  if(user && user.id) {
    const data = { list : [], hasLoadMore: false };
    yield put(fetchingBookmarkArticles());
    try {
      const response = yield call(ArticleApi.getBookmarkArticles, user.id, { limit, page });
      data.list = response;
      data.hasLoadMore = response.length >=  12;
      yield put(fetchedBookmarkArticles(data));
    } catch (error) {
      yield put(fetchedBookmarkArticles(data));
    }
  }
}

function* getMoreBookmarkArticles(action) {
  const { limit, page } = action.data;
  const user = yield select(userSelector);
  const { list } = yield select(bookmarkArticlesSelector);
  const params = { limit, page };
  yield put(fetchingMoreBookmarkArticles());
  try {
    const response = yield call(ArticleApi.getBookmarkArticles, user.id, params);
    const data = {
      list: list.concat(response),
      hasLoadMore: response.length >=  12
    };
    yield put(fetchedBookmarkArticles(data));
  } catch (error) {
    console.log(error)
    yield put(fetchedMoreBookmarkArticlesError());
  }
}

function* getHistoryArticles(){
  const user = yield select(userSelector);
  if(user && user.id) {
    yield put(fetchingHistoryArticles());
    try {
      const response = yield call(ArticleApi.getHistoryArticles, user.id);
      yield put(fetchedHistoryArticles(response));
    } catch (error) {
      console.log(error)
      yield put(fetchedHistoryArticles([]));
    }
  }
}

function* watchUserLogin() {
  yield takeLatest(USER_LOGIN, userLoginServer)
}

function* watchGetFavoriteCategories() {
  yield takeLatest(USER_LOGIN_SUCCESS, getFavoriteCategoriesUser)
}

function* watchUpdateFavoriteCategories() {
  yield takeLatest(UPDATE_FAVORITE_CATEGORIES, updateFavoriteCategories)
}
function* watchBookmarkArticles() {
  yield takeLatest(FETCH_BOOKMARK_ARTICLES, getBookmarkArticles)
}
function* watchMoreBookmarkArticles() {
  yield takeLatest(FETCH_MORE_BOOKMARK_ARTICLES, getMoreBookmarkArticles)
}
function* watchHistorykArticles() {
  yield takeLatest(FETCH_HISTORY_ARTICLES, getHistoryArticles)
}

export function* userSaga(){
  yield all([
    watchUserLogin(),
    watchGetFavoriteCategories(),
    watchUpdateFavoriteCategories(),
    watchBookmarkArticles(),
    watchMoreBookmarkArticles(),
    watchHistorykArticles(),
  ])
}