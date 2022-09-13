import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./style/header.module.css";
import logo from "./assets/logo.svg";
import { UserContext } from "context/UserContext";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Button } from "@chakra-ui/react";
import { userLogout } from "api/api";
const Header = () => {
  const { user, userLoading } = React.useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await userLogout();
      console.log(res);

      if (res.status === 200) {
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("access-token");

        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className={style.header}>
      <div className="container">
        <nav className={style.nav}>
          <Link to="/" className={style.logo}>
            <img src={logo} alt="logo" className="img-fluid" />
          </Link>
          {userLoading ? null : user ? (
            <>
              <ul className={style.nav_list}>
                <li className={style.nav_item}>
                  <Link to="/profile" className={style.nav_link}>
                    <Button colorScheme="telegram">
                      <div className="d-flex justify-content-center align-items-center">
                        <CgProfile className={style.icon} />
                        <span className={style.logout_title}>New Post</span>
                      </div>
                    </Button>
                  </Link>
                </li>
                <li className={style.nav_item}>
                  <Button onClick={handleLogout} colorScheme="red">
                    <div className="d-flex justify-content-center align-items-center">
                      <FiLogOut className={style.icon} />
                      <span className={style.logout_title}>Logout</span>
                    </div>
                  </Button>
                </li>
              </ul>
            </>
          ) : (
            <ul className={style.nav_list}>
              <li className={style.nav_item}>
                <NavLink to="/login" className={style.nav_link}>
                  Login
                </NavLink>
              </li>
              <li className={style.nav_item}>
                <NavLink to="/register" className={style.nav_link}>
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
