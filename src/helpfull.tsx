import React, { useState } from "react";
import "./App.css";
import { Plus, Save } from "lucide-react";

const HelpfulLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, title: "GCIL-PDF", url: "https://example.com/pdf1" },
    { id: 2, title: "GCIL-PDF2", url: "https://example.com/pdf2" },
    { id: 3, title: "GCIL-PDF-3", url: "https://example.com/pdf3" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [editId, setEditId] = useState(null);

  const addOrUpdateLink = () => {
    if (newTitle.trim() && newUrl.trim()) {
      if (editId) {
        // Update existing link
        setLinks(
          links.map((link) =>
            link.id === editId
              ? { ...link, title: newTitle, url: newUrl }
              : link
          )
        );
      } else {
        // Add new link
        setLinks([
          ...links,
          { id: links.length + 1, title: newTitle, url: newUrl },
        ]);
      }
      setShowInputs(false);
      setEditId(null);
      setNewTitle("");
      setNewUrl("");
    }
  };

  const handleEdit = (link) => {
    setNewTitle(link.title);
    setNewUrl(link.url);
    setEditId(link.id);
    setShowInputs(true);
  };

  const deleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="helpful-links">
      <div className="header">
        <h3>Helpful Links</h3>
        <button className="add-button" onClick={() => setShowInputs(true)}>
          <Plus size={16} />
        </button>
      </div>

      <div className="links-container">
        {links.map((link) => (
          <span key={link.id} className="link-item">
            <span onClick={() => handleEdit(link)} className="editable-link">
              {link.title}
            </span>
            <button
              className="close-button"
              onClick={() => deleteLink(link.id)}
            >
              ✖
            </button>
          </span>
        ))}
      </div>

      {showInputs && (
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
            <button className="save-button" onClick={addOrUpdateLink}>
              <Save size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpfulLinks;
