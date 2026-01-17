export default function StringListEditor({ label, value = [], path, onChange }) {
  return (
    <div className="border rounded p-3">
      <h3 className="font-semibold mb-2">{label}</h3>

      {value.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={item}
            onChange={e =>
              onChange(`${path}[${index}]`, e.target.value)
            }
          />
          <button
            className="text-red-500 text-sm"
            onClick={() =>
              onChange(
                path,
                value.filter((_, i) => i !== index)
              )
            }
          >
            ✕
          </button>
        </div>
      ))}

      <button
        className="text-blue-600 text-sm"
        onClick={() => onChange(path, [...value, ""])}
      >
        + Add Item
      </button>
    </div>
  );
}
