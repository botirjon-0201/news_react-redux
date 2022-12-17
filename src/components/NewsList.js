import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hook/useHttp";
import {
  newsFetching,
  newsFetched,
  newsFetchingError,
  newsDeleted,
} from "../redux/actions";
import Spinner from "./Spinner";
import Error from "./Error";
import NewsListItem from "./NewsListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style/news_list.css";
import { toast } from "react-toastify";

function NewsList() {
  const { newsLoadingStatus, filteredNews } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(newsFetching());
    request(`http://localhost:3001/news`)
      .then((data) => dispatch(newsFetched(data)))
      .catch(() => dispatch(newsFetchingError()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/news/${id}`, "DELETE")
      .then((data) => {
        dispatch(newsDeleted(id));
        toast.success("A news deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => dispatch(newsFetchingError()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (newsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (newsLoadingStatus === "error") {
    return <Error />;
  }

  const renderNewsList = (arr) => {
    return arr.length === 0 ? (
      <h4>No news available!</h4>
    ) : (
      <TransitionGroup component="ul" className="todo-list">
        {arr
          .map(({ id, ...props }) => {
            return (
              <CSSTransition key={id} timeout={500} classNames="item">
                <NewsListItem {...props} onDelete={() => onDelete(id)} />
              </CSSTransition>
            );
          })
          .reverse()}
      </TransitionGroup>
    );
  };

  const element = renderNewsList(filteredNews);

  return { ...element };
}

export default NewsList;
