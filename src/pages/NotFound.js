import NotAvailable from "../assets/images/notFound.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mt-5 text-center">
      <img src={NotAvailable} />
      <h3 className="text-white">Whoops! Lost in Space?</h3>
      <p className="text_tra1">
        The page you’re looking for isn’t found :( We suggest you back to home
      </p>
      <Link to="/">
        {" "}
        <button className="btn-blue w-25 mt-4">Go to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
