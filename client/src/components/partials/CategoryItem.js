import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineCheck } from "react-icons/ai";
import * as axios from "axios";

export default function CategoryItem({ index, category, handleGetAll }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const deleteCategory = (id) => {
    axios
      .delete(`/category/delete/${id}`)
      .then((res) => console.log(res.data))
      .then(handleGetAll);
  };

  const editCategory = (id) => {
    setEditMode(false);
    axios
      .put(`/category/update/${id}`, { name, description })
      .then((res) => console.log(res.data))
      .then(handleGetAll);
  };
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          {editMode ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          ) : (
            category.name
          )}
        </td>
        <td>
          {editMode ? (
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></input>
          ) : (
            category.description
          )}
        </td>
        <td className="table-buttons">
          <span>
            {editMode ? (
              <button>
                <AiOutlineCheck onClick={() => editCategory(category._id)} />
              </button>
            ) : (
              <button>
                <FiEdit onClick={() => setEditMode(true)} />
              </button>
            )}
            <button>
              <VscChromeClose onClick={() => deleteCategory(category._id)} />
            </button>
          </span>
        </td>
      </tr>
    </>
  );
}
