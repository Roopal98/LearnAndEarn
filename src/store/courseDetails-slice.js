import { createSlice } from '@reduxjs/toolkit'

const courseDetailsSlice = createSlice({
  name: 'courseDetails',
  initialState: {
    userCourses: [], //array of obj
    popularCourses: [],
    courseDetail: null,
    isLoading: false,
  },
  reducers: {
    getCourseDetails(state, actions) {
      const courseDetail = actions.payload

      courseDetail.type === 'userData'
        ? (state.userCourses = courseDetail.userCourses)
        : (state.popularCourses = courseDetail.popularCourses)
      // console.log(state.userCourses)
      state.isLoading = false
      // console.log(state.isLoading)
    },
    setLoading(state,actions) {
      state.isLoading = actions.payload
    },
    getCourseDetailById(state, actions) {
      // console.log('inside');
      const courseDetail = actions.payload
      // console.log(courseDetail);
      state.courseDetail = courseDetail.details
      state.isLoading = false
      // console.log(state.courseDetail);
    },
    resetState(state){
      state.userCourses=[];
      state.popularCourses=[];
      state.courseDetail=null
    }
  },
})
export const courseDetailActions = courseDetailsSlice.actions
export default courseDetailsSlice
