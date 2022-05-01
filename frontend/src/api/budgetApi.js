import http from "../common/http_common";

// eslint-disable-next-line
export default {
  getAll() {
    return http.get(`/budgets`);
  },
  getById(id) {
    return http.get(`/budget/${id}`);
  },
  search(query) {
    return http.get(`/budgets/search`, {
      params: {
        title: query.title,
        category: query.category,
      },
    });
  },
  update(query) {
    return http.put(`/budget/${query.id}`, query);
  },
  save(query) {
    return http.post(`/create`, query);
  },
  delete(id) {
    return http.delete(`/budget/${id}`);
  },
};
