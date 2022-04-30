import axios from "axios";

const API_URL = "http://localhost:5050/";

export default {
  getAllBudgets() {
    return axios.get(API_URL + "api/budgets");
  },
};
