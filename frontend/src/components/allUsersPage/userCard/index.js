import { redirect } from "react-router-dom"
import { NavLink } from "react-router-dom"

const UserCard = ({id, username}) => {

    return (
        <div className="userCard">
            <NavLink 
            className="userImgPlaceholder"
            to= {`../users/${id}`}
            >
                <div className="userCircle">
                <i className="fas fa-user-circle" />
                </div>

            </NavLink>
            <h4 >{username}</h4>

        </div>
    )
}
export default UserCard