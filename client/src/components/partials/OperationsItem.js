import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineCheck } from "react-icons/ai";
import * as axios from "axios";

export default function OperationsItem({ index, handleGetAll, operation }) {
  const initialValues = {
    category: operation.category,
    type: operation.type,
    summary: operation.summary,
    date: operation.date,
    description: operation.description,
  };
  const [values, setValues] = useState(initialValues);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const deleteOperation = (id) => {
    axios
      .delete(`${process.env.link}/operations/delete/${id}`)
      .then((res) => console.log(res.data))
      .then(handleGetAll);
  };

  const editOperation = (id) => {
    setEditMode(false);
    console.log(values);
    axios
      .put(`${process.env.link}/operations/update/${id}`, values)
      .then((res) => console.log(res.data))
      .then(handleGetAll);
  };
  return (
    <>
      <tr className="operation-item">
        <td>{index + 1}</td>
        <td>{operation.category}</td>
        <td>
          {editMode ? (
            <input
              name="type"
              value={values.type}
              onChange={handleInputChange}
              required
            ></input>
          ) : (
            operation.type
          )}
        </td>
        <td>
          {editMode ? (
            <input
              name="summary"
              value={values.summary}
              onChange={handleInputChange}
              required
            ></input>
          ) : (
            operation.summary
          )}
        </td>
        <td>
          {editMode ? (
            <input
              type="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
              required
            ></input>
          ) : (
            operation.date
          )}
        </td>
        <td>
          {editMode ? (
            <input
              name="description"
              value={values.description}
              onChange={handleInputChange}
              required
            ></input>
          ) : (
            operation.description
          )}
        </td>
        <td className="table-buttons">
          <span>
            {editMode ? (
              <button>
                <AiOutlineCheck onClick={() => editOperation(operation._id)} />
              </button>
            ) : (
              <button className="edit-button">
                <FiEdit onClick={() => setEditMode(true)} />
              </button>
            )}
            <button className="delete-button">
              <VscChromeClose onClick={() => deleteOperation(operation._id)} />
            </button>
          </span>
        </td>
      </tr>
    </>
  );
}
