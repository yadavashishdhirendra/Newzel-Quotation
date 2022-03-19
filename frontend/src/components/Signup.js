import React, { Fragment, useEffect, useState } from 'react';
import './login.css'
import { Button } from '@material-ui/core';
import MetaData from './MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../actions/Useraction';
import { clearErrors } from '../actions/Invoiceaction';
import Loader from './Loader/Loader';

const Signup = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector((state) => state.auth)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(name, email, password))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isAuthenticated) {
      alert.success("Register Success");
      history.push('/login')
    }
  }, [error, alert, isAuthenticated, dispatch])

  return (
    <Fragment>
      <MetaData title='Newzel - Signup' />
      {
        loading ? <Loader /> :
          <div className='parent-screen auth-screen'>
            <h2>Si<span>gnu</span>p</h2>
            <div>
              <form onSubmit={handleSignup}>
                <input type="text" value={name} name='name' placeholder='Name' onChange={(e) => setName(e.target.value)} /> <br />
                <input type="email" name="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type="password" name="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} /> <br />
                <Button type='submit' variant='outlined' className='login-btn'>Signup</Button>
              </form>
            </div>
          </div>
      }
    </Fragment>
  )
}

export default Signup