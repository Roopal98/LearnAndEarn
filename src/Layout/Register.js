import { Col, Row } from 'reactstrap'
import classes from './Register.module.css'
import InputForm from './InputForm'
import { useSelector } from 'react-redux'
import CheckAuthState from './CheckAuthState'
import { Fragment } from 'react'
const Register = () => {
  const isLoading = useSelector((state) => state.userInfo.isLoading)

  return (
    <Fragment>
      {isLoading && <CheckAuthState />}
      {!isLoading && (
        <Row>
          <Col>
            <Row className={classes.headmain}>
              <div className={classes.heading}>
                <div className={classes.headingName}>LEARN AND EARN</div>
              </div>
            </Row>
            <Row className={classes.container}>
              <Col
                md="6"
                className={`${classes.backimg} d-none d-md-block`}
                ></Col>
             
              <Col md="5" xs={{ size: 10, offset: 1 }}>
                <InputForm />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default Register
