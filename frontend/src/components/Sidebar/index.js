import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sideBar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/all-questions">Questions</NavLink>
            <NavLink to="/all-users">Users</NavLink>
        </div>
    );
};
export default Sidebar;
