import React from "react";

export default function PopUp({ data, active }) {
  return (
    <div
      className={
        active ? `popup-body active ${data.class}` : `popup-body ${data.class}`
      }
    >
      <div className="pop-line"></div>
      {data.icon}
      {data.text}
    </div>
  );
}
//
