import React, { useState, ChangeEvent } from "react";

const FontSizeSelector: React.FC<{ chapter: string }> = ({ chapter }) => {
  // List of font sizes
  const fontSizes: string[] = [
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
  ];

  // State to manage the selected font size
  const [selectedFontSize, setSelectedFontSize] = useState<string>("16px");

  // Handler for changing the font size
  const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFontSize(e.target.value);
  };

  return (
    <div>
      <label htmlFor="fontSizeSelect">Select Font Size: </label>
      <select
        id="fontSizeSelect"
        value={selectedFontSize}
        onChange={handleFontSizeChange}
      >
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <div style={{ fontSize: selectedFontSize }}>{chapter}</div>
    </div>
  );
};

export default FontSizeSelector;
