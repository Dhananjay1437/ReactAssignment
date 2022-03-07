import ajax from "../utils/ajax";
let URI = process.env.REACT_APP_SERVER_URL;
export let getAllCountry = () => {
  let url = URI + "/api/country/";
  const res = ajax("GET", url, {});
  return res;
};
export let getStateByCountry = (id) => {
  let url = URI + "/api/country/" + id;
  const res = ajax("GET", url, {});
  return res;
};
