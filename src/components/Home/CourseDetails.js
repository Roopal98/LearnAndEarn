import { Route, useHistory } from 'react-router'
import React from 'react'
import { Row, Col } from 'reactstrap'
import CourseDetailBanner from './CourseDetailBanner'
import classes from './CourseDetails.module.css'
import { useSelector } from 'react-redux'
import MyCoursesNav from '../MyCourses/MyCoursesNav'
import CourseTopics from './CourseTopics'
import LoadingSpinner from '../UI/LoadingSpinner'
const CourseDetails = (props) => {
  const history = useHistory();
  const id=props.courseId
  // console.log(props.courseId)
  let type = 'none'
  const courseDetailById = useSelector((state) => state.courses.courseDetail)
  const isLoading = useSelector((state) => state.courses.isLoading)
  const notification = useSelector((state) => state.ui.notification)

  const inProgressCourse = useSelector(
    (state) => state.userInfo.inProgressCourses,
  )
  const completedCourse = useSelector(
    (state) => state.userInfo.completedCourses,
  )
  const wishlistedCourse = useSelector(
    (state) => state.userInfo.wishlistedCourses,
  )

  inProgressCourse.find((obj) => {
    if (obj.courseId === id) {
      type = 'inProgress'
    }
  })

  if (wishlistedCourse.includes(id)) {
    type = 'wishlisted'
  }
  if (completedCourse.includes(id)) {
    type = 'completed'
  }

//  setTimeout(()=>{
//   if(!isLoading && courseDetailById ===null){
//     history.push("/*")
//   }
//  },2000)
 

  return (
    <Row noGutters={true}>
      {isLoading && (
        <div className={classes.spinner}>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && notification && history.push("/home")}
      {!isLoading && !notification &&(
        <Col>
          <Row className={classes.banner}>
            <CourseDetailBanner courseId={id} type={type} />
          </Row>
          <Row>
            <MyCoursesNav navType="detailsNav" courseId={id} />
          </Row>
          <Route path={`/course/${id}/topics`}>
           {courseDetailById && <CourseTopics />}
          </Route>
          <Route path={`/course/${id}/preRequisites`}>
            <Row className={classes.wrapper}>
              {courseDetailById && courseDetailById.preRequisites}
            </Row>
          </Route>
          <Route path={`/course/${id}/rewards`}>
            <Row className={classes.wrapper}>{courseDetailById && courseDetailById.rewards}</Row>
          </Route>
        </Col>
      )}
    </Row>
  )
}

export default CourseDetails;
