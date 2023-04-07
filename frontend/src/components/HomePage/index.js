import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import './homepage.css'
import imageOne from './images/PXL_20230129_031141829~3.jpg'
import imageTwo from './images/PXL_20230205_182244672~2.jpg'
import imageThree from './images/PXL_20230310_213734277~2.jpg'
import imageFour from './images/Screenshot_20201009-154928_Snapchat~2.jpg'

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
                    <h1>Insert Component here</h1>
                    <div>
                    <h3>Shelter</h3>
                    <p>this will be a link</p>
                 </div>
                 </div>

                 <div className="homePageCard">
                    <h1>Insert Component here</h1>
                    <div>
                    <h3>Cool Post</h3>
                    <p>this will be a link</p>
                 </div>
                 </div>

                 <div className="homePageCard">
                    <h1>Insert Component here</h1>
                    <div>
                    <h3>Our People</h3>
                    <p>this will be a link</p>
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