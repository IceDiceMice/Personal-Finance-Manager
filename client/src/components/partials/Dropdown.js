import React from "react";
import { Link } from "react-router-dom";
import Dropdownitem from "./Dropdownitem";
export default function Dropdown({ setOpen }) {
  return (
    <div
      className="dropdown"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ul>
        <Dropdownitem>
          <Link
            to="/categories"
            className="links"
            onClick={() => setOpen(false)}
          >
            <h1>Категорії витрат / доходів</h1>
          </Link>
        </Dropdownitem>
        <Dropdownitem>
          <Link
            to="/operations"
            className="links"
            onClick={() => setOpen(false)}
          >
            <h1>Транзакції</h1>
          </Link>
        </Dropdownitem>
        <Dropdownitem>
          <Link
            to="/generator"
            className="links"
            onClick={() => setOpen(false)}
          >
            <h1>Генератор звітів</h1>
          </Link>
        </Dropdownitem>
      </ul>
    </div>
  );
}
