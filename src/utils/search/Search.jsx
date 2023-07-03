import React from "react";
import "./Search.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search({ placeholder, onChange, defaultValue = ''}) {
  return (
    <label className="d-flex border">
      <input
        placeholder={placeholder}
        name="search"
        className="p-3 mb-0 border-0"
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <div className="p-3">
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </label>
  );
}
