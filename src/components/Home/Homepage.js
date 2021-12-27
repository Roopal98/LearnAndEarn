import classes from './Homepage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import ScoreCard from '../UI/ScoreCard'
import Carousel from '../UI/Carousel'
import { Row, Col } from 'reactstrap'
import SearchBanner from './SearchBanner'
import Courses from './Courses'
import { fetchAllCourseDetails,fetchAllUserCourseDetails } from '../../store/courses'
import { useEffect } from 'react'

const Homepage = () => {
  const dispatch = useDispatch()
  const inProgressCourses = useSelector(
    (state) => state.userInfo.inProgressCourses,
  )
 
  const credits = useSelector((state) => state.userInfo.credits)
  const allUserCourses = useSelector((state) => state.userInfo.allCourses)
  // const courseIds = []
  // console.log(inProgressCourses)
  useEffect(() => {
    // console.log('Homepage')
    dispatch(fetchAllCourseDetails())
    
  }, [])


      // console.log(allUserCourses)
useEffect(() => {
  // console.log('Making api call again')
 
  allUserCourses && allUserCourses.length>0 && dispatch(fetchAllUserCourseDetails(allUserCourses))  
}, [allUserCourses])
  return (
    <Row>
      <Col>
        <Row className={classes.mainCardWrapper}>
          <Col>
            <SearchBanner />

            <div className={classes['banner-wrapper']}>
              <Col>
                <ScoreCard credits={credits} />
              </Col>
              <Col xl={{size:7,offset:1}}>
                <Carousel />
              </Col>
            </div>
          </Col>
        </Row>
        <Row className={classes['section-wrapper']}>
          <Col>
            <Row><h4>POPULAR IN PLAY</h4></Row>
            <Row><Courses courseType="popular" /></Row>
          </Col>
          
          
        </Row>
        {inProgressCourses.length > 0 && (
          <Row className={classes['section-wrapper']}>
            <Col>
              <Row><h4>CONTINUE LEARNING</h4></Row>
              <Row><Courses courseType="inProgress" courses={inProgressCourses} /></Row>
            </Col>
            
            
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default Homepage
