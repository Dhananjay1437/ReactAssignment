import React, { useState, useEffect, useCallback, useMemo } from "react";
import defaultImg from "../assets/images/defaultImg.jpg";
export default function Navbar(props) {
  const [hide, setHide] = useState(true);

  let showHideDropDown = () => {
    setHide(!hide);
  };

  let logOut = () => {
    sessionStorage.clear();
    props.history.replace("/");
  };
  return (
    <div className="sticky-top">
      <div className={props.hideLeftPanel ? "" : "nav-container"}>
        <div
          className={props.hideLeftPanel ? "left-panel-hide" : "left-section"}
        >
          <div className="nav-left-section">
            <div className="logo-sec">Logo</div>
          </div>
        </div>
        <div className="nav">
          <i
            className="fa fa-bars hambu"
            aria-hidden="true"
            onClick={props.showHideLeftPanel}
          ></i>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item pr-20">
              <a className="nav-link" href="#">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
              </a>
            </li>
            <li className="nav-item pr-20">
              <a className="nav-link" href="#">
                <i className="fa fa-bell-o" aria-hidden="true"></i>
              </a>
            </li>
            <li className="nav-item">
              <div className="user-info" onClick={showHideDropDown}>
                <img src={defaultImg} className="img-circle"></img> &nbsp;User
              </div>
              <div className={hide ? "dropdown-items hide" : "dropdown-items"}>
                <span className="caret up"></span>
                <div className="dropdown-item">
                  <a onClick={logOut}>Log out</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
