import LiquidSearchBar from '../liquidSearchBar/LiquidSearchBar';
import './Headings.scss'

const Headings = () => {
    const logo=null;
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