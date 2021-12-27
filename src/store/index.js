import { configureStore } from '@reduxjs/toolkit'
import courseDetailsSlice from './courseDetails-slice'
import userInfoSlice from './userInfo-slice'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { createFilter } from 'redux-persist-transform-filter'
import uiSlice from './ui-slice'
const reducers = combineReducers({
  // userInfo: persistReducer(uidPersistConfig,userInfoSlice.reducer),
  userInfo: userInfoSlice.reducer,
  courses: courseDetailsSlice.reducer,
  ui : uiSlice.reducer,
})
const userFilter = createFilter('userInfo', [
  'uid',
  'inProgressCourses',
  'wishlistedCourses',
  'completedCourses',
])
// const courseFilter = createFilter('courses', [
//   'courseDetail',
// ])
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo'],
  transforms: [userFilter],
}
// const uidPersistConfig = {
//   key: 'userInfo',
//   storage,
//   whitelist:['uid'],

// };

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export default store
