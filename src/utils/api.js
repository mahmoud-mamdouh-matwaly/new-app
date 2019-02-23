import axios from "axios";

const apiKey = "8e873620e5d8423aae1ed3d8d839e3e6";

const BaseUrl = `https://api.myjson.com/bins`;

const apiData = (slug, page) => {
  return `https://newsapi.org/v2/top-headlines?country=eg&category=${slug}&page=${page}&apiKey=${apiKey}`;
};
const getData = url => axios.get(url).then(response => response.data);

export default {
  getCategories: () => getData(`${BaseUrl}/qk7qi`),
  getSubCategories: categorysId =>
    getData(`${BaseUrl}/6frhm/?cat=${categorysId}`),
  getCardData: (slug, page) => getData(apiData(slug, page))
};
