import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllQuestions } from '../../store/questions';
import { getAllAnswers } from '../../store/answers';
import imageTwo from './images/PXL_20230205_182244672~2.jpg';
import dogImage from '../../image/dog.png';
const Highlight = ({ isLoaded }) => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const answers = useSelector((state) => state.answers.allAnswers);
    console.log('answer', answers);
    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers());
    }, [dispatch]);
    const getNewItems = (data) => {
        console.log('popular', data);
        let questionId = 0;

        let flag1 = new Date(0);

        for (let item of data) {
            const createdAt = new Date(item.created_at);
            if (createdAt >= flag1) {
                flag1 = createdAt;
                questionId = item.id;
            }
        }

        const dog = questions.find((question) =>
            question.details.includes('dog')
        );
        const cat = questions.find((question) =>
            question.details.includes('cat')
        );
        const question = questions.find(
            (question) => question.id === questionId
        );
        // new question , cat, dog

        return { question, dog, cat };
    };
    const items = getNewItems(questions, answers);
    const question = items.question;
    const dog = items.dog;
    const cat = items.cat;
    return (
        <div className="highlight-container homePageCards">
            <div className="post-card top">
                <h1>What's new ?</h1>

                <div className="image-card">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2GIk9okRZWlkvlHqA1VD1LBeLSiNlCLhDmC_mWPPuoPMlxc-vU8GZmFrJqzMerJpaWrY&usqp=CAU"
                        alt="#"
                        className="placeHolderImageHome"
                    />
                    {question ? (
                        <>
                            <NavLink to={`/all-questions/${question.id}`}>
                                {question.title
                                    ? question.title
                                    : question.details}
                            </NavLink>
                            <p>
                                {question.details.length > 50
                                    ? `${question.details.slice(0, 100)}...`
                                    : question.details}
                            </p>
                        </>
                    ) : (
                        <p>No posts yet.</p>
                    )}
                </div>
            </div>
            {dog && (
                <div className="post-card mid">
                    <h1>Dog</h1>
                    <div className="image-card">
                        <img
                            src={dogImage}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <NavLink to={`/all-questions/search?keyword=dog`}>
                            {dog.title ? dog.title : dog.details}
                        </NavLink>
                        <p>
                            {dog.details.length > 50
                                ? `${dog.details.slice(0, 100)}...`
                                : dog.details}
                        </p>
                    </div>
                </div>
            )}
            {cat && (
                <div className="post-card bottom">
                    <h1>Cat</h1>
                    <div className="image-card">
                        <img
                            src={imageTwo}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <NavLink to={`/all-questions/search?keyword=cat`}>
                            {cat.title ? cat.title : cat.details}
                        </NavLink>
                        <p>
                            {cat.details.length > 50
                                ? `${cat.details.slice(0, 100)}...`
                                : cat.details}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Highlight;
