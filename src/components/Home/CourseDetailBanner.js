import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import classes from './CourseDetailBanner.module.css'
import { FaStar, FaClock } from 'react-icons/fa'
import { saveUserData } from '../../store/user-actions'
import React from 'react'
const CourseDetailBanner = (props) => {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isWishlisted, setisWishlisted] = useState(false)
  const courseDetailById = useSelector((state) => state.courses.courseDetail)
  
  const dispatch = useDispatch()

  const enrollToCourse = () => {
    setIsEnrolled(true)
    dispatch(saveUserData(courseDetailById.courseId, 'enroll'))
  }

  const wishlistCourse = () => {
    setisWishlisted(true)
    dispatch(saveUserData(courseDetailById.courseId, 'wishlist'))
  }

  const removeWishlist = () => {
    setisWishlisted(false)
    dispatch(saveUserData(courseDetailById.courseId, 'delete'))
  }
  return (
    <Fragment>
      {courseDetailById && (
        <Row>
          <Col className={classes.detail} sm="7">
            <Row>
              <h4>{courseDetailById.courseName}</h4>
            </Row>
            <Row className={classes.items}>
              <Col xs="3">
                <span>
                  <FaStar className={classes.icons} />
                </span>
                <span>{`${courseDetailById.credits} Credits`}</span>
              </Col>
              <Col xs="3">
                <span>
                  <FaClock className={classes.icons} />
                </span>
                <span>{courseDetailById.time}</span>
              </Col>
            </Row>
            <Row>
              <p>{courseDetailById.description}</p>
            </Row>
          </Col>
          <Col sm="5" className={classes.button}>
            {(isEnrolled || props.type === 'inProgress') && (
              <Row className={classes.buttonRow}>
                <button className={classes.ebutton}>RESUME</button>
              </Row>
            )}
            {!isEnrolled &&
              (props.type === 'none' || props.type === 'wishlisted') && (
                <Row className={classes.buttonRow}>
                  <button className={classes.ebutton} onClick={enrollToCourse}>
                    ENROLL
                  </button>
                </Row>
              )}
            {!isEnrolled &&
              !isWishlisted &&
              props.type !== 'inProgress' &&
              props.type !== 'wishlisted' && (
                <Row className={classes.buttonRow}>
                  <button className={classes.wbutton} onClick={wishlistCourse}>
                    WISHLIST
                  </button>
                </Row>
              )}
            {!isEnrolled && (isWishlisted || props.type === 'wishlisted') && (
              <Row className={classes.buttonRow}>
                <button className={classes.wbutton} onClick={removeWishlist}>
                  Remove from Wishlist
                </button>
              </Row>
            )}
            {props.type === 'completed' && (
              <Row className={classes.buttonRow}>
                <button className={classes.ebutton}>COMPLETE</button>
              </Row>
            )}
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default React.memo(CourseDetailBanner)
