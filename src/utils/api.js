import axios from "axios";

const apiKey = "8e873620e5d8423aae1ed3d8d839e3e6";

const BaseUrl = `https://api.myjson.com/bins`;

const apiData = (slug = "general") => {
  return `https://newsapi.org/v2/top-headlines?country=eg&category=${slug}&page=1&apiKey=${apiKey}`;
};
const fetch = url => axios.get(url).then(response => response.data);

export default {
  getCategories: () => fetch(`${BaseUrl}/qk7qi`),
  getSubCategories: categorysId =>
    fetch(`${BaseUrl}/6frhm/?cat=${categorysId}`),
  getData: slug => fetch(apiData(slug))
};
