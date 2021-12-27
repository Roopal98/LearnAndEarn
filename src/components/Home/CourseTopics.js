import { Col, List, Row } from 'reactstrap'
import classes from './CourseTopics.module.css'
import { useSelector } from 'react-redux'
const CourseTopics = () => {
  const courseDetailById = useSelector((state) => state.courses.courseDetail)
  const inProgressCourses = useSelector((state) => state.userInfo.inProgressCourses)
  let viewContent =false
  function courseExists(courseId) {
    return inProgressCourses.some(function(el) {
      return el.courseId === courseId;
    }); 
  }

  if(courseExists(courseDetailById.courseId)){
    viewContent=true
  
  }
  return (
    <Row className={classes.wrapper} noGutters={true}>
      <Col sm="4">
        <List type="unstyled" className={classes.list}>
          {courseDetailById.topics.map((topic) => (
            <li key={topic}>
              <span className={`${classes.icon} ${classes.locked}`}></span>
              <span>{topic}</span>
            </li>
          ))}
        </List>
      </Col>
      <Col sm="8" className={classes.courseOverview}>
        <Row className={classes.firstContent}>
       {!viewContent && <div className={classes.overlay}></div>}
          <h2>{`${courseDetailById.courseName} - Course Overview`}</h2>

          <div>
            {courseDetailById.courseOverview.map((para) => (
              <p>{para}</p>
            ))}
          </div>
          <hr></hr>
        </Row>
        <Row>
         {!viewContent && <div className={classes.progressStatus}>
            <p>Enroll to view full content</p>
            {/* <button><span>ENROLL</span></button> */}
          </div>}
        </Row>
      </Col>
    </Row>
  )
}

export default CourseTopics
