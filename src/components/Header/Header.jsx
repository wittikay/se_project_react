import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import mobileOverlayCloseIcon from "../../images/mobileoverlayx.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = ({ handleAddClick, handleProfileClick, weatherData, currentUser }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const userName = currentUser?.name || "User";
  const userAvatar = currentUser?.avatar || null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpened) {
        setIsMobileMenuOpened(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpened]);

  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpened]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__menu-target-area">
          <div className="header__logo" style={{ cursor: "pointer" }} onClick={() => navigate("/") }>
            <img className="header__logo-image" src={logo} alt="WTWR logo" />
            <p className="header__date-and-location">
              {currentDate}, {weatherData?.city || "New York"}
            </p>
          </div>

          <button
            className={`header__menu-btn ${isMobileMenuOpened ? "header__menu-btn_opened header__menu-btn_hidden" : ""}`}
            onClick={toggleMobileMenu}
            type="button"
            aria-label="Open menu"
          >
            <span className="header__menu-btn-line"></span>
            <span className="header__menu-btn-line"></span>
          </button>
        </div>

        {isMobileMenuOpened && (
          <div className="header__menu-overlay">
            <button
              className="header__overlay-close-btn"
              onClick={toggleMobileMenu}
              type="button"
              aria-label="Close menu"
            >
              <img
                src={mobileOverlayCloseIcon}
                alt="Close menu"
                className="header__overlay-close-icon"
              />
            </button>
            <div className="header__menu-content">
              <div className="header__menu-user">
                <p className="header__menu-username">{userName}</p>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="header__menu-avatar header__menu-avatar_image"
                    onClick={(e) => {
                      handleProfileClick(e);
                      setIsMobileMenuOpened(false);
                    }}
                  />
                ) : (
                  <div
                    className="header__menu-avatar header__menu-avatar_initial"
                    onClick={(e) => {
                      handleProfileClick(e);
                      setIsMobileMenuOpened(false);
                    }}
                  >
                    {getInitial(userName)}
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  handleAddClick(e);
                  setIsMobileMenuOpened(false);
                }}
                type="button"
                className="header__menu-add-clothes-btn"
              >
                + Add clothes
              </button>
            </div>
          </div>
        )}

        {/* Desktop Navigation container */}
        <div className="header__user-container">
          <ToggleSwitch />
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <p
            className="header__username"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          >
            {userName}
          </p>

          {/* Avatar - either image or initial */}
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="header__avatar header__avatar_image"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            />
          ) : (
            <div
              className="header__avatar header__avatar_initial"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              {getInitial(userName)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
