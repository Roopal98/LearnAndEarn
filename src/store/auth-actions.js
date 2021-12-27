import { auth } from '../firebase'
import db from '../firebase'
import { userActions } from './userInfo-slice'
import { courseDetailActions } from '../store/courseDetails-slice'
import { uiActions } from './ui-slice'

export const registration = (name, email, password) => {
  // console.log(name)
  // console.log(email)

  return async (dispatch) => {
    dispatch(userActions.setLoading(true))
    const fetchData = async () => {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      // console.log(res)
      const currentUser = res.user
      // console.log(currentUser)
      db.collection('users').doc(currentUser.uid).set({
        userId: currentUser.email,
        username: name,
        completed: [],
        wishlisted: [],
        inProgress: [],
        credits: 0,
      })

      return currentUser
    }
    //    console.log(doc);

    try {
      const user = await fetchData()
      // console.log('registration done')

      dispatch(userActions.setUid(user.uid))
      setTimeout(() => {
        // console.log('setLoading false')

        dispatch(userActions.setLoading(false))
      }, 1000)
    } catch (error) {
      dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Failed',
            message: 'Failed to sign up. Please retry after some time.',
          }),
        );
      dispatch(userActions.setLoading(false))
      // console.log('error1')
      setTimeout(()=>{
        dispatch(uiActions.resetNotification())
      },3000)
    }
  }
}

export const signin = (email, password) => {

  return async (dispatch) => {
    dispatch(userActions.setLoading(true))
    //   dispatch(courseDetailActions.setLoading());
    const fetchData = async () => {
      await auth.signInWithEmailAndPassword(email, password)
      return auth.currentUser.uid
    }
    //    console.log(doc);

    try {
      const user = await fetchData()
      // console.log(user)

      // dispatch(fetchUserData(user))
      dispatch(userActions.setUid(user))
      // dispatch(userActions.setLoading(false))
      // console.log('fetched')
      setTimeout(() => {
        // console.log('setLoading false')

        dispatch(userActions.setLoading(false))
      }, 1000)
      // dispatch(userActions.setLoading(false))

      // console.log(courseData);
    } catch (error) {
      // console.log('error2')
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Failed',
          message: 'Failed to sign in. Please retry with correct username and password.',
        }),
      );
      dispatch(userActions.setLoading(false))
      setTimeout(()=>{
        dispatch(uiActions.resetNotification())
      },3000)
    }
  }
}

export const signout = () => {
  // console.log('signout')
  // console.log(auth.currentUser)
  return async (dispatch) => {
    dispatch(userActions.setLoading(true))
    const fetchData = async () => {
      await auth.signOut()
    }
    //    console.log(doc);

    try {
      await fetchData()
      // console.log('rest3')
      dispatch(userActions.resetState())
      dispatch(courseDetailActions.resetState())
      dispatch(userActions.setLoading(false))
      // console.log(auth.currentUser)
      // console.log(courseData);
    } catch (error) {
      dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Failed',
            message: 'Fetching to sign out',
          }),
        );
      // console.log('error3')
      setTimeout(()=>{
        dispatch(uiActions.resetNotification())
      },3000)
    }
  }
}
