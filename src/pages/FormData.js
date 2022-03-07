import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import LeftSectionMenu from "../components/LeftSectionMenu";
import { getAllCountry, getStateByCountry } from "../api/countryApi";
import { postFormData } from "../api/formDataApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function FormData(props) {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    language: [],
    country: "",
    state: "",
    city: "",
    password: "",
  });
  let {
    fullname,
    email,
    phone,
    gender,
    language,
    country,
    state,
    city,
    password,
  } = inputs;
  const [hideLeftPanel, setHideLeftPanel] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  let getAllCountryData = async () => {
    let res = await getAllCountry();

    setCountryData(res.data);
  };
  let countryChanged = async (name) => {
    let res = await getStateByCountry(name);
    console.log(res);
    if (res.data) {
      setStateData(res.data.states);
    }
  };
  let stateChanged = (name) => {
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i].name === name) {
        setCityData(stateData[i].cities);
      }
    }
  };

  useEffect(getAllCountryData, []);

  //validation code
  let [errors, setErrors] = useState({
    fullname: [],
    email: [],
    phone: [],
    gender: [],
    language: [],
    country: [],
    state: [],
    city: [],
    password: [],
  });
  let [dirty, setDirty] = useState({
    fullname: false,
    email: false,
    phone: false,
    gender: false,
    language: false,
    country: false,
    state: false,
    city: false,
    password: false,
  });
  let validate = (name) => {
    let errorData = {};
    errorData.fullname = [];
    if (!inputs.fullname) {
      errorData.fullname.push("This field is required");
    }
    errorData.email = [];
    if (!inputs.email) {
      errorData.email.push("This field is required");
    }
    errorData.phone = [];
    if (!inputs.phone) {
      errorData.phone.push("This field is required");
    }
    errorData.gender = [];
    if (!inputs.gender) {
      errorData.gender.push("This field is required");
    }
    errorData.language = [];
    if (inputs.language.length == 0) {
      errorData.language.push("This field is required");
    }
    errorData.country = [];
    if (!inputs.country) {
      errorData.country.push("This field is required");
    }
    errorData.state = [];
    if (!inputs.state) {
      errorData.state.push("This field is required");
    }
    errorData.city = [];
    if (!inputs.city) {
      errorData.city.push("This field is required");
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
  let checkBoxDataHnandle = (e) => {
    const { name, value } = e.target;
    let arr = [...inputs.language];
    let exist = 0;
    if (arr.length != 0) {
      for (let i = 0; i < arr.length; i++) {
        if (e.target.checked) {
          if (arr[i] != value) {
            exist = 0;
          } else {
            exist = 1;
          }
        } else {
          if (arr[i] === value) {
            arr.splice(i, 1);
          }
        }
      }
      if (e.target.checked && exist === 0) {
        arr.push(value);
      }
    } else {
      arr.push(value);
    }
    return arr;
  };
  //validation code ends
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "language") {
      let arr = checkBoxDataHnandle(e);
      setInputs((inputs) => ({ ...inputs, [name]: arr }));
    } else {
      setInputs((inputs) => ({ ...inputs, [name]: value }));
    }
  }

  let handleSubmit = async (e) => {
    console.log("hi", inputs);

    e.preventDefault();
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();
    if (isValid()) {
      let resp = await postFormData(inputs);
      if (resp) {
        toast.success("Data save successfully");
        props.history.push("/list-view");
      }
    }
  };
  let showHideLeftPanel = () => {
    setHideLeftPanel(!hideLeftPanel);
  };
  return (
    <div className="form-container">
      <Navbar
        history={props.history}
        showHideLeftPanel={showHideLeftPanel}
        hideLeftPanel={hideLeftPanel}
      ></Navbar>
      <div className={hideLeftPanel ? "" : "form-section"}>
        <LeftSectionMenu hideLeftPanel={hideLeftPanel} />

        <div className="emp-form">
          <div className="emp-form-group">
            <label className="emp-label">Full Name</label>
            <input
              type="text"
              className="emp-form-control"
              placeholder="Full Name"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              onBlur={handleErrors}
            />
            <div className="text-danger-form">
              {dirty["fullname"] && errors["fullname"][0]
                ? errors["fullname"]
                : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">Email</label>
            <input
              type="email"
              className="emp-form-control"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleErrors}
            />
            <div className="text-danger-form">
              {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">Password</label>
            <input
              type="password"
              className="emp-form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleErrors}
            />
            <div className="text-danger-form">
              {dirty["password"] && errors["password"][0]
                ? errors["password"]
                : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">Mobile</label>
            <input
              type="number"
              className="emp-form-control"
              placeholder="Mobile"
              name="phone"
              value={phone}
              onChange={handleChange}
              onBlur={handleErrors}
            />
            <div className="text-danger-form">
              {dirty["phone"] && errors["phone"][0] ? errors["phone"] : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">Gender</label>
            <div className="input-group">
              <input
                type="radio"
                name="gender"
                value={"Male"}
                onChange={handleChange}
                onBlur={handleErrors}
              />
              Male &nbsp; &nbsp;
              <input
                type="radio"
                name="gender"
                value={"Female"}
                onChange={handleChange}
                onBlur={handleErrors}
              />
              Female
            </div>
            <div className="text-danger-form">
              {dirty["gender"] && errors["gender"][0] ? errors["gender"] : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">Language</label>
            <div className="input-group">
              <input
                type="checkbox"
                name="language"
                value={"Hindi"}
                onChange={handleChange}
                onBlur={handleErrors}
              />
              Hindi &nbsp;&nbsp;
              <input
                type="checkbox"
                name="language"
                value={"English"}
                onChange={handleChange}
                onBlur={handleErrors}
              />
              English
            </div>
            <div className="text-danger-form">
              {dirty["language"] && errors["language"][0]
                ? errors["language"]
                : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">Country</label>
            <select
              className="emp-form-control"
              name="country"
              value={country}
              onChange={(e) => {
                handleChange(e);
                countryChanged(e.target.value);
              }}
              onBlur={handleErrors}
            >
              <option value={null}>Select country</option>
              {countryData.map((coun) => (
                <option value={coun.name}>{coun.name}</option>
              ))}
            </select>
            <div className="text-danger-form">
              {dirty["country"] && errors["country"][0]
                ? errors["country"]
                : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">State</label>
            <select
              className="emp-form-control"
              name="state"
              value={state}
              onChange={(e) => {
                handleChange(e);
                stateChanged(e.target.value);
              }}
              onBlur={handleErrors}
            >
              <option value={null}>Select state</option>
              {stateData.map((coun) => (
                <option value={coun.name}>{coun.name}</option>
              ))}
            </select>
            <div className="text-danger-form">
              {dirty["state"] && errors["state"][0] ? errors["state"] : ""}
            </div>
          </div>
          <div className="emp-form-group">
            <label className="emp-label">City</label>
            <select
              className="emp-form-control"
              name="city"
              value={city}
              onChange={handleChange}
              onBlur={handleErrors}
            >
              <option>Select city</option>
              {cityData.map((coun) => (
                <option value={coun.name}>{coun.name}</option>
              ))}
            </select>
            <div className="text-danger-form">
              {dirty["city"] && errors["city"][0] ? errors["city"] : ""}
            </div>
          </div>
          <button type="button" className="btn-form" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormData;
