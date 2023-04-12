import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
// import logo from './petoverload-1__2__720.png';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-img-container">
                {/* set the img as container background instead */}
                {/* <img src={logo} alt="logo"></img> */}
            </div>
            <h2>Copyright June 2022 Cohort </h2>
        </div>
    );
};
