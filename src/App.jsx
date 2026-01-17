import { useState } from "react";
import JsonInput from "./components/JsonInput";
import JobEditor from "./components/JobEditor";

export default function App() {
  const [jsonData, setJsonData] = useState(null);

  return (
    <div className="h-screen grid grid-cols-2 bg-gray-100">
      {/* LEFT: JSON LIVE VIEW */}
      <JsonInput
        jsonData={jsonData}
        onChange={setJsonData}
      />

      {/* RIGHT: EDITOR */}
      <JobEditor
        data={jsonData}
        onChange={setJsonData}
      />
    </div>
  );
}
