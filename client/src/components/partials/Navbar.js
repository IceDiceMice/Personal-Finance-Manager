import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsJustify } from "react-icons/bs";
import Dropdown from "./Dropdown";
export default function Navbar({ open, setOpen }) {
  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };
  return (
    <nav className="navbar">
      <Link to="/" className="title">
        <h1>Personal Finance Manager</h1>
      </Link>
      <div className="navbar-icon">
        <BsJustify onClick={handleClick} />
      </div>
      {open && <Dropdown setOpen={setOpen} />}
    </nav>
  );
}
