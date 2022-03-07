import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "../components/NavBar";
import LeftSectionMenu from "../components/LeftSectionMenu";
import { getAllFormData } from "../api/formDataApi";
export default function ListView(props) {
  const [hideLeftPanel, setHideLeftPanel] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  let showHideLeftPanel = () => {
    setHideLeftPanel(!hideLeftPanel);
  };
  let getAllData = async () => {
    let res = await getAllFormData();
    console.log(res);
    setFormDataList(res.data);
  };
  useEffect(getAllData, []);
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
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Language</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {formDataList.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.fullname}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.gender}</td>
                  <td>{data.language.toString()}</td>
                  <td>
                    {data.city},{data.state},{data.country}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
