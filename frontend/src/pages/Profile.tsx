import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <Link to="/edit-page" className="navigation__profile profile link">
            <div className="navigation__profile-picture profile__picture profile-picture">
                <img 
                    src={"../public/default-profile.jpg"}
                    className="profile-picture__image image" 
                    alt="Profile picture"/>
            </div>
            <div className="profile__info">
                <div className="profile__name">UserName</div>
                <div className="profile__slug">#slug</div>
            </div>
        </Link>
    )
}