import apiInstance from "./apiInstance";

const getLists = () => {
  return apiInstance.get("/lists").then((response) => response.data);
};

export default {
  getLists,
};
