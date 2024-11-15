// Main.js
import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main_container">
      <div className="main_container__inner">
        <header>
          <MdArrowBackIos size={30} />
          View Audience
        </header>
        <Link to="/save" className="save_btn">
          Save Segment
        </Link>
      </div>
    </div>
  );
};

export default Main;
