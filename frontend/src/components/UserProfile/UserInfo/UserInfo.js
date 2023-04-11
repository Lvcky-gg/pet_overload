import React from 'react';

import dogHead from '../../../image/dogHead.jpg';
import dateFormater from '../../../utils/dateFormater';

import './UserInfo.css';
const UserInfo = ({ user }) => {
    console.log(user);
    const { username, reputation, createdAt } = user;
    console.log('user prog', username, reputation, createdAt);
    return (
        <div id="user-info-container">
            <div id="name-card">
                <img alt="profile" className="profile-photo" src={dogHead} />

                <div className="user-detail">
                    <p id="username-profile">{username}</p>
                    <div className="icon-date">
                        <i className="fas fa-birthday-cake"></i>
                        <p>Member since: </p>
                        <p id="member-date">{dateFormater(createdAt)}</p>
                    </div>
                </div>
            </div>
            <div className="reputation-container">
                <i className="fas fa-crown"></i>
                <p id="user-info-reputation">Reputation: </p>
                <p id="reputation-score">{reputation}</p>
            </div>
        </div>
    );
};

export default UserInfo;
