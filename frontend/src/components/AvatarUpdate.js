import React, { Fragment, useEffect, useState } from 'react';
import './login.css'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { LoadUser, updateProfile } from '../actions/Useraction';
import { PROFILE_UPDATE_RESET } from '../constants/UserConstants';
import Loader from './Loader/Loader';
import { clearErrors } from '../actions/Invoiceaction';
import { Link } from 'react-router-dom';
import RightIcon from '@material-ui/icons/ChevronRight'
import MetaData from './MetaData';

const AvatarUpdate = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.auth)
    const { isUpdated, loading, error } = useSelector((state) => state.passUpdate)

    const [avatar, setAvatar] = useState();
    const [avatarpreview, setAvatarPreview] = useState();
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        dispatch(updateProfile(avatar))
    }

    const updateProfileDataChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result)
                setAvatarPreview(Reader.result)
            }
        }
        Reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (user) {
            setAvatarPreview(user.avatar && user.avatar.url)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Profile Updated Success");
            dispatch(LoadUser())
            history.push('/profile');
            dispatch({
                type: PROFILE_UPDATE_RESET
            })
        }
    }, [user, dispatch, isUpdated, alert, history])

    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <MetaData title={`${user.name}'s Profile Avatar`} />
                        <div className="container relative-container">
                            <div className='breadcrumbs'>
                                <p><Link to='/profile'>Profile</Link> <span><RightIcon /></span> <span>Update Avatar</span></p>
                            </div>
                            <div className='parent-screen'>
                                <h2>Upda<span>te A</span>vatar</h2>
                                <div>
                                    <form className='profile-update' onSubmit={handleProfileUpdate}>
                                        <img id='avatar-preview' src={avatarpreview} alt="" />
                                        <input type="file" name='avatar' accept='image/*' onChange={updateProfileDataChange} /> <br />
                                        <Button type='submit' disabled={avatar ? false : true} variant='outlined' className='login-btn mb-3'>Update Avatar</Button> <br />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default AvatarUpdate