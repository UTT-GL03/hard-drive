import { Search } from 'lucide-react';
import './LiquidSearchBar.scss'

const LiquidSearchBar = () => {
  return (
    <div className="liquid-glass-container">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} strokeWidth={2} />
        <input type="text" placeholder="Search…" />
      </div>
      <div className="liquid-overlay"></div>
    </div>
  );
};

export default LiquidSearchBar
