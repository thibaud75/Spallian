import React from "react";
import "./ButtonSearch.css";

export default function ButtonSearch({ onClick, disabled, children }) {
  return (
    <button className="ButtonSearch" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
