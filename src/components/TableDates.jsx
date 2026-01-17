export default function TableDates({ value, path, onChange }) {
  const handleChange = (index, key, newValue) => {
    const updated = value.map((row, i) =>
      i === index ? { ...row, [key]: newValue } : row
    );
    onChange(path, updated);
  };

  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Label</th>
            <th className="border px-3 py-2 text-left">Current</th>
          </tr>
        </thead>
        <tbody>
          {value.map((row, i) => (
            <tr key={i}>
              <td className="border px-3 py-2">
                <input
                  value={row.label || ""}
                  onChange={e =>
                    handleChange(i, "label", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </td>

              <td className="border px-3 py-2">
                <input
                  value={row.current || ""}
                  onChange={e =>
                    handleChange(i, "current", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                  placeholder="YYYY-MM-DD"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
