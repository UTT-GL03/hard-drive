import LiquidSearchBar from '../liquidSearchBar/LiquidSearchBar';
import './Headings.scss'
import logo from '../../../assets/hard_drive_logo.png';

const Headings = () => {
    return (
        <div className="headings-container">
            <div className="headings-logo">
                <img src={logo} alt="Logo" />
            </div>
            <LiquidSearchBar></LiquidSearchBar>
        </div>
    )   
}

export default Headings;