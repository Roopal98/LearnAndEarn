import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import LocalParkingIcon from '@material-ui/icons/LocalParking'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Nav, NavItem } from 'reactstrap'
import { signout } from '../../store/auth-actions'
import { useDispatch } from 'react-redux'
import { Fragment } from 'react'
const Navbar = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(signout())
  }

  return (
    <Fragment>
      <Nav vertical className={classes.nav}>
        <NavItem>
          <NavLink to="/home">
            <div className={classes.logo}>
              <LocalParkingIcon
                fontSize="large"
                style={{ transition: 'all ease 450ms' }}
              />
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/home">
            <div>
              <HomeIcon
                fontSize="large"
                style={{ transition: 'all ease 450ms' }}
              />
            </div>
            <span className={classes.caret}></span>
            <span className={classes.tooltip}>Home</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink to="/explore">
            <div>
              <ExploreIcon
                fontSize="large"
                style={{ transition: 'all ease 450ms' }}
              />
            </div>
            <span className={classes.caret}></span>
            <span className={classes.tooltip}>Explore</span>
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink to="/mycourses/inprogress">
            <div>
              <MenuBookIcon
                fontSize="large"
                style={{ transition: 'all ease 450ms' }}
              />
            </div>
            <span className={classes.caret}></span>
            <span className={classes.tooltip}>My Courses</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register">
            <div>
              <ExitToAppIcon
                fontSize="large"
                style={{ transition: 'all ease 450ms' }}
                onClick={logoutHandler}
              />
            </div>
            <span className={classes.caret}></span>
            <span className={classes.tooltip}>Logout</span>
          </NavLink>
        </NavItem>
      </Nav>
    </Fragment>
  )
}

export default Navbar
