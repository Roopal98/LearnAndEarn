import { userActions } from './userInfo-slice'
import db from '../firebase'
import firebase from 'firebase/compat/app'
import { auth } from '../firebase'
import { uiActions } from './ui-slice'

export const fetchUserData = (currentUser) => {
  // console.log(currentUser)
  return async (dispatch) => {
    const fetchData = async () => {
      const response = db.collection('users').doc(currentUser)
      const doc = await response.get()
      const data = doc.data()
      // console.log(data)
      return data
    }
    try {
      const userData = await fetchData()
      const allCourses =[]
      allCourses.push(...userData.wishlisted)
      userData.inProgress.forEach((obj) => {
      allCourses.push(obj.courseId)
      })
      dispatch(
        userActions.getUserInfo({
          userId: userData.userId,
          username: userData.username,
          credits: userData.credits,
          completed: userData.completed || [],
          inProgress: userData.inProgress || [],
          wishlisted: userData.wishlisted || [],
          allCourses:allCourses || []
        }),
      )
    } catch (error) {
      dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Failed',
            message: 'Failed to fetch user data',
          }),
        );
        setTimeout(()=>{
          dispatch(uiActions.resetNotification())
        },3000)
    }
  }
}

export const saveUserData = (courseId, type) => {
  // console.log('saving data')
  return async (dispatch) => {
    const fetchData = async () => {
      const response = db.collection('users').doc(auth.currentUser.uid)
      // console.log(auth.currentUser.uid)
      type === 'enroll'
        ? await response
            .update({
              inProgress: firebase.firestore.FieldValue.arrayUnion({
                courseId: courseId,
                tasksCompleted: 0,
              }),
              wishlisted: firebase.firestore.FieldValue.arrayRemove(courseId),
            })
            .then(() => {
              dispatch(fetchUserData(auth.currentUser.uid))
            })
            .catch((error) => {})
        : type === 'wishlist'
        ? await response
            .update({
              wishlisted: firebase.firestore.FieldValue.arrayUnion(courseId),
            })
            .then(() => {
              dispatch(fetchUserData(auth.currentUser.uid))
            })
            .catch((error) => {})
        : await response
            .update({
              wishlisted: firebase.firestore.FieldValue.arrayRemove(courseId),
            })
            .then(() => {
              dispatch(fetchUserData(auth.currentUser.uid))
            })
            .catch((error) => {})

      // const jsonData = JSON.stringify(data);
      // console.log(jsonData.userName);
    }
    try {
      await fetchData()
    } catch (error) {
      dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Failed',
            message: 'Failed to save data',
          }),
        );
        setTimeout(()=>{
          dispatch(uiActions.resetNotification())
        },3000)
    }
  }
}
