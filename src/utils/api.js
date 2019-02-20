import axios from "axios";

const apiKey = "8e873620e5d8423aae1ed3d8d839e3e6";

const apiURL = url => {
  console.log(url);
  return `https://api.myjson.com/bins/${url}`;
};

const apiData = (url = "general") => {
  console.log(url);
  return `https://newsapi.org/v2/top-headlines?country=eg&category=${url}&page=1&apiKey=${apiKey}`;
};
const fetch = url => axios.get(url).then(response => response.data);

export default {
  getCategorys: () => fetch(apiURL("qk7qi")),
  getSubCategorys: categorysId => fetch(apiURL(`6frhm/?cat=${categorysId}`)),
  getData: slug => fetch(apiData(slug))
};
