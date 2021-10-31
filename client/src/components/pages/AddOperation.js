import React, { useState, useEffect } from "react";
import Navbar from "../partials/Navbar";
import * as axios from "axios";
import PopUp from "../partials/PopUp";
import { BsCheck } from "react-icons/bs";

export default function AddOperation({
  active,
  setActive,
  data,
  setData,
  open,
  setOpen,
}) {
  const initialValues = {
    category: "Виберіть категорію",
    type: "",
    summary: "",
    date: "",
    description: "",
  };
  const [values, setValues] = useState(initialValues);
  const [categories, setCategories] = useState([]);

  let categoryArr = [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleGetAll = () => {
    axios.get("/category").then((res) => setCategories(res.data));
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  const arrFilter = () => {
    categories.map((category) => {
      categoryArr.push(category.name);
    });
    categoryArr = Array.from(new Set(categoryArr));
  };

  arrFilter();

  const reset = (e) => {
    e.preventDefault();
    setValues(initialValues);
    setData({
      class: "checked",
      text: "Очищено!",
      icon: <BsCheck className="popup-icon" />,
    });
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    axios
      .post("/operations/add", values)
      .then((res) => console.log(res.data))
      .then(reset());
  };
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <div className="edit-body">
        <h1>Реєстрація інформації про транзакції</h1>
        <div className="edit-block">
          <form onSubmit={handleSubmit}>
            <div className="input-pos">
              <label htmlFor="op-category">Назва категорії</label>
              <select
                id="op-category"
                name="category"
                value={values.category}
                onChange={handleInputChange}
                required
              >
                <option value="Виберіть категорію" hidden>
                  Виберіть категорію
                </option>
                {categoryArr.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-pos">
              <label htmlFor="op-type">Тип операції</label>
              <input
                type="text"
                id="op-type"
                name="type"
                value={values.type}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="input-pos">
              <label htmlFor="op-summary">Сума</label>
              <input
                type="text"
                id="op-summary"
                name="summary"
                value={values.summary}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="input-pos">
              <label htmlFor="op-describe">Короткий опис</label>
              <input
                type="text"
                id="op-describe"
                name="description"
                value={values.description}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="input-pos">
              <label htmlFor="op-date">Дата DD-MD-YYYY</label>
              <input
                type="date"
                id="date"
                name="date"
                value={values.date}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="edit-buttons">
              <button type="submit">Зберегти</button>
              <button onClick={reset}>Очистити</button>
            </div>
          </form>
        </div>
      </div>
      <PopUp active={active} data={data} />
    </div>
  );
}
