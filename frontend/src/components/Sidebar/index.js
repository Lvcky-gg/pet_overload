import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './sidebar.css';
import session from '../../store/session';
import { useSelector } from 'react-redux';

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
            {sessionUser && <NavLink className="sidebar-link" to="/all-users">
                Users
            </NavLink>}
        </div>
    );
};
export default Sidebar;
