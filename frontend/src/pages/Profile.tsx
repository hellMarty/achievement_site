import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <div>
            <h1>
                User Page: Logging
            </h1>
            <h3>TODOs:</h3>
            <ul>
                <li>Create FORM for creating new user / log in existing user</li>
                <li>Define when user is logged in e.g. via session storage</li>
                <li>Option to log out</li>
                <li>Connect users to the achievements</li>
                <li>Show users achievements</li>
            </ul> 

            <div className="navigation__profile-picture profile__picture profile-picture">
                <img
                    src={"../default-profile.jpg"}
                    className="profile-picture__image image"
                    alt="Profile picture" />
            </div>
            <div className="profile__info">
                <div className="profile__name">UserName</div>
                <div className="profile__slug">#slug</div>
            </div>
        </div>
    )
}