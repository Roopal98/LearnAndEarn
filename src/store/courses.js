import db from '../firebase'
import { courseDetailActions } from '../store/courseDetails-slice'
import { uiActions } from './ui-slice'
export const fetchAllUserCourseDetails = (courseIds) => {
  // console.log(courseIds)
  
  return async (dispatch) => {
    dispatch(courseDetailActions.setLoading(true))
    const fetchData = async () => {
      // const courseIdLength = courseIds.length
      const response =
        db.collection('courses').where('courseId', 'in', courseIds)
          
      const doc = await response.get().then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())

        // console.log(data)

        return  data 
      })
      return doc
    }
    try {
      // console.log('step1')
      const  data= await fetchData()

      // console.log(courseData);
       dispatch(
            courseDetailActions.getCourseDetails({
              userCourses: data,
              type: 'userData',
            }),
          )
          dispatch(courseDetailActions.setLoading(false))
    } catch (error) {
      dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Failed',
            message: 'Failed to load user courses.',
          }),
        );
        dispatch(courseDetailActions.setLoading(false))
      // console.log('error')
      setTimeout(()=>{
        dispatch(uiActions.resetNotification())
      },3000)
    }
  }
}


export const fetchAllCourseDetails = () => {
  
  return async (dispatch) => {
    dispatch(courseDetailActions.setLoading(true))
    const fetchData = async () => {
      
      const response =
        
           db.collection('courses')
      const doc = await response.get().then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())

        // console.log(data)

        return  data
      })
      return doc
    }
    try {
      // console.log('step1')
      const  data= await fetchData()

      // console.log(courseData);
       dispatch(
            courseDetailActions.getCourseDetails({
              popularCourses: data,
              type: 'popularData',
            }),
          )

          dispatch(courseDetailActions.setLoading(false))
    } catch (error) {
      dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Failed',
            message: 'Failed to load all courses.',
          }),
        );
        dispatch(courseDetailActions.setLoading(false))
      // console.log('error')
      setTimeout(()=>{
        dispatch(uiActions.resetNotification())
      },3000)
    }
  }
}





export const fetchCourseDetailById = (courseId) => {
  return async (dispatch) => {
    dispatch(courseDetailActions.setLoading(true))
    const fetchData = async () => {
      const response = db.collection('courses').doc(courseId)
      const doc = await response.get()
      const data = doc.data()
      // console.log('checking')
      // console.log(data)

      return data

      //    console.log(doc);
    }
    try {
      const data = await fetchData()

      // console.log(data)
      data && dispatch(
        courseDetailActions.getCourseDetailById({
          details: data,
        }),
      )
      
     if(!data){
        dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Failed',
          message: 'No Course Found',
        }),
      );
      dispatch(courseDetailActions.setLoading(false))
      setTimeout(()=>{
        dispatch(uiActions.resetNotification())
      },3000)
      
    }
    } catch (error) {
      dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Failed',
            message: 'Failed to load data',
          }),
        );
      // console.log('error')
      dispatch(courseDetailActions.setLoading(false))
      setTimeout(()=>{
        dispatch(uiActions.resetNotification())
      },3000)
    }
  }
}
