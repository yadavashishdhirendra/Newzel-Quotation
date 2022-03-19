import React, { Fragment, useEffect, useState } from 'react';
import './login.css'
import { Button } from '@material-ui/core';
import MetaData from './MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../actions/Useraction';
import { clearErrors } from '../actions/Invoiceaction';
import Loader from './Loader/Loader';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, message } = useSelector((state) => state.forgotPass)

    const [email, setEmail] = useState("")

    const handleForgot = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email))
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);
    return (
        <Fragment>
            <MetaData title='Newzel - Forgot Password' />
            {
                loading ? <Loader /> :
                    <div className='parent-screen auth-screen'>
                        <h2>For<span>got Pas</span>sword</h2>
                        <div>
                            <form onSubmit={handleForgot}>
                                <input type="email" value={email} name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br />
                                <Button type='submit' variant='outlined' className='login-btn mb-3'>Send Email</Button> <br />
                            </form>
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default ForgotPassword