import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsCreated } from "../redux/actions";
import useHttp from "../hook/useHttp";
import { v4 } from "uuid";

function NewsAddForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { filters, filterLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newNews = { id: v4(), name, description, category };
    request(`http://localhost:3001/news`, "POST", JSON.stringify(newNews))
      .then(() => {
        console.log(`A new news added successfully!`);
        dispatch(newsCreated(newNews));
      })
      .catch((error) => console.log(error));

    setName("");
    setDescription("");
    setCategory("");
  };

  const renderCategory = (filters, status) => {
    if (status === "loading") {
      return <option>Loading option...</option>;
    } else if (status === "error") {
      return <option>Error option...</option>;
    } else {
      if (filters && filters.length > 0) {
        return filters.map(({ name, label }) => {
          if (name === "all") {
            // eslint-disable-next-line array-callback-return
            return;
          } else {
            return (
              <option key={name} value={name}>
                {label}
              </option>
            );
          }
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
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
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
          onChange={(e) => setCategory(e.target.value)}
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
