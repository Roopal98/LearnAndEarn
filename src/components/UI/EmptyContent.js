import classes from './EmptyContent.module.css'
import { Link } from 'react-router-dom'
const EmptyContent = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <img
          src="https://play.fresco.me/9dada2a175c2875ec75ce64928745c86.svg"
          alt="No Courses"
        />
        <div className={classes.txtContainer}>
          {props.type !== 'wishlist' && <div>Start Earning Credits!</div>}
          {props.type === 'wishlist' && <div>Start wishing for more!</div>}
          {props.type === 'wishlist' && (
            <p>
              Add topics of interest to your wishlist &amp; earn miles/credits
              on completion.
            </p>
          )}
          {props.type !== 'wishlist' && (
            <p>
              Challenge yourself, complete pending topics and see the credits
              rolling!
            </p>
          )}
          <Link to="/home">
            <span>Explore Courses</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmptyContent
