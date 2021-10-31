import React, { useState, useEffect } from "react";
import Navbar from ".././partials/Navbar";
import CategoryItem from "../partials/CategoryItem";
import { Link } from "react-router-dom";
import * as axios from "axios";

export default function Categories({ open, setOpen }) {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  const handleGetAll = () => {
    axios.get("api/category").then((res) => setCategories(res.data)
      
    );
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <div className="form-body categories-body">
        <h1>Категорії витрат / доходів</h1>
        <div className="form-table categories-table">
          <input
            type="text"
            placeholder="Пошук..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>

          <table>
            <thead>
              {categories.length > 1 && (
                <tr>
                  <th>#</th>
                  <th>Назва</th>
                  <th>Опис</th>
                  <th>Управління</th>
                </tr>
              )}
            </thead>
            <tbody>
              {categories
                .filter((category) => {
                  if (query === "") {
                    return category;
                  } else if (
                    category.name.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return category;
                  }
                })
                .map((category, index) => {
                  return (
                    <CategoryItem
                      category={category}
                      index={index}
                      handleGetAll={handleGetAll}
                      key={category._id}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <Link to="/edit-cat">
          <button type="submit">Додати нову категорію</button>
        </Link>
        <div className="categories-block-info"></div>
      </div>
    </div>
  );
}
