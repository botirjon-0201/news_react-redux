import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmit } from "../redux/actions";
import useHttp from "../hook/useHttp";
import { v4 } from "uuid";
import {
  setCategory,
  setDescription,
  setName,
} from "../redux/reducers/add_slice";

function NewsAddForm() {
  const { name, description, category } = useSelector((state) => state.add);
  const { filters, filterLoadingStatus } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newNews = { id: v4(), name, description, category };
    dispatch(fetchSubmit(request, newNews));
    dispatch(setName(""));
    dispatch(setDescription(""));
    dispatch(setCategory(""));
  };

  const renderCategory = (filters, status) => {
    if (status === "loading") {
      return <option>Loading option...</option>;
    } else if (status === "error") {
      return <option>Error option...</option>;
    } else {
      if (filters && filters.length > 0) {
        return filters.map(({ name, label }) => {
          return name === "all" ? (
            false
          ) : (
            <option key={name} value={name}>
              {label}
            </option>
          );
        });
      }
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Name for new News
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="form-control"
          placeholder="What is name of news?"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Description
        </label>
        <textarea
          type="text"
          id="text"
          name="text"
          required
          className="form-control"
          placeholder="What is your news about?"
          style={{ height: "120px" }}
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label fs-4">
          Choose category of news
        </label>
        <select
          required
          className="form-select"
          id="category"
          name="category"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="defaultValue">Category of News...</option>
          {renderCategory(filters, filterLoadingStatus)}
        </select>
      </div>
      <button type="submit" className="btn btn-success w-100 shadow-lg">
        Create News
      </button>
    </form>
  );
}

export default NewsAddForm;
