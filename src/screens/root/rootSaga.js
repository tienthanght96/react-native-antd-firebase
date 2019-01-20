import { put, take, call, takeLatest, all } from 'redux-saga/effects';
import { APP_LOADED, fetchedCategories, FETCH_CATEGORY } from './rootActions';
import { CategoryApi } from '../../api/ApiService';
import { setListCategoryFetch } from '../home/homeActions';

function* fetchListCategories(action) {
  // yield take(APP_LOADED);
  try {
    const { userId } = action.data;
    if(!userId){
      const categories = yield call(CategoryApi.getAllCategory);
      yield put(fetchedCategories(categories))
    } else {
      const categories = yield call(CategoryApi.getAllCategoryForUserLogin, userId);
      yield put(fetchedCategories(categories))
    }
    // if(Array.isArray(categories)) {
    //   const topCategoryArticles = {};
    //   categories.forEach(category => {
    //     topCategoryArticles[category.id] = {
    //       isPending: true,
    //       ...category,
    //       list: []
    //     }
    //   });
    //   yield put(setListCategoryFetch(topCategoryArticles))
    // }
  } catch (error) {
    console.log('error', error)
    yield put(fetchedCategories([]))
  }
}

function* watchFetchListCategories() {
  yield takeLatest(FETCH_CATEGORY, fetchListCategories);
}



export function* rootSaga(){
  yield all([
    watchFetchListCategories(),
  ])
}