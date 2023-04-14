import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import './homepage.css';
import imageOne from './images/PXL_20230129_031141829~3.jpg';
// import imageTwo from './images/PXL_20230205_182244672~2.jpg';
import imageThree from './images/PXL_20230310_213734277~2.jpg';
import imageFour from './images/Screenshot_20201009-154928_Snapchat~2.jpg';
// import questionImg from './images/question.png';
// import AllQuestionsPage from '../AllQuestionsPage';
import { NavLink } from 'react-router-dom';
import author from '../../image/author.png';
import team from '../../image/team.png';
import catbackground from '../../image/background.jpg';

import session from '../../store/session';

import Highlight from './Highlights';
import { useSelector } from 'react-redux';
export const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    return (
        <div className="homePage">
            <div className="homePageTopImage"></div>
            <div className="homePageHighlights">
                <h1>Lorem Ipsum</h1>

                <div className="homePageCards">
                    <div className="homePageCard">
                        <img
                            src={imageOne}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <div>
                            <NavLink to="/all-questions">Forums</NavLink>
                        </div>
                    </div>

                    <div className="homePageCard">
                        <img
                            src={author}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <div>
                            {sessionUser ?(<NavLink to="/all-users">Authors</NavLink>):(<NavLink to='/login'>Authors</NavLink>)}
                        </div>
                    </div>

                    <div className="homePageCard">
                        <img
                            src={team}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <div>
                            <NavLink to="/team">Our Team</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homePageMiddleImage">
                <Highlight />
            </div>
            <div className="homePageOtherResource">
                <div>
                    <h2>Other Resources?</h2>
                    <p>PlaceHolder</p>
                </div>
                <img src={imageFour} alt="#" />
            </div>
            <div className="homePageBottomImage">
                <img src={imageThree} alt="#" />
            </div>
            <div className="homePageWhiteSpace"></div>
            <div className="bottom-background">
                <img src={catbackground} alt="#" id="home-bottom-bc" />
            </div>
        </div>
    );
};
