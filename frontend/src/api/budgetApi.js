import axios from "axios";

const API_URL = "http://localhost:5051/";

// eslint-disable-next-line
export default {
  getAll() {
    return axios.get(API_URL + `api/budgets`);
  },
  search(query) {
    console.log(query);
    return axios.get(API_URL + `api/budgets/search`, {
      params: {
        title: query.title,
        category: query.category,
      },
    });
  },
};
