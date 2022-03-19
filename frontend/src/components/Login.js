import React, { Fragment, useEffect, useState } from 'react';
import './login.css'
import { Button } from '@material-ui/core';
import MetaData from './MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/Invoiceaction';
import Loader from './Loader/Loader';
import { LoginUser } from '../actions/Useraction';
import { Link } from 'react-router-dom';

const Login = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, error, loading, isAuthenticated } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser(email, password))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isAuthenticated === true) {
      alert.success("Login Success");
      history.push('/')
    }
  }, [error, alert, isAuthenticated, dispatch, history])

  return (
    <Fragment>
      <MetaData title='Newzel - Login' />
      {
        loading ? <Loader /> :
          <div className='parent-screen auth-screen'>
            <h2>L<span>ogi</span>n</h2>
            <div>
              <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' /> <br />
                <Button type='submit' variant='outlined' className='login-btn mb-3'>Login</Button> <br />
                <span className='forgot-pass'>Forgot Password? &nbsp;<Link to='/password/reset'>Click Here</Link></span>
              </form>
            </div>
          </div>
      }
    </Fragment>
  )
}

export default Login