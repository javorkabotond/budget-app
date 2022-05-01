import axios from "axios";

const API_URL = "http://localhost:5053/";

// eslint-disable-next-line
export default {
  getAll() {
    return axios.get(API_URL + `api/budgets`);
  },
  search(query) {
    return axios.get(API_URL + `api/budgets/search`, {
      params: {
        title: query.title,
        category: query.category,
      },
    });
  },
  delete(id) {
    return axios.delete(API_URL + `api/budget/${id}`);
  },
};
