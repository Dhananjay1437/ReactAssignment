import ajax from "../utils/ajax";
let URI = process.env.REACT_APP_SERVER_URL;
export let getAllFormData = () => {
  let url = URI + "/api/formdata/";
  const res = ajax("GET", url, {});
  return res;
};
export let postFormData = (data) => {
  let url = URI + "/api/formdata/";
  const res = ajax("POST", url, {}, {}, data);
  return res;
};
