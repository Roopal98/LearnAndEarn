import classes from './MyCourses.module.css'
import { Row } from 'reactstrap'
import Courses from '../Home/Courses'
import { Fragment, useEffect } from 'react'
import MyCoursesNav from './MyCoursesNav'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import EmptyContent from '../UI/EmptyContent'
import { fetchAllUserCourseDetails } from '../../store/courses'
const MyCourses = () => {
  
  const dispatch = useDispatch()
  const inProgressCourses = useSelector(
    (state) => state.userInfo.inProgressCourses,
  )
  const wishlistedCourses = useSelector(
    (state) => state.userInfo.wishlistedCourses,
  )
  const completedCourses = useSelector(
    (state) => state.userInfo.completedCourses,
  )
  const allCourses = useSelector(
    (state) => state.userInfo.allCourses,
  )
  // console.log('entered')
  // console.log(wishlistedCourses)
  
        // console.log(allCourses)
  useEffect(() => {
    allCourses.length>0 && dispatch(fetchAllUserCourseDetails(allCourses))
   
    // console.log('Making api call again')
  }, [allCourses])
  return (
    <Fragment>
      <MyCoursesNav navType="courseNav" />
      <Row className={classes['section-wrapper']}>
        <Route path="/mycourses/inprogress">
          {inProgressCourses.length > 0 && (
            <Fragment>
              {/* <h4>COURSES</h4> */}
              <Courses courseType="inProgress" courses={inProgressCourses}/>
            </Fragment>
          )}
          {inProgressCourses.length < 1 && <EmptyContent />}
        </Route>
        <Route path="/mycourses/completed">
          {completedCourses.length > 0 && <Courses courseType="completed" courses={completedCourses}/>}
          {completedCourses.length < 1 && <EmptyContent />}
        </Route>
        <Route path="/mycourses/wishlisted">
          {wishlistedCourses.length > 0 && <Courses courseType="wishlisted" courses={wishlistedCourses} />}
          {wishlistedCourses.length < 1 && <EmptyContent type="wishlist" />}
        </Route>
      </Row>
    </Fragment>
  )
}

export default MyCourses
