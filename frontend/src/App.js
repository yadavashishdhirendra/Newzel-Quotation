import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateInvoice from './components/CreateInvoice';
import Navbar from './components/Navbar';
import WebFont from 'webfontloader';
import InvoiceList from './components/InvoiceList';
import InvoiceDetails from './components/InvoiceDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/Route/ProtectedRoute';
import { useSelector } from 'react-redux';
import store from './store';
import { LoadUser } from './actions/Useraction';
import UserOptions from './components/UserOptions';
import Profile from './components/Profile';
import PasswordUpdate from './components/PasswordUpdate';
import UpdateInvoice from './components/UpdateInvoice';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrefillInvoice from './components/PrefillInvoice';
import AvatarUpdate from './components/AvatarUpdate';
import Dashboard from './components/Admin/Dashboard';
import UserList from './components/Admin/UserList';
import QuotationList from './components/Admin/QuotationList';
import SingleUser from './components/Admin/SingleUser';
import QuotationDetails from './components/Admin/QuotationDetails';

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Fredoka', 'sans-serif']
      }
    })
    store.dispatch(LoadUser());
  }, [])

  return (
    <div>
      <Router>
        <Navbar />
        {isAuthenticated && <UserOptions user={user} />}
        <ProtectedRoute exact path='/' component={CreateInvoice} />
        <ProtectedRoute exact path='/invoice-list' component={InvoiceList} />
        <ProtectedRoute exact path='/invoice-details/:id' component={InvoiceDetails} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path='/invoice-update/:id' component={UpdateInvoice} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <ProtectedRoute exact path='/password-update' component={PasswordUpdate} />
        <Route exact path='/password/reset' component={ForgotPassword} />
        <Route exact path='/password/reset/:token' component={ResetPassword} />
        <Route exact path='/invoice-recreate/:id' component={PrefillInvoice} />
        <ProtectedRoute exact path='/updateavatar' component={AvatarUpdate} />
        <ProtectedRoute isAdmin={true} exact path='/admin/dashboard' component={Dashboard} />
        <ProtectedRoute isAdmin={true} exact path='/admin/user-list' component={UserList} />
        <ProtectedRoute isAdmin={true} exact path='/admin/quotation-list' component={QuotationList} />
        <ProtectedRoute isAdmin={true} exact path='/admin/getsingleuser/:id' component={SingleUser} />
        <ProtectedRoute isAdmin={true} exact path='/admin/invoice-details/:id' component={QuotationDetails} />
      </Router>
    </div>
  )
}

export default App