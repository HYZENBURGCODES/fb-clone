const baseURL = `https://picsum.photos/v2/`;

const endpoints = {
  list: "list",
};

const methods = {
  get: `GET`,
  post: `POST`,
  put: `PUT`,
  delete: `DELETE`,
};

const header = {
  simpleHeader: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  jsonHeader: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  multiImage: "multipart/form-data",
};

async function authenticatedHeader() {
  const beareToken = await getAuthTokenDetails();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: beareToken,
  };
}

export { baseURL, endpoints, methods, header, authenticatedHeader };