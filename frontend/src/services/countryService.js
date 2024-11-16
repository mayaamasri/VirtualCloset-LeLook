import http from "../http-common";

const getAll = () => {
  return http.get("countries");
};

const CountryService = {
  getAll,
};

export default CountryService;
