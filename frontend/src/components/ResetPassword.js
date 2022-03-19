import React, { useState, Fragment, useEffect } from 'react'
import MetaData from './MetaData';
import { Button } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../actions/Useraction';
import { clearErrors } from '../actions/Invoiceaction';
import Loader from './Loader/Loader';

const ResetPassword = ({ history, match }) => {
    const { error, loading, success } = useSelector((state) => state.forgotPass)
    const dispatch = useDispatch();
    const alert = useAlert();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleResetPassword = (e) => {
        e.preventDefault();
        dispatch(resetPassword(match.params.token, password, confirmPassword))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Password Update Success')
            history.push('/login')
        }
    }, [dispatch, error, success, match, alert,history])

    return (
        <Fragment>
            <MetaData title='Newzel - Password Recovery' />
            {
                loading ? <Loader /> :
                    <div className='parent-screen auth-screen'>
                        <h2>Pas<span>sword Re</span>covery</h2>
                        <div>
                            <form onSubmit={handleResetPassword}>
                                <input type="password" name="password" value={password} placeholder="New Password" onChange={(e) => setPassword(e.target.value)} /> <br />
                                <input type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} /> <br />
                                <Button type='submit' variant='outlined' className='login-btn mb-3'>Change Password</Button> <br />
                            </form>
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default ResetPassword