import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://compare-list.herokuapp.com";

const instance = axios.create({
  baseURL: url,
});

instance.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default instance;
