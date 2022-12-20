import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hook/useHttp";
import { fetchNews, fetchDelete } from "../redux/actions";
import Spinner from "./Spinner";
import Error from "./Error";
import NewsListItem from "./NewsListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style/news_list.css";
import { createSelector } from "reselect";

function NewsList() {
  const SelectFilteredNews = createSelector(
    (state) => state.filter.activeFilter,
    (state) => state.news.news,
    (activeFilter, news) => {
      return activeFilter === "all"
        ? news
        : news.filter((item) => item.category === activeFilter);
    }
  );

  const newsLoadingStatus = useSelector(
    (state) => state.news.newsLoadingStatus
  );
  const filteredNews = useSelector(SelectFilteredNews);

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchNews(request));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = useCallback((id) => {
    dispatch(fetchDelete(request, id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (newsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (newsLoadingStatus === "error") {
    return <Error />;
  }

  const renderNewsList = (arr) => {
    return arr.length === 0 ? (
      <h4 className="text-center mt-5">No news available!</h4>
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
