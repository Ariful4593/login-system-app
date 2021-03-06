import React from 'react';
import {
    Route,
    Redirect,
} from "react-router-dom";
const PrivateRoute = ({ children, ...rest }) => {

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    return (
        <Route
            {...rest}
            render={({ location }) =>
            (loggedInUser) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;