import { toast } from "react-toastify";

toast.configure();
export default function handle_error(errorCode, err) {
  try {
    const userType = sessionStorage.getItem("user-type")
      ? sessionStorage.getItem("user-type")
      : "BORROWER";
    const redirectUrl = "/";
    if (errorCode === 403) {
      toast.error("Forbidden Access.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.pathname = redirectUrl;
      sessionStorage.clear();
    } else if (errorCode === 400) {
      let message = err.message ? err.message : "Bad Request..!!";
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Some error Occured", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (e) {}
}
