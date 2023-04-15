import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './team.css';

const Team = () => {
    return (
        <div className="teamHome">
            <div className="TeamCard">
                <div className="TeamCardContainer">
                    <img src="data:image/jpeg;base64,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" alt="insert photo"></img>
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
