import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Sidebar.css';

const Sidebar = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="sideBar">
            <NavLink className="sidebar-link" to="/">
                Home
            </NavLink>
            <NavLink className="sidebar-link" to="/all-questions">
                Questions
            </NavLink>
            {sessionUser && (
                <NavLink className="sidebar-link" to="/all-users">
                    Users
                </NavLink>
            )}
        </div>
    );
};
export default Sidebar;
