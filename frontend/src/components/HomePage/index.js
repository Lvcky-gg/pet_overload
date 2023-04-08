import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import './homepage.css'
import imageOne from './images/PXL_20230129_031141829~3.jpg'
import imageTwo from './images/PXL_20230205_182244672~2.jpg'
import imageThree from './images/PXL_20230310_213734277~2.jpg'
import imageFour from './images/Screenshot_20201009-154928_Snapchat~2.jpg'
import questionImg from './images/question.png'
// import AllQuestionsPage from '../AllQuestionsPage';
import { NavLink } from 'react-router-dom';

export const HomePage = () => {

    return (
    <div className='homePage'>
        <div className='homePageTopImage'>
            <img src={imageOne} alt="#"/>

        </div>
        <div className='homePageHighlights'>
            {/* <div> */}
                <h1>highlight page</h1>

            {/* </div> */}
            <div className='homePageCards'>
            {/* <h1>//card</h1>
            <h1>//image</h1>
            <h1>//title  </h1>
            <h1>  //text</h1> */}
                 <div className="homePageCard"> 
                 <img src={questionImg} alt="#" className='placeHolderImageHome'/>
                    <div>
                    <h3>Questions</h3>
                    <NavLink to='/all-questions'>Go to Questions</NavLink>
                 </div>
                 </div>

                 <div className="homePageCard">
                 <img src={questionImg} alt="#" className='placeHolderImageHome'/>
                    <div>
                    <h3>Questions</h3>
                    <NavLink to='/all-questions'>Go to Questions</NavLink>
                 </div>
                 </div>

                 <div className="homePageCard">
                 <img src={questionImg} alt="#" className='placeHolderImageHome'/>
                    <div>
                    <h3>Questions</h3>
                    <NavLink to='/all-questions'>Go to Questions</NavLink>
                 </div>
                 </div>

                

            </div>
        
        </div>
        <div className='homePageMiddleImage'>
        <img src={imageTwo} alt="#"/>
        
        </div>
        <div className='homePageOtherResource'>
            <div>
                <h2>Other Resources?</h2>
                <p>PlaceHolder</p>

            </div>
            <img src={imageFour} alt="#"/>
        
        </div>
        <div className='homePageBottomImage'>
        <img src={imageThree} alt="#"/>
        
        </div>
        <div className='homePageWhiteSpace'>
        
        </div>
    
    
    </div>
    
    )
}