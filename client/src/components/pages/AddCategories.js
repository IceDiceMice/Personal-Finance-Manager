import React, { useState } from "react";
import Navbar from "../partials/Navbar";
import * as axios from "axios";
import PopUp from "../partials/PopUp";
import { BsCheck } from "react-icons/bs";

export default function AddCategories({
  active,
  setActive,
  data,
  setData,
  open,
  setOpen,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const popUpHandler = () => {
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };

  const reset = (e) => {
    e.preventDefault();
    setName("");
    setDescription("");

    setData({
      class: "checked",
      text: "Очищено",
      icon: <BsCheck className="popup-icon" />,
    });

    popUpHandler();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("api/category/add", { name, description })
      .then((res) => console.log(res.data));

    setName("");
    setDescription("");
    setData({
      class: "checked",
      text: "Збережено",
      icon: <BsCheck className="popup-icon" />,
    });
    popUpHandler();
  };

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <div className="edit-body">
        <h1>Реєстрація інформації про категорію доходів / витрат</h1>
        <div className="edit-block">
          <form onSubmit={handleSubmit}>
            <div className="input-pos">
              <label htmlFor="category">Назва категорії</label>
              <input
                type="text"
                id="category"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-pos">
              <label htmlFor="description">Короткий опис</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
