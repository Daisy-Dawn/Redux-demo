const redux = require('redux');
const { createStore, applyMiddleware } = redux;
const createSagaMiddleware = require('redux-saga').default;
const axios = require('axios');
const { put, takeEvery, all, call } = require('redux-saga/effects');

const initialState = {
  loading: false,
  users: [],
  error: ''
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequested = () => ({
  type: FETCH_USERS_REQUESTED
});

const fetchUsersSucceeded = users => ({
  type: FETCH_USERS_SUCCEEDED,
  payload: users
});

const fetchUsersFailed = error => ({
  type: FETCH_USERS_FAILED,
  payload: error
});

function* fetchUsersSaga() {
    try {
      const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
      const users = response.data.map(user => user.name);
      yield put(fetchUsersSucceeded(users));
    } catch (error) {
      yield put(fetchUsersFailed(error.message));
    }
  }
  

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS_REQUESTED, fetchUsersSaga);
}

function* rootSaga() {
  yield all([
    watchFetchUsers()
    // Add other sagas here if needed
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsersRequested());