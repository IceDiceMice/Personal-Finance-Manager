import React, { useState, useEffect } from "react";
import Navbar from "../partials/Navbar";
import * as axios from "axios";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import PopUp from "../partials/PopUp";

export default function ReportGenerator({
  generatedData,
  setGeneratedData,
  setInitialDate,
  setFinalDate,
  active,
  setActive,
  data,
  setData,
  setAccess,
  open,
  setOpen,
}) {
  const initialValues = {
    initialDate: "",
    finalDate: "",
    type: "Виберіть тип",
    category: "Виберіть категорію",
  };
  const [values, setValues] = useState(initialValues);
  const [operations, setOperations] = useState([]);
  let typeArr = [];
  let categoryArr = [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const arrFilter = () => {
    operations.map((operation) => {
      typeArr.push(operation.type);
      categoryArr.push(operation.category);
    });
    typeArr = Array.from(new Set(typeArr));
    categoryArr = Array.from(new Set(categoryArr));
  };
  arrFilter();

  useEffect(() => {
    axios
      .get("http://localhost:4000/operations/")
      .then((res) => setOperations(res.data))
      .then();
  }, []);

  const popUpHandler = () => {
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let arr = operations
      .filter((operation) => {
        if (
          values.finalDate >= operation.date &&
          values.initialDate <= operation.date
        ) {
          return operation;
        }
      })
      .filter((operation) => {
        if (
          values.type !== "Виберіть тип" &&
          values.category !== "Виберіть категорію"
        ) {
          return (
            operation.type === values.type &&
            operation.category === values.category
          );
        } else if (values.type !== "Виберіть тип") {
          return operation.type === values.type;
        } else {
          return operation.category === values.category;
        }
      });

    setInitialDate(values.initialDate);
    setFinalDate(values.finalDate);
    setGeneratedData(arr);

    if (arr.length > 1) {
      setAccess(true);
      setData({
        class: "checked",
        text: "Згенеровано",
        icon: <BsCheck className="popup-icon" />,
      });
      popUpHandler();
    } else {
      setAccess(false);
      setData({
        class: "canceled",
        text: "Не достатньо даних",
        icon: <VscChromeClose className="popup-icon" />,
      });
      popUpHandler();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setGeneratedData([]);
    setValues(initialValues);
    setData({
      class: "checked",
      text: "Очищено!",
      icon: <BsCheck className="popup-icon" />,
    });
    popUpHandler();
  };

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <div className="edit-body">
        <h1>Генератор звітів</h1>
        <div className="edit-block">
          <form onSubmit={handleSubmit}>
            <div className="input-pos">
              <label htmlFor="date">Дата DD-MD-YYYY</label>
              <input
                type="date"
                id="date"
                name="initialDate"
                value={values.initialDate}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="input-pos">
              <label htmlFor="date">Дата DD-MD-YYYY</label>
              <input
                type="date"
                id="date"
                name="finalDate"
                value={values.finalDate}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="input-pos">
              <label htmlFor="gen-type">Тип операції</label>
              <select
                id="gen-type"
                name="type"
                value={values.type}
                onChange={handleInputChange}
              >
                <option value={values.type} hidden>
                  {values.type}
                </option>
                {typeArr.map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-pos">
              <label htmlFor="gen-category">Категорія</label>
              <select
                id="gen-category"
                name="category"
                value={values.category}
                onChange={handleInputChange}
              >
                <option value={values.category} hidden>
                  {values.category}
                </option>
                {categoryArr.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="edit-buttons">
              <button type="submit">Згенерувати</button>
              <button onClick={handleClick}>Очистити</button>
              <Link to="/report">
                <button disabled={generatedData.length <= 1}>Графік</button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <PopUp active={active} data={data} />
    </div>
  );
}
