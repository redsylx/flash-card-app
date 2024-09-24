import React, { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`drop-zone ${dragOver ? "drag-over" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image ? (
        <img src={image} alt="Dropped" style={{ maxWidth: "300px" }} />
      ) : (
        <p>Drag & Drop an image or click to upload</p>
      )}
    </div>
  );
}

export default App;