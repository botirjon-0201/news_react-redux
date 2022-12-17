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
        console.log(`A news deleted successfully!`);
        dispatch(newsDeleted(id));
      })
      .catch((error) => console.log(error));
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
      arr
        .map(({ id, ...props }) => {
          return (
            <NewsListItem key={id} {...props} onDelete={() => onDelete(id)} />
          );
        })
        .reverse()
    );
  };

  const element = renderNewsList(filteredNews);

  return <ul>{element}</ul>;
}

export default NewsList;
