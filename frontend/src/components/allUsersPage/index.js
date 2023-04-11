import { useEffect } from 'react';
import { getAllUsers } from '../../store/users';
import UserCard from './userCard';
import Button from '../Button';

import './AllUsersPage.css';
import Sidebar from '../Sidebar';

const { useSelector, useDispatch } = require('react-redux');

const AllUsersPage = () => {
   const dispatch = useDispatch();
   const users =useSelector((state)=>state.users.allUsers);
   const loading = useSelector((state) => state.questions.loading);

   useEffect(() => {
    dispatch(getAllUsers())
   },[])

   if (loading) {
    return <div>Loading . . .</div>;
    }

    return  (
        // <div className="questionPage">
        //     <Sidebar/>
        <div className="AllUsersPage">
            
            <div id="all-users-header" className="flex-row">
                <div className="col-3">
                    <h1>All Users</h1>
                    <p>{users.length} users</p>
               
            </div>

            </div>

            <div id="user-list">
                {users.map(
                    ({ id, username }) => (
                        <UserCard
                            key={id}
                            id={id}
                            username={username}
                        />
                    )
                )}
            </div>
        </div>
        // </div>
    )


}

export default AllUsersPage