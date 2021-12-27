import SearchIcon from '@material-ui/icons/Search'
import classes from './SearchBanner.module.css'
import { useSelector } from 'react-redux'
const SearchBanner = () => {
  const username = useSelector((state) => state.userInfo.username)
  return (
    <div className={classes.intro}>
      <h3>
        Hello, <span>{username}</span>
      </h3>
      <div className={classes['banner-search']}>
        <div className={classes.searchBarContainer}>
          <div className={classes.searchBar}></div>
          <div className={classes.searchIcon}></div>
          <SearchIcon fontSize="large" />
        </div>
      </div>
    </div>
  )
}

export default SearchBanner
