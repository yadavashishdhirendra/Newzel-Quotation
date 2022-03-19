import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './MetaData'
import { Button } from '@material-ui/core';
import { passwordUpdate } from '../actions/Useraction';
import Loader from './Loader/Loader';
import { clearErrors } from '../actions/Invoiceaction';
import { PASSWORD_UPDATE_RESET } from '../constants/UserConstants';
import './PasswordUpdate.css'
import RightIcon from '@material-ui/icons/ChevronRight'
import { Link } from 'react-router-dom';

const PasswordUpdate = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isUpdated } = useSelector((state) => state.passUpdate)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        dispatch(passwordUpdate(oldPassword, newPassword))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Password Updated Success");
            dispatch({
                type: PASSWORD_UPDATE_RESET
            })
        }
    }, [dispatch, error, isUpdated,alert])

    return (
        <div className="container passwrd-update-wrapper">
            {
                loading ? <Loader /> :
                    <Fragment>
                        <div className='breadcrumbs'>
                            <p><Link to='/profile'>Profile</Link> <span><RightIcon /></span> <span>Update Password</span></p>
                        </div>
                        <MetaData title='Password - Update' />
                        <div className='password-update'>
                            <h3>Upd<span>ate Pas</span>sword</h3>
                            <form onSubmit={handlePasswordUpdate}>
                                <input type="password" placeholder='Old Password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} name='oldPassword' /> <br />
                                <input type="password" placeholder='New Password' value={newPassword} name="newPassword" onChange={(e) => setNewPassword(e.target.value)} /> <br />
                                <Button type='submit'>Update Password</Button>
                            </form>
                        </div>
                    </Fragment>
            }
        </div>
    )
}

export default PasswordUpdate