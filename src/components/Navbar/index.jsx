import { Link } from 'react-router-dom'
import './index.css'
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard';
// import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup'
import InventoryIcon from '@mui/icons-material/Inventory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useState } from 'react';

function Navbar() {

    const { signout } = useAuth();
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div className='navbar-container'>
            <div className="navbar-content">
                <div>
                    <ul className="nav d-flex flex-direction-column">
                        <div className="link">
                            <div className="dropdown link-nav">
                                <a
                                    className={`d-block link-body-emphasis text-decoration-none dropdown-toggle text-dark${dropdownOpen ? " show" : ""}`}
                                    onClick={toggleDropdown}
                                >
                                    {/* <img
                                        src="src\img\user.png"
                                        alt="mdo"
                                        width="32"
                                        height="32"
                                        className="rounded-circle"
                                    /> */}

                                    <AdminPanelSettingsIcon sx={{width: '32px', height: '32px'}}/>
                                </a>
                                <ul
                                    className={`dropdown-menu mt-3 text-small bg-white dropdown-menu-end${dropdownOpen ? " show" : ""}`}
                                    data-popper-placement="rigth-start"
                                >
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button type="button" className="dropdown-item text-danger" onClick={() => [signout(), navigate("/")]}>Sair</button></li>
                                </ul>
                            </div>
                        </div>

                        <Link className='link' to="/home"><span className='link-nav'><li><HomeIcon sx={{ fontSize: 32 }} /></li></span></Link>
                        <Link className='link' to="/dashboard"><span className='link-nav'><li><DashboardIcon sx={{ fontSize: 32 }} /></li></span></Link>
                        <Link className='link' to="/client"><span className='link-nav'><li><AccountCircleIcon sx={{ fontSize: 32 }} /></li></span></Link>
                        <Link className='link' to="/product"><span className='link-nav'><li><InventoryIcon sx={{ fontSize: 32 }} /></li></span></Link>
                    </ul>
                </div>
                <div className="refresh">
                    <ul className="nav">
                        <Link className='link' to='/home'><span className='link-nav'><li><WifiProtectedSetupIcon sx={{ fontSize: 32 }} /></li></span></Link>
                    </ul>
                </div>
            </div >
        </div >
    )
}

export default Navbar