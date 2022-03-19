import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import './Useroption.css'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../actions/Useraction';
import { useHistory } from 'react-router-dom';
import { Backdrop } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard'

const UserOptions = ({ isAuthenticated }) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const alert = useAlert()
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth)

    const options = [
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    ]

    if (user.userrole === 'Admin') {
        options.unshift({ icon: <DashboardIcon />, name: "Admin Dashboard", func: dashboard })
    }
    function dashboard() {
        history.push('/admin/dashboard')
    }
    function account() {
        history.push('/profile')
    }
    function logoutUser() {
        dispatch(logout())
        if (isAuthenticated) {
            history.push("/login")
        }
    }
    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: 999999 }} />
            <SpeedDial
                style={{ zIndex: 999999 }}
                ariaLabel='SpeedDial'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                direction='down'
                open={open}
                className='speedDial'
                icon={<img className='speedDial-Icon' src={user.avatar && user.avatar.url} />}
            >
                {options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} tooltipOpen={window.innerWidth <= 600 ? true : false} onClick={item.func} />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions