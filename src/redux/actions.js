import { toast } from "react-toastify";
// Mentorga savol bor. Shu yerda funksiyalar o'rnida string ishlata olamizmi? Data berilsa qanaqa bo'ladi?

export const fetchNews = (request) => (dispatch) => {
  dispatch(newsFetching());
  request(`http://localhost:3001/news`)
    .then((data) => dispatch(newsFetched(data)))
    .catch(() => dispatch(newsFetchingError()));
};
export const fetchDelete = (request, id) => (dispatch) => {
  request(`http://localhost:3001/news/${id}`, "DELETE")
    .then((data) => {
      dispatch(newsDeleted(id));
      toast.success("A news deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch(() => dispatch(newsFetchingError()));
};
export const fetchSubmit = (request, newNews) => (dispatch) => {
  request(`http://localhost:3001/news`, "POST", JSON.stringify(newNews))
    .then(() => {
      dispatch(newsCreated(newNews));
      toast.success("A new news added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((error) => console.log(error));
};
export const fetchFilter = (request) => (dispatch) => {
  dispatch("FILTERS_FETCHING");
  request(`http://localhost:3001/filters`)
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch("FILTERS_FETCHING_ERROR"));
};
export const newsFetching = () => {
  return {
    type: "NEWS_FETCHING",
  };
};
export const newsFetched = (news) => {
  return {
    type: "NEWS_FETCHED",
    payload: news,
  };
};
export const newsFetchingError = () => {
  return {
    type: "NEWS_FETCHING_ERROR",
  };
};
export const newsCreated = (news) => {
  return {
    type: "NEWS_CREATED",
    payload: news,
  };
};
export const newsDeleted = (id) => {
  return {
    type: "NEWS_DELETED",
    payload: id,
  };
};
export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};
export const activeFilterChanged = (filter) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: "ACTIVE_FILTER_CHANGED",
      payload: filter,
    });
  }, 1000);
};
