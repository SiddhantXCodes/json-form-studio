import { useState, useEffect } from "react";

export default function JsonInput({ jsonData, onChange }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Sync JSON → textarea
  useEffect(() => {
    if (jsonData) {
      setText(JSON.stringify(jsonData, null, 2));
    }
  }, [jsonData]);

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(text);
      setError("");
      onChange(parsed);
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="p-4 bg-white border-r flex flex-col">
      <h2 className="text-lg font-bold mb-2">JSON (Live)</h2>

      <textarea
        className="flex-1 border rounded p-2 font-mono text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      <button
        onClick={handleGenerate}
        className="mt-3 bg-blue-600 text-white py-2 rounded"
      >
        Parse / Sync JSON
      </button>
    </div>
  );
}
