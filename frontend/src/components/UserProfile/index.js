import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/session';

import './UserProfile.css';
import UserInfo from './UserInfo/UserInfo';
import ActivityTabs from './ActivityTabs/ActivityTabs';
import SortingTabs from './SortingTabs/SortingTabs';
import ActivityList from './ActivityLists/ActivityLists';
import { Navigate, useParams } from 'react-router-dom';
import { getAllUsers } from '../../store/users';

const UserProfile = ({ isLoaded }) => {
    const dispatch = useDispatch();
    // current user
    const currentUser = useSelector((state) => state.session.user);
    const allUsers = useSelector((state) => state.users.allUsers);
    // user with id in url
    const { userId } = useParams();
    const linkUser = allUsers.find((user) => user.id === Number(userId));
    console.log('linkusr', linkUser);
    let user;
    if (userId) {
        user = currentUser.id === linkUser.id ? currentUser : linkUser;
    } else {
        user = currentUser;
    }

    const [activeTab, setActiveTab] = useState('questions');
    const [activeSort, setActiveSort] = useState('newest');
    const [isDelete, setIsDelete] = useState(false);
    useEffect(() => {
        dispatch(authenticate());
        dispatch(getAllUsers());
    }, [dispatch, isDelete]);

    if (!currentUser) {
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
                currentUser={currentUser}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
            />
        </div>
    );
};

export default UserProfile;
