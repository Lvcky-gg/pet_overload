import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/session';

import './UserProfile.css';
import UserInfo from './UserInfo/UserInfo';
import ActivityTabs from './ActivityTabs/ActivityTabs';
import SortingTabs from './SortingTabs/SortingTabs';
import ActivityList from './ActivityLists/ActivityLists';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session);
    const [activeTab, setActiveTab] = useState('questions');
    const [activeSort, setActiveSort] = useState('newest');

    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch]);

    if (!user) {
        // have the login model shows and let user login/sign up
    }
    return (
        <div className="container" id="userProfile-container">
            <UserInfo user={user.user} />
            <p id="activity-title">Activity</p>
            <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <SortingTabs
                activeSort={activeSort}
                setActiveSort={setActiveSort}
            />
            <ActivityList
                activeTab={activeTab}
                activeSort={activeSort}
                user={user.user}
            />
        </div>
    );
};

export default UserProfile;
