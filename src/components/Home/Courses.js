import classes from './Courses.module.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import Card from '../UI/Card'
import LoadingSpinner from '../UI/LoadingSpinner'

const Courses = (props) => {
 
  // const dispatch = useDispatch()
  const userCourseDetail = useSelector((state) => state.courses.userCourses)
  const isLoading = useSelector((state) => state.courses.isLoading)
  const popularCourseDetail = useSelector((state) => state.courses.popularCourses )

  
  // console.log(courseIds)
  // console.log(popularCourseDetail)
  let filteredCourses=[]
if(props.courseType !=='popular'){
// console.log(props.courses)
// console.log(userCourseDetail)
   filteredCourses = userCourseDetail.filter((courseDetail)=>{
    if(props.courseType === 'inProgress') 
        return props.courses.find(
          (x) => x.courseId === courseDetail.courseId,
          )
    
    return props.courses.includes(courseDetail.courseId)
  })

}
// console.log(filteredCourses)

  return (
    <Col className={classes.wrapper}>
      {isLoading && (
        <div className={classes.spinner}>
          <LoadingSpinner />
        </div>
      )}

      <Row>
        {!isLoading &&
          props.courseType !== 'popular' &&
          filteredCourses.map((course) => (
            <Col key={course.courseId}>
              <Card
                key={course.courseId}
                courseId={course.courseId}
                courseType={props.courseType}
                courseName={course.courseName}
                tags={course.tags}
                tasks={
                  props.courseType === 'inProgress'
                    ? props.courses.find(
                        (x) => x.courseId === course.courseId,
                      )
                    : null
                }
              />
            </Col>
          ))}
        {!isLoading &&
          props.courseType === 'popular' &&
          popularCourseDetail.map((course) => (
            <Col key={course.courseId}>
              <Card
                key={course.courseId}
                courseId={course.courseId}
                courseType={props.courseType}
                courseName={course.courseName}
                tags={course.tags}
              />
            </Col>
          ))}
      </Row>
    </Col>
  )
}

export default Courses
