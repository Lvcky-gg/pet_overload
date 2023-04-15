import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import logo from './petoverload-1__2__720.png';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-img-container">
                {/* set the img as container background instead */}
                {/* <img src={logo} alt="logo"></img> */}
            </div>
            <div className="copy-right">
                <h2>Copyright June 2022 Cohort </h2>
                <a href="https://github.com/AdamScoggins/pet-overload">
                    <i className="fab fa-github"></i>
                </a>
            </div>
        </div>
    );
};
