import React, { useState } from "react";
import "./App.css";
import { Plus, Edit } from "lucide-react";

const HelpfulLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, title: "GCIL-PDF", url: "https://example.com/pdf1" },
    { id: 2, title: "GCIL-PDF2", url: "https://example.com/pdf2" },
    { id: 3, title: "GCIL-PDF-3", url: "https://example.com/pdf3" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const addLink = () => {
    if (newTitle.trim() && newUrl.trim()) {
      setLinks([
        ...links,
        { id: links.length + 1, title: newTitle, url: newUrl },
      ]);
      setNewTitle("");
      setNewUrl("");
    }
  };

  const editLink = (id, newTitle) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, title: newTitle } : link
      )
    );
    setIsEditing(null);
  };

  return (
    <div className="helpful-links">
      <div className="header">
        <h3>Helpful Links</h3>
        <button className="add-button" onClick={addLink}>
          <Plus size={16} />
        </button>
      </div>

      <p>
        {links.map((link) => (
          <span key={link.id}>
            {isEditing === link.id ? (
              <input
                type="text"
                defaultValue={link.title}
                onBlur={(e) => editLink(link.id, e.target.value)}
                autoFocus
              />
            ) : (
              <>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(link.id)}
                >
                  <Edit size={14} />
                </button>
              </>
            )}
            {link.id !== links.length && ", "}
          </span>
        ))}
      </p>
      {/* Floating Label Inputs */}
      <div className="input-wrapper">
        <div className="input-container">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <label className={newTitle ? "active" : ""}>Title</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
          />
          <label className={newUrl ? "active" : ""}>Links</label>
        </div>
      </div>
    </div>
  );
};

export default HelpfulLinks;
