import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getLogInUserData } from "../redux/actions/alertActions";
function Login(props) {
  const userLogInData = useSelector((state) => state.userLogInData);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { username, password } = inputs;
  //validation code
  let [errors, setErrors] = useState({
    username: [],
    password: [],
  });
  let [dirty, setDirty] = useState({
    username: false,
    password: false,
  });
  let validate = (name) => {
    let errorData = {};
    const charValidate = /^[a-zA-Z0-9]+$/;
    errorData.username = [];

    if (!inputs.username) {
      errorData.username.push("This field is required");
    }
    if (inputs.username) {
      if (!charValidate.test(inputs.username)) {
        errorData.username.push("Only single character allowed");
      }
    }
    errorData.password = [];
    if (!inputs.password) {
      errorData.password.push("This field is required");
    }
    setErrors(errorData);
  };
  let isValid = () => {
    let valid = true;

    //reading all controls from 'errors' state
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }

    return valid;
  };
  function handleErrors(e) {
    const { name, value } = e.target;

    setDirty((dirty) => ({ ...dirty, [name]: true }));

    validate();
  }

  useEffect(validate, [inputs]);
  //validation code ends
  function handleChange(e) {
    const { name, value } = e.target;

    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  let handleLogIn = async (e) => {
    e.preventDefault();
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();
    if (isValid()) {
      try {
        const userData = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/login`,
          inputs
        );
        if (userData.data.success) {
          dispatch(getLogInUserData(userData.data));
          let userRes = userData.data.user;
          sessionStorage.setItem(
            "x_access_token",
            userData.data.token ? userData.data.token : ""
          );
          sessionStorage.setItem("userId", userRes._id);
          sessionStorage.setItem("email", userRes.email);
          sessionStorage.setItem("name", userRes.name);
          sessionStorage.setItem("username", userRes.username);

          sessionStorage.setItem("user-type", userRes.role);
          props.history.replace("/dashboard");
        } else {
          alert("Username or password is wrong");
        }
      } catch (err) {
        alert("Username or password is wrong");
      }
    }
  };
  return (
    <>
      <div className="login-background">
        <div className="login-form">
          <div className="form-group">
            <i className="fa fa-user-o icon-input-pos" aria-hidden="true"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
              onBlur={handleErrors}
            />
          </div>
          <div className="text-danger">
            {dirty["username"] && errors["username"][0]
              ? errors["username"]
              : ""}
          </div>
          <div className="form-group">
            <i className="fa fa-lock icon-input-pos" aria-hidden="true"></i>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleErrors}
            />
          </div>
          <div className="text-danger">
            {dirty["password"] && errors["password"][0]
              ? errors["password"]
              : ""}
          </div>
          <button className="btn-login" onClick={handleLogIn}>
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
