import * as ALERT_CONSTANTS from "../constants/alertConstant";
export const alertReducer = (
  state = {
    userData: undefined,
  },
  action
) => {
  switch (action.type) {
    case ALERT_CONSTANTS.TOKEN_ACCESS:
      return Object.assign({}, state, {
        type: action.type,
        userData: action.data,
      });

    default:
      return state;
  }
};

export default alertReducer;
