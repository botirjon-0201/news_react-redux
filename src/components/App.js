import React from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import NewsAddForm from "./NewsAddForm";
import NewsFilter from "./NewsFilter";
import NewsList from "./NewsList";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <NavBar />
      <div className="content">
        <NewsList />
        <div className="content__page">
          <NewsAddForm />
          <NewsFilter />
        </div>
      </div>
    </div>
  );
}

export default App;
