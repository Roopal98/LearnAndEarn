import { createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    uid: null,
    username: null,
    userId: null,
    credits: 0,
    inProgressCourses: [],
    completedCourses: [],
    wishlistedCourses: [],
    isLoading: false,
    allCourses:[]
  },
  reducers: {
    getUserInfo(state, actions) {
      const userDetails = actions.payload
      state.username = userDetails.username
      state.userId = userDetails.userId
      state.credits = userDetails.credits

      state.inProgressCourses = userDetails.inProgress

      state.completedCourses = userDetails.completed

      state.wishlistedCourses = userDetails.wishlisted
      
      state.allCourses = userDetails.allCourses
     
      // console.log(state.allCourses)
    },
    setLoading(state, actions) {
      state.isLoading = actions.payload
    },
    setUid(state, actions) {
      state.uid = actions.payload
    },
    resetState(state) {
      // console.log('reset')
      state.uid = null
      state.username = null
      state.userId = null
      state.credits = 0
      state.inProgressCourses = []
      state.completedCourses = []
      state.wishlistedCourses = []
      state.isLoading = false
    },
  },
})
export const userActions = userInfoSlice.actions
export default userInfoSlice
