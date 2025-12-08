import FileUpload from '../fileUpload/FileUpload';
import './Sidebar.scss';

const SideBar = () => {



    return (
        <div className="sidebar-container">
            <FileUpload />
            <nav className="sidebar-menu">
                <ul>
                    <li
                        key={"Mon Drive"}
                        className={"active"}
                        onClick={() => {
                            window.location.href = '/';
                        }}
                        >
                            Mon Drive
                        </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;
