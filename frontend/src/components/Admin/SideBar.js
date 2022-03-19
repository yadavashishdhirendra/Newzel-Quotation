import React, { Fragment, useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import UserIcon from '@material-ui/icons/People'
import MenuIcon from '@material-ui/icons/Menu';
import DataIcon from '@material-ui/icons/DataUsage';
import CompanyIcon from '@material-ui/icons/Add';
import QuotationIcon from '@material-ui/icons/NoteAdd'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const SideBar = () => {
  const [open, setOpen] = useState(true)
  const openMenu = () => {
    if (open === true) {
      setOpen(false)
    }
    else {
      setOpen(true)
    }
  }
  return (
    <Fragment>
      <div className='relative-menu'>
        <MenuIcon className='hamburger-icon' onClick={openMenu} />
        <ProSidebar image='https://azouaoui-med.github.io/react-pro-sidebar/static/media/bg2.de0153c5.jpg' collapsed={open}>
          <Menu iconShape="circle">
            <MenuItem icon={<DashboardIcon />}>
              Dashboard
              <Link to='/admin/dashboard' />
            </MenuItem>
            <SubMenu icon={<UserIcon />} title="Users">
              <MenuItem>
                User List
                <Link to='/admin/user-list' />
              </MenuItem>
            </SubMenu>
            <SubMenu icon={<QuotationIcon />} title="Quotation">
              <MenuItem>
                Quotation List
                <Link to='/admin/quotation-list' />
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<DataIcon />}>
              Individual User Data
              <Link to='/admin/user-individual' />
            </MenuItem>
            <MenuItem icon={<CompanyIcon />}>
              Company Information
              <Link to='/admin/company-information' />
            </MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    </Fragment>
  )
}

export default SideBar