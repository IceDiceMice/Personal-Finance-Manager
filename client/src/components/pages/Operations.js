import React, { useState, useEffect } from "react";
import Navbar from ".././partials/Navbar";
import { Link } from "react-router-dom";
import OperationsItem from "../partials/OperationsItem";
import * as axios from "axios";

export default function Operations({ open, setOpen }) {
  const [search, setSearch] = useState("Пошук по категоріям");
  const [operations, setOperations] = useState([]);

  let categoryArr = [];
  const handleGetAll = () => {
    axios.get("/operations").then((res) => setOperations(res.data));
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  const arrFilter = () => {
    operations.map((operation) => {
      categoryArr.push(operation.category);
    });
    categoryArr = Array.from(new Set(categoryArr));
  };
  arrFilter();

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <div className="form-body">
        <h1>Транзакції</h1>
        <div className="form-table">
          <select value={search} onChange={(e) => setSearch(e.target.value)}>
            <option value="Пошук по категоріям" hidden>
              Пошук по категоріям
            </option>
            <option
              value="Усі категорії"
              onChange={(e) => setSearch(e.target.value)}
            >
              Усі категорії
            </option>
            {categoryArr.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Категорія</th>
                <th>Тип операції</th>
                <th>Сума</th>
                <th>Дата</th>
                <th>Опис</th>
                <th>Управління</th>
              </tr>
            </thead>
            <tbody>
              {operations
                .filter((operation) => {
                  if (
                    search === "Пошук по категоріям" ||
                    search === "Усі категорії"
                  ) {
                    return operation;
                  } else if (operation.category === search) {
                    return operation;
                  }
                })
                .map((operation, index) => (
                  <OperationsItem
                    operation={operation}
                    index={index}
                    handleGetAll={handleGetAll}
                    key={operation._id}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <Link to="edit-op">
          <button type="submit">Додати нову транзакцію</button>{" "}
        </Link>
        <div className="categories-block-info"></div>
      </div>
    </div>
  );
}
