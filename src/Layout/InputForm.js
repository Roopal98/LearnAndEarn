import { useState } from 'react'
import { Row } from 'reactstrap'
import classes from './InputForm.module.css'
import useInput from '../hooks/use-input'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { registration, signin } from '../store/auth-actions'
const InputForm = () => {
  const [isSignup, setIsSignup] = useState(true)
  const dispatch = useDispatch()
  const isNotEmpty = (value) => value.trim() !== ''
  const isEmail = (value) => value.includes('@')

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty)

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty)
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail)

  let formIsValid = false

  if (isSignup && nameIsValid && passwordIsValid && emailIsValid) {
    formIsValid = true
  }
  if (!isSignup && passwordIsValid && emailIsValid) {
    formIsValid = true
  }

  const submitHandler = (event) => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }
    if (isSignup) {
      dispatch(registration(nameValue, emailValue, passwordValue))
      // setIsLoading(true);
    } else {
      dispatch(signin(emailValue, passwordValue))
      // setIsLoading(true)
    }
    resetName()
    resetPassword()
    resetEmail()
  }

  const signHandler = () => {
    setIsSignup(!isSignup)
    resetName()
    resetPassword()
    resetEmail()
  }

  const nameInputClass = nameHasError
    ? classes['error-form-input']
    : classes['form-input']
  const emailInputClass = emailHasError
    ? classes['error-form-input']
    : classes['form-input']
  const passwordInputClass = passwordHasError
    ? classes['error-form-input']
    : classes['form-input']

  return (
    <Fragment>
      <Row className={classes.sign}>
        {isSignup && <div>Sign Up</div>}
        {!isSignup && <div>Sign In</div>}
      </Row>
      <Row>
        <div className={classes.signup}>
          <div className={classes['signup-header']}>
            {isSignup && <p>Create your account</p>}
          </div>
          <form onSubmit={submitHandler}>
            <div className={classes['signup-form-group']}>
              {isSignup && (
                <input
                  placeholder="Name"
                  className={nameInputClass}
                  type="text"
                  id="name"
                  value={nameValue}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                />
              )}
              {nameHasError && <p>Name must not be empty</p>}
            </div>
            <div className={classes['signup-form-group']}>
              <input
                type="text"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                placeholder="Email Address"
                id="email"
                className={emailInputClass}
              />
              {emailHasError && <p>Please enter a valid email address</p>}
            </div>
            <div className={classes['signup-form-group']}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                className={passwordInputClass}
              />
              {passwordHasError && <p>Please enter a valid password</p>}
            </div>
            <div className={classes['signup-form-group']}>
              {isSignup && <button color="info">Sign Up</button>}
              {!isSignup && <button color="info">Sign In</button>}
            </div>
            <div className={classes['signup-form-group']}>
              {isSignup && <span onClick={signHandler}>Have an account?</span>}
              {!isSignup && (
                <span onClick={signHandler}>Don't have an account?</span>
              )}
            </div>
          </form>
        </div>
      </Row>
    </Fragment>
  )
}

export default InputForm
