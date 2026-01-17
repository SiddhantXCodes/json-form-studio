export default function ContentFlagsEditor({ value, path, onChange }) {
  if (!value) return null;

  const toggle = (key) =>
    onChange(`${path}.${key}`, !value[key]);

  return (
    <div className="border rounded p-4 space-y-4">
      <h3 className="font-semibold text-lg">Content Flags</h3>

      {/* Boolean flags */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(value)
          .filter(([k]) => typeof value[k] === "boolean")
          .map(([key]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value[key]}
                onChange={() => toggle(key)}
              />
              {key.replaceAll("_", " ")}
            </label>
          ))}
      </div>

      {/* Priority */}
      <div>
        <label className="block font-medium mb-1">
          Priority Score
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={value.priority_score}
          onChange={(e) =>
            onChange(`${path}.priority_score`, Number(e.target.value))
          }
        />
        <div className="text-sm text-gray-600">
          {value.priority_score}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium mb-1">
          Content Status
        </label>
        <select
          value={value.content_status}
          onChange={(e) =>
            onChange(`${path}.content_status`, e.target.value)
          }
          className="border rounded px-2 py-1"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>Archived</option>
        </select>
      </div>
    </div>
  );
}
