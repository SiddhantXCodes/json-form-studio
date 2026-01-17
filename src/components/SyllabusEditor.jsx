export default function SyllabusEditor({ value = {}, path, onChange }) {

  const updateSubjectName = (oldKey, newKey) => {
    const updated = { ...value };
    updated[newKey] = updated[oldKey];
    delete updated[oldKey];
    onChange(path, updated);
  };

  const updateTopics = (subject, text) => {
    const topics = text
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    onChange(`${path}.${subject}`, topics);
  };

  const addSubject = () => {
    const name = prompt("Enter subject name");
    if (!name) return;
    onChange(`${path}.${name}`, []);
  };

  const removeSubject = (subject) => {
    const updated = { ...value };
    delete updated[subject];
    onChange(path, updated);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Syllabus</h3>

      <div className="space-y-3">
        {Object.entries(value).map(([subject, topics]) => (
          <div key={subject} className="border rounded p-3">
            
            {/* Subject Name */}
            <input
              className="w-full border rounded px-2 py-1 font-medium mb-2"
              value={subject}
              onChange={(e) =>
                updateSubjectName(subject, e.target.value)
              }
            />

            {/* Topics */}
            <textarea
              rows={2}
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder="Enter topics separated by commas"
              value={topics.join(", ")}
              onChange={(e) =>
                updateTopics(subject, e.target.value)
              }
            />

            <button
              className="text-red-600 text-sm mt-1"
              onClick={() => removeSubject(subject)}
            >
              Remove Subject
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-3 px-3 py-1 border rounded text-sm"
        onClick={addSubject}
      >
        + Add Subject
      </button>
    </div>
  );
}
