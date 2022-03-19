import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

// component passing from app.js that's why we have taken component as a parameter & rest is used for exact path & all
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

    return (
        <Fragment>
            {
                !loading && (
                    <Route {...rest} render={(props) => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }
                        if (isAdmin === true && user.userrole !== 'Admin'){
                            return <Redirect to='/login' />
                        }
                            return <Component {...props} />
                    }} />
                )
            }
        </Fragment>
    );
};

export default ProtectedRoute;