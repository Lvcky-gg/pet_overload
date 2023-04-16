import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllQuestions } from '../../store/questions';
import { getAllAnswers } from '../../store/answers';
import imageTwo from './images/PXL_20230205_182244672~2.jpg';
import dogImage from '../../image/dog.png';
// import parse from 'html-react-parser';
import plainText from '../../utils/plainText';
const Highlight = ({ isLoaded }) => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const answers = useSelector((state) => state.answers.allAnswers);

    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers());
    }, [dispatch, getAllQuestions, getAllAnswers]);

    const getNewItems = (data) => {
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

        return { question, dog, cat };
    };
    const items = getNewItems(questions, answers);
    const question = items.question;
    const dog = items.dog;
    const cat = items.cat;

    return (
        <div className="highlight-container homePageCards">
            <div className="post-card top">
                <h2>What's new ?</h2>

                <div className="homePageCard">
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
                            <p>{plainText(question.details, 45)}</p>
                        </>
                    ) : (
                        <p>No posts yet.</p>
                    )}
                </div>
            </div>
            {dog && (
                <div className="post-card mid">
                    <h2>Dog</h2>
                    <div className="homePageCard">
                        <img
                            src={dogImage}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <NavLink to={`/all-questions/search?keyword=dog`}>
                            {dog.title ? dog.title : dog.details}
                        </NavLink>
                        <p>{plainText(dog.details, 45)}</p>
                    </div>
                </div>
            )}
            {cat && (
                <div className="post-card bottom">
                    <h2>Cat</h2>
                    <div className="homePageCard">
                        <img
                            src={imageTwo}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <NavLink to={`/all-questions/search?keyword=cat`}>
                            {cat.title ? cat.title : cat.details}
                        </NavLink>
                        <p>{plainText(cat.details, 45)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Highlight;
