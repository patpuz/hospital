import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const userRole = localStorage.getItem('userRole');

        if (!allowedRoles.includes(userRole)) {
            return <Navigate to="/" />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
