import React, { useState } from "react";

const JsonFileImporter = ({ onChange = () => {} } : { onChange?: (value: object) => void}) => {
  const [fileContent, setFileContent] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Safely access the selected file

    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const parsedJson = JSON.parse(event.target?.result as string);
          setFileContent(parsedJson);
          onChange(parsedJson)
          setError(null);
        } catch (err) {
          setError("Invalid JSON file. Please upload a valid JSON file.");
          setFileContent(null);
        }
      };

      reader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file.");
      setFileContent(null);
    }
  };

  return (
    <div>
      <h2>JSON File Importer</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileContent && (
        <div>
          <h3>File Content: {Object.keys(fileContent).length} keys</h3>
        </div>
      )}
    </div>
  );
};

export default JsonFileImporter;