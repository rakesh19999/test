import React, { useState } from "react";
import "./App.css";

const TextBox = ({ onAddLink }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleAddLink = () => {
    if (title && link) {
      onAddLink({ title, link });
      setTitle("");
      setLink("");
    }
  };

  return (
    <div className="input-wrapper">
      <div className="input-container">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="title">Title</label>
      </div>
      <div className="input-container">
        <input
          type="text"
          id="links"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <label htmlFor="links">Links</label>
      </div>
      <button className="add-button" onClick={handleAddLink}>
        Add
      </button>
    </div>
  );
};

export default TextBox;
