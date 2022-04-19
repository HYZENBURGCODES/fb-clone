import axios from "axios";
import {
  baseURL,
  endpoints,
  methods,
  header,
  authenticatedHeader,
} from "../../Server";

//get post Api
export const getpost = () => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: header.jsonHeader },
  });
  return instance
    .get(`${endpoints.list}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};