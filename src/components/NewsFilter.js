import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hook/useHttp";
import Spinner from "./Spinner";
import Error from "./Error";
import classNames from "classnames";
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} from "../redux/actions";

function NewsFilter() {
  const { filters, filterLoadingStatus, activeFilter } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request(`http://localhost:3001/filters`)
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (filterLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filterLoadingStatus === "error") {
    return <Error />;
  }

  const renderFilters = (arr) => {
    return arr.length === 0 ? (
      <h4 className="text-center mt-5">No filters available!</h4>
    ) : (
      arr.map(({ name, className, label }) => {
        const btnClasses = classNames("btn", className, {
          active: name === activeFilter,
        });
        return (
          <button
            key={name}
            id={name}
            className={btnClasses}
            onClick={() => dispatch(activeFilterChanged(name))}
          >
            {label}
          </button>
        );
      })
    );
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter by category</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
}

export default NewsFilter;
