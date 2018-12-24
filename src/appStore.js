import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import { appReducer } from './appReducer'
import { appSaga } from './appSaga'
import { middlewareNavigation } from './navigators/AppNavigator';

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
 
  return applyMiddleware(...middleware)
}

function configureStore (initialState = {}) {
  const store = createStore(
    appReducer,
    initialState,
    bindMiddleware([sagaMiddleware, middlewareNavigation])
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(appSaga)
  }

  store.runSagaTask()
  return store
}

export default configureStore