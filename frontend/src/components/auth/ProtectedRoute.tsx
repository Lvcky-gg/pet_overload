import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    const user = useSelector(
        (state: { session: { user: any } }) => state.session.user
    );
    return (
        <Route {...props}>
            {user ? props.children : <Navigate to='/login' />}
        </Route>
    );
};

export default ProtectedRoute;
