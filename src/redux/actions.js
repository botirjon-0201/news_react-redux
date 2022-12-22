import {
  newsFetchingError,
  newsCreated,
  newsDeleted,
} from "./reducers/news_slice";
import { toast } from "react-toastify";

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
    .catch(() => dispatch(newsFetchingError()));
};
// Mentorga savol bor. Shu yerda funksiyalar o'rnida string ishlata olamizmi? Data berilsa qanaqa bo'ladi?
