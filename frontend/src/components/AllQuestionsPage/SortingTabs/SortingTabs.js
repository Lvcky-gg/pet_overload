import {
    sortQuestionsByNewest,
    sortQuestionsByScore,
    filterQuestionsByUnanswered,
} from '../../../store/questions';
import Button from '../../Button';
const { useDispatch } = require('react-redux');

const SortingTabs = ({ questions }) => {
    const dispatch = useDispatch();

    const sortByNewest = () => {
        dispatch(sortQuestionsByNewest());
    };

    const sortByScore = () => {
        dispatch(sortQuestionsByScore());
    };

    const filterByUnanswered = () => {
        dispatch(filterQuestionsByUnanswered());
    };

    return (
        <div className="filter-row">
            <div className="question-count-container">
                <p className="question-count">{questions.length} questions</p>
            </div>
            <div className="filter-options">
                <Button
                    id="newest-button"
                    text="Newest"
                    onClickHandler={sortByNewest}
                />
                <Button
                    id="unanswered-button"
                    text="Unanswered"
                    onClickHandler={filterByUnanswered}
                />
                <Button
                    id="score-button"
                    text="Score"
                    onClickHandler={sortByScore}
                />
            </div>
        </div>
    );
};

export default SortingTabs;
