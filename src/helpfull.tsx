import React, { useState } from "react";
import "./App.css";
import { Plus, Save } from "lucide-react";

const HelpfulLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, title: "GCIL-PDF", url: "https://example.com/pdf1" },
    { id: 2, title: "GCIL-PDF 2", url: "https://example.com/pdf2" },
    { id: 3, title: "GCIL-PDF 3", url: "https://example.com/pdf3" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  const addLink = () => {
    if (newTitle.trim() && newUrl.trim()) {
      const newLink = { id: Date.now(), title: newTitle, url: newUrl };

      setLinks((prevLinks) => {
        const updatedLinks = [...prevLinks, newLink];
        console.log("Updated Links:", updatedLinks); // ✅ Check if new object is added
        return updatedLinks;
      });

      setNewTitle("");
      setNewUrl("");
      setShowInputs(false);
    }
  };

  const editLink = (id, newTitle) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, title: newTitle } : link
      )
    );
    setIsEditing(null);
  };

  const deleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
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
                  className="close-button"
                  onClick={() => deleteLink(link.id)}
                >
                  ✖
                </button>
              </>
            )}
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
            <button className="save-button" onClick={addLink}>
              <Save size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpfulLinks;
