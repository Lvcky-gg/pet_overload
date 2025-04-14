import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/session';
import { RootState } from '../../store/types';

import UserInfo from './UserInfo/UserInfo';
import ActivityTabs from './ActivityTabs/ActivityTabs';
import SortingTabs from './SortingTabs/SortingTabs';
import ActivityList from './ActivityLists/ActivityLists';
import { Navigate, useParams } from 'react-router-dom';
import { getAllUsers } from '../../store/users';

import './UserProfile.css';

interface UserProfileProps {
    isLoaded: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ isLoaded }) => {
    const dispatch = useDispatch();
    const [linkUser, setLinkUser] = useState<{ id: number } | null>(null);
    const [user, setUser] = useState<{ id: number } | null>(null);
    // current user
    const allUsers = useSelector((state: RootState) => state.users.allUsers);
    const currentUser = useSelector(
        (state: RootState) => state.session.user
    ) as { id: number } | null;

    // user with id in url
    const { userId } = useParams();

    useEffect(() => {
        setLinkUser(
            allUsers.find(
                (user: { id: number }) => user?.id === Number(userId)
            ) ?? null
        );
    }, [allUsers, userId]);

    useEffect(() => {
        if (userId) {
            setUser(currentUser?.id === linkUser?.id ? currentUser : linkUser);
        } else {
            setUser(currentUser);
        }
    }, [linkUser, currentUser, userId]);

    const [activeTab, setActiveTab] = useState('questions');
    const [activeSort, setActiveSort] = useState<'newest' | 'score'>('newest');
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        dispatch(authenticate());
        dispatch(getAllUsers());
    }, [dispatch, isDelete]);

    if (!currentUser) {
        // redirect to home
        return (
            <>
                <Navigate to='/' />
            </>
        );
    }
    if (!user) return null;
    return (
        <div id='userProfile-container'>
            <UserInfo user={user} />
            <p id='activity-title'>Activity</p>
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
