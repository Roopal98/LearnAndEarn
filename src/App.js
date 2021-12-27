import './App.css'
import React from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Homepage from './components/Home/Homepage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from './store/user-actions'
import Navbar from './components/UI/Navbar'
import { Fragment, useEffect } from 'react'
import MyCourses from './components/MyCourses/MyCourses'
import CourseDetails from './components/Home/CourseDetails'
import Register from './Layout/Register'
import { fetchCourseDetailById } from './store/courses'
import PageNotFound from './components/UI/PageNotFound'
import Notification from './components/UI/Notification'
import {Row,Col} from 'reactstrap'
function App() {
  const user = useSelector((state) => state.userInfo.uid)
  const notification = useSelector((state) => state.ui.notification);
  // const history = useHistory()
  // console.log(user)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  let courseId=0;
  if(pathname.includes('/course/')){
     courseId = pathname.substring(8, 10)
    // console.log(courseId)
  }
  
  useEffect(() => {
    if (user) {
      // console.log('fetchUserData')
      dispatch(fetchUserData(user))
      // dispatch(fetchAllCourseDetails())
    }
  }, [user])

useEffect(()=>{
  if(pathname.includes('/course/')){
    // console.log('dispatching')
      dispatch(fetchCourseDetailById(courseId))    
  }
},[courseId])
 
  return (
    <Fragment>
      {user && <Navbar />}
      <div className={!user ? 'registerLayout' : 'appLayout'}>
        
        <div className="app">
        {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/register" />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              {user && <Homepage />}
              {!user && <Redirect to="/register" />}
            </Route>
            <Route path="/mycourses">
              <MyCourses />
            </Route>
            <Route path="/course/:id">
              <CourseDetails courseId={courseId}/>
            </Route>
            <Route path='*'>
             <PageNotFound />
            </Route>
          </Switch>
        </div>
       
        
      </div>
    </Fragment>
  )
}

export default App
