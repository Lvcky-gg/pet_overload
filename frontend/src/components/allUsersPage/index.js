import { useEffect } from 'react';
import { getAllUsers } from '../../store/users';
import UserCard from './userCard';

import './AllUsersPage.css';

const { useSelector, useDispatch } = require('react-redux');

const AllUsersPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.allUsers);
    const loading = useSelector((state) => state.questions.loading);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    if (loading) {
        return <div>Loading . . .</div>;
    }

    return (
        <div className="AllUsersPage">
            <div id="all-users-header" className="flex-row">
                <h1>All Users</h1>
            </div>
            <div id="filter-row-user" className="filter-row">
                <p>{users.length} users</p>
            </div>

            <div id="user-list">
                {users.map(({ id, username }) => (
                    <UserCard key={id} id={id} username={username} />
                ))}
            </div>
        </div>
    );
};

export default AllUsersPage;
