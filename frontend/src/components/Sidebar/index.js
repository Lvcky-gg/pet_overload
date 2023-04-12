import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sideBar">
            <NavLink className="sidebar-link" to="/">
                Home
            </NavLink>
            <NavLink className="sidebar-link" to="/all-questions">
                Questions
            </NavLink>
            <NavLink className="sidebar-link" to="/all-users">
                Users
            </NavLink>
        </div>
    );
};
export default Sidebar;
