import classes from './MyCoursesNav.module.css'
import { Col, Nav, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { Fragment } from 'react'
const MyCoursesNav = (props) => {
  const detailsNav = props.navType === 'detailsNav'

  return (
    <Fragment>
      <Nav className={classes.coursesNav}>
        <Col>
          <NavItem>
            {!detailsNav && (
              <NavLink
                exact
                to="/mycourses/inprogress"
                className={classes.inactive}
                activeClassName={classes.active}
              >
                IN PROGRESS
              </NavLink>
            )}
            {detailsNav && (
              <NavLink
                exact
                to={`/course/${props.courseId}/topics`}
                className={classes.inactive}
                activeClassName={classes.active}
              >
                TOPICS
              </NavLink>
            )}
          </NavItem>
        </Col>
        <Col>
          <NavItem>
            {!detailsNav && (
              <NavLink
                exact
                to="/mycourses/completed"
                className={classes.inactive}
                activeClassName={classes.active}
              >
                COMPLETED
              </NavLink>
            )}
            {detailsNav && (
              <NavLink
                exact
                to={`/course/${props.courseId}/preRequisites`}
                className={classes.inactive}
                activeClassName={classes.active}
              >
                PRE-REQUISITES
              </NavLink>
            )}
          </NavItem>
        </Col>
        <Col>
          <NavItem>
            {!detailsNav && (
              <NavLink
                exact
                to="/mycourses/wishlisted"
                className={classes.inactive}
                activeClassName={classes.active}
              >
                WISHLISTED
              </NavLink>
            )}
            {detailsNav && (
              <NavLink
                exact
                to={`/course/${props.courseId}/rewards`}
                className={classes.inactive}
                activeClassName={classes.active}
              >
                REWARDS
              </NavLink>
            )}
          </NavItem>
        </Col>
      </Nav>
    </Fragment>
  )
}

export default MyCoursesNav
