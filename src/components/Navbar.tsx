import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
    // email: any;
    userInfo: any;
    setUserInfo: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo }) => {
    let navigate = useNavigate();
    let logout = () => {
        sessionStorage.removeItem("userInfo");
        setUserInfo({ email: false, isAdmin: false });
        navigate("/");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/home">
                    TechIt
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {userInfo.email && (<div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">
                                Products <span className="sr-only"></span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i> Cart
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex " role="">
                        <button className="btn btn-outline-info me-0" onClick={logout}>
                            Logout
                        </button>
                    </form>
                </div>
                )}
            </nav >
        </>
    )
}

export default Navbar;