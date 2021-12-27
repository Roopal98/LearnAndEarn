import { Fragment } from 'react'
import classes from './Card.module.css'
import { Progress } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { BsAwardFill } from 'react-icons/bs'
const Card = (props) => {
  const history = useHistory()
  // const dispatch = useDispatch()

  const courseDetails = () => {
    // dispatch(fetchCourseDetailById(props.courseId))
    // console.log('card.js')
    const path = '/course/' + props.courseId + '/topics'
    history.push(path)
  }
  return (
    <div
      className={props.courseType !== 'popular' ? classes['progress-card'] : classes.card }
      onClick={courseDetails}
    >
      {props.courseType === 'popular' && (
        <Fragment>
          <div className={classes.header}>
            <p className={classes.entityType}>COURSE</p>
            <p className={classes.title}>{props.courseName}</p>
          </div>
          <div className={classes.footer}>
            <p>Try our popular courses</p>
            <span className={classes.tags}>
              {props.tags.map((tag) => (
                <span className={classes.internaltags} key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </Fragment>
      )}
      {props.courseType !== 'popular' && (
        <Fragment>
          <div className={classes.header}>
            <p className={classes.entityType}>COURSE</p>
            <p className={classes.title}>{props.courseName}</p>
          </div>
          <div className={classes.footer}>
            {props.tasks != null && (
              <p>{props.tasks.tasksCompleted} of 7 Tasks completed</p>
            )}
            {props.courseType === 'wishlisted' && (
              <p>
                <FaHeart className={classes.icons} />
                <span>Wishlisted</span>
              </p>
            )}
            {props.courseType === 'completed' && (
              <p>
                <BsAwardFill className={classes.icons} />
                <span>Yayy! You completed the course.</span>
              </p>
            )}
            {props.tasks != null && (
              <Progress value={3} max={100} color="info"></Progress>
            )}
          </div>
        </Fragment>
      )}
    </div>
  )
}
export default Card
