import './Sidebar.scss';
import { useState } from 'react';

const SideBar = () => {
    const [activeItem, setActiveItem] = useState("Mon Drive");

    const menuItems = ["Mon Drive", "Ordinateurs", "Favoris", "Récent", "Corbeille"];

    return (
        <div className="sidebar-container">
        <nav className="sidebar-menu">
            <ul>
            {menuItems.map((item) => (
                <li
                key={item}
                className={activeItem === item ? "active" : ""}
                onClick={() => setActiveItem(item)}
                >
                {item}
                </li>
            ))}
            </ul>
        </nav>
        </div>
    );
};

export default SideBar;
