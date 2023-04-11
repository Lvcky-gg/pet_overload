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
                 <img src='data:image/jpeg;base64,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' alt="#" className='placeHolderImageHome'/>
                    <div>
                    <h3>Questions</h3>
                    <NavLink to='/all-questions'>Go to Questions</NavLink>
                 </div>
                 </div>

                 <div className="homePageCard">
                 <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2GIk9okRZWlkvlHqA1VD1LBeLSiNlCLhDmC_mWPPuoPMlxc-vU8GZmFrJqzMerJpaWrY&usqp=CAU' alt="#" className='placeHolderImageHome'/>
                    <div>
                    <h3>Users</h3>
                    <NavLink to='/all-users'>Go to Users</NavLink>
                 </div>
                 </div>

                 <div className="homePageCard">
                 <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-a2qi2kfxq8pYnwn0oCEEoHSxPXlZNlt8HV665UL-hDzfI46WckvEvaMeWRHcklH7OWc&usqp=CAU' alt="#" className='placeHolderImageHome'/>
                    <div>
                    <h3>Team</h3>
                    <NavLink to='/team'>Meet Our Team</NavLink>
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
        {/* <img src={imageThree} alt="#"/> */}
        
        </div>
        <div className='homePageWhiteSpace'>
        
        </div>
    
    
    </div>
    
    )
}