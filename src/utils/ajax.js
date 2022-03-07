import axios from "axios";
import errorHandler from "./handle";

/**
 * Common API method
 * @param {string} method GET | POST | DELETE | PATCH
 * @param {string} baseURL http://api.example.com
 * @param {string} url /user/id
 * @param {object} params Query parameters
 * @param {object} headers API headers are appended to common headers
 * @param {object} body API body / Empty by default
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  method,
  url,
  params = {},
  headers = {},
  body = {},
  baseURL = process.env.REACT_APP_SERVER_URL
) => {
  try {
    const Header = {
      userId: sessionStorage.getItem("userId"),
      Authorization: `Bearer ${sessionStorage.getItem("x_access_token")}`,
      "user-type": sessionStorage.getItem("user-type"),
    };
    if (sessionStorage.getItem("x_access_token")) {
      const response = await axios({
        method,
        baseURL,
        url,
        params: { ...params },
        headers: { ...Header, ...headers },
        data: body,
      });
      return response.data;
    } else {
      errorHandler(403);
    }
  } catch (error) {
    if (error.response) {
      errorHandler(error.response.status, error.response.data);
    }
  }
};
