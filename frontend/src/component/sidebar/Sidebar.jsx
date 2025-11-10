import FileUpload from '../fileUpload/FileUpload';
import './Sidebar.scss';

const SideBar = ({ activeItem, setActiveItem }) => {

    const menuItems = ["Mon Drive"];

    return (
        <div className="sidebar-container">
            <FileUpload />
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
