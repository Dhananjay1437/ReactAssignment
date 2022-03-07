import * as ALERT_CONSTANTS from "../constants/alertConstant";

export const getLogInUserData = (data) => (dispatch) => {
  dispatch({
    type: ALERT_CONSTANTS.TOKEN_ACCESS,
    data,
  });
};
