import React, { useState } from "react";
import "./App.css";
import { Plus, Save, X } from "lucide-react";

const HelpfulLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, title: "GCIL-PDF", url: "https://example.com/pdf1" },
    { id: 2, title: "GCIL-PDF2", url: "https://example.com/pdf2" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(""); // Store validation error message

  const isSaveDisabled =
    newTitle.trim().length === 0 || newUrl.trim().length === 0;

  const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

  const validateInputs = () => {
    if (!newTitle.trim()) {
    }
    if (!newUrl.trim()) {
    }
    if (newTitle.length > 20) {
      setError("Title cannot exceed 20 characters.");
      return false;
    }
    if (newUrl.length > 500) {
      setError("Link cannot exceed 500 characters.");
      return false;
    }
    if (!urlRegex.test(newUrl)) {
      setError("Invalid URL. Only HTTP and HTTPS links are allowed.");
      return false;
    }
    setError(""); // Clear error if validation passes
    return true;
  };

  const addOrUpdateLink = () => {
    if (!validateInputs()) return;

    if (editId) {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === editId ? { ...link, title: newTitle, url: newUrl } : link
        )
      );
    } else {
      if (links.length < 5) {
        setLinks((prevLinks) => [
          ...prevLinks,
          { id: prevLinks.length + 1, title: newTitle, url: newUrl },
        ]);
      }
    }
    closeInputContainer();
  };

  const handleEdit = (link) => {
    setNewTitle(link.title);
    setNewUrl(link.url);
    setEditId(link.id);
    setShowInputs(true);
    setError(""); // Clear previous errors
  };

  const deleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const toggleInputContainer = () => {
    if (showInputs) {
      closeInputContainer();
    } else {
      setNewTitle("");
      setNewUrl("");
      setEditId(null);
      setShowInputs(true);
      setError(""); // Reset error when reopening
    }
  };

  const closeInputContainer = () => {
    setShowInputs(false);
    setEditId(null);
    setNewTitle("");
    setNewUrl("");
    setError(""); // Reset error on close
  };

  return (
    <div className="helpful-links">
      <div className="header">
        <h3>Helpful Links</h3>
        <button
          className={`toggle-button ${links.length >= 5 ? "disabled" : ""}`}
          onClick={toggleInputContainer}
          disabled={links.length >= 5}
        >
          {showInputs ? <X size={16} /> : <Plus size={16} />}
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
        <>
          {error && <div className="error-ribbon">{error}</div>}{" "}
          {/* Error Ribbon */}
          <div className="input-wrapper">
            <div className="input-container">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <label className={newTitle ? "active" : ""}>
                Title <span className="required">*</span>
              </label>
            </div>
            <div className="input-container">
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
              />
              <label className={newUrl ? "active" : ""}>
                Link <span className="required">*</span>
              </label>
              <button
                className="save-button"
                onClick={addOrUpdateLink}
                disabled={isSaveDisabled}
              >
                <Save size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HelpfulLinks;
