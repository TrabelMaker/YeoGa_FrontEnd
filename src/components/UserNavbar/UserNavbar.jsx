import React, {useNavigate} from  "react";
import './UserNavbar.css';


const UserNavbar = () => {

    const usenavigate = useNavigate;
  
    return(
    <div className="User-Navbar">
      <div className="User-section">   
        <div className="profile-pic"></div>
        <div className="User-name">UserName</div>
      </div>
      <ul className="nav-items">
        <NavItem icon="📅" label="Reservation" />
        <NavItem icon="🔖" label="북마크" />
        <NavItem icon="🗓" label="캘린더"/>
        <NavItem icon="💬" label="1:1 AI Chat" />
        <NavItem icon="❓" label="FAQ"/>
        <NavItem icon="⚙" label="Settings" />
        <NavItem icon="🔓" label="로그아웃" />
      </ul>
    </div>
  );
};

const NavItem = ({ icon, label }) => {
    return (
      <li className="nav-item">
        <span className="icon">{icon}</span>
        <span>{label}</span>
      </li>
    );
  };

export default UserNavbar;