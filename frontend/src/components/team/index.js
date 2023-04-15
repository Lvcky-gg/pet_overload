import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './team.css';

const Team = () => {
    return (
        <div className="teamHome">
            <div className="TeamCard">
                <div className="TeamCardContainer">
                    <img src="" alt="insert photo"></img>
                    <div className="TeamCardDetails">
                        <h2>Iris Wang</h2>
                        <p>Software engineer</p>
                        <p>email here</p>
                        {/* <ul className="socials"> 
            <li>
            <a href="https://www.facebook.com/john.odonnell.96/">
                <FontAwesomeIcon icon="fa-brands fa-facebook"  >
                </FontAwesomeIcon>
            </a>
            </li>
            <li>
                <a href="https://www.instagram.com/lvcky_gg/">
                <FontAwesomeIcon icon="fa-brands fa-instagram"  >

                </FontAwesomeIcon>
                </a>
                </li>
            <li>
            <a href="https://www.linkedin.com/in/john-o-donnell-36a38a161/">
                <FontAwesomeIcon icon="fa-brands fa-linkedin-in" >

                </FontAwesomeIcon>
            </a>
                </li>
            <li>
                <a href="https://github.com/Lvcky-gg">
                <FontAwesomeIcon icon="fa-brands fa-square-github" >

                </FontAwesomeIcon>
                </a>
                </li>
            <li>
                <a href="https://twitter.com/lvcky_dev">
                <FontAwesomeIcon icon="fa-brands fa-twitter"  >

                </FontAwesomeIcon>
                </a>
                </li>

            </ul> */}
                    </div>
                </div>
            </div>

            <div className="TeamCard">
                <div className="TeamCardContainer">
                    <img src="https://i.imgur.com/o3qEfwm.png" alt="dog"></img>
                    <div className="TeamCardDetails">
                        <h2>Adam Scoggins</h2>
                        <p>Software Engineer</p>
                        <ul className="socials">
                            <li>
                                <a href="https://github.com/AdamScoggins">
                                    <FontAwesomeIcon icon="fa-brands fa-square-github"></FontAwesomeIcon>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="TeamCard">
                <div className="TeamCardContainer">
                <img
                        src="https://avatars.githubusercontent.com/u/94711072?v=4"
                        alt="#"
                    ></img>
  
                    <div className="TeamCardDetails">
                        
                        <h2>John O'Donnell</h2>
                        <p>Software engineer</p>
                        <p>johnodonnell1997@icloud.com</p>
                        <ul className="socials">
                            <li>
                                <a href="https://www.facebook.com/john.odonnell.96/">
                                    <FontAwesomeIcon icon="fa-brands fa-facebook"></FontAwesomeIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/lvcky_gg/">
                                    <FontAwesomeIcon icon="fa-brands fa-instagram"></FontAwesomeIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/john-o-donnell-36a38a161/">
                                    <FontAwesomeIcon icon="fa-brands fa-linkedin-in"></FontAwesomeIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Lvcky-gg">
                                    <FontAwesomeIcon icon="fa-brands fa-square-github"></FontAwesomeIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/lvcky_dev">
                                    <FontAwesomeIcon icon="fa-brands fa-twitter"></FontAwesomeIcon>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Team;
