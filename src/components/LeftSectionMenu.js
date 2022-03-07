import { NavLink } from "react-router-dom";
export default function LeftSectionMenu(props) {
  return (
    <>
      <div
        className={
          props.hideLeftPanel ? "left-panel-hide" : "form-left-section"
        }
      >
        <ul className="mr-1em">
          <li className="font-13-mob">
            <NavLink className="link" to="/dashboard" activeClassName="active">
              Employee Form
            </NavLink>
          </li>
          <li className="font-13-mob">
            <NavLink className="link" to="/list-view" activeClassName="active">
              Table View
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
