import { all, fork } from 'redux-saga/effects'
import { rootSaga } from './screens/root/rootSaga';
import { homeSaga } from './screens/home/homeSaga';
import { userSaga } from './screens/user/userSaga';
import { categorySaga } from './screens/category/categorySaga';
import { articleSaga } from './screens/article/articleSaga';
import { tagsSaga } from './screens/tags/tagsSaga';
export function* appSaga(){
  yield all([
    rootSaga(),
    homeSaga(),
    userSaga(),
    categorySaga(),
    articleSaga(),
    tagsSaga()
  ])
}