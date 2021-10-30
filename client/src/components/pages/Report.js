import React, { useState } from "react";
import Navbar from ".././partials/Navbar";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import ReportByDay from "../partials/ReportByDay";
import ReportByPeriod from "../partials/ReportByPeriod";

export default function Report({
  generatedData,
  finalDate,
  initialDate,
  open,
  setOpen,
}) {
  const [change, setChange] = useState(true);

  let sum = 0;

  const handleClick = () => {
    setChange(!change);
  };

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <div className="form-body">
        <h1>
          Звіт за період: {initialDate} - {finalDate}
        </h1>
        <h2>{generatedData[0]?.type}</h2>
        <div className="report-container">
          <div className="form-table report-table">
            <table>
              <thead>
                <tr>
                  <th>Категорія</th>
                  <th>Сума</th>
                </tr>
              </thead>
              <tbody>
                {generatedData?.map((data) => {
                  sum += data.summary;
                  return (
                    <tr key={data._id}>
                      <td>{data.category}</td>
                      <td>{data.summary}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" id="generator-summary">
                    Всього: {sum}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="chart-conteiner">
            {change && <ReportByDay generatedData={generatedData} />}
            {!change && <ReportByPeriod generatedData={generatedData} />}
            <div className="table-buttons">
              <button>
                <HiOutlineSwitchHorizontal onClick={handleClick} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
