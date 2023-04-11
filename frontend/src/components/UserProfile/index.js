import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/session';

import './UserProfile.css';
import UserInfo from './UserInfo/UserInfo';
import ActivityTabs from './ActivityTabs/ActivityTabs';
import SortingTabs from './SortingTabs/SortingTabs';
import ActivityList from './ActivityLists/ActivityLists';
import { Navigate } from 'react-router-dom';

const UserProfile = ({ isLoaded }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [activeTab, setActiveTab] = useState('questions');
    const [activeSort, setActiveSort] = useState('newest');
    const [isDelete, setIsDelete] = useState(false);
    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch, isDelete]);

    if (!user) {
        // redirect to home
        return (
            <>
                <Navigate to="/" />
            </>
        );
    }
    return (
        <div id="userProfile-container">
            <UserInfo user={user} />
            <p id="activity-title">Activity</p>
            <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <SortingTabs
                activeSort={activeSort}
                setActiveSort={setActiveSort}
            />
            <ActivityList
                activeTab={activeTab}
                activeSort={activeSort}
                user={user}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
            />
        </div>
    );
};

export default UserProfile;
