export default function TableCategoryWise({ value, path, onChange }) {

  const handleChange = (index, key, newValue) => {
    const updated = value.map((row, i) =>
      i === index
        ? { ...row, [key]: key === "count" ? Number(newValue) : newValue }
        : row
    );
    onChange(path, updated);
  };

  const total = value.reduce(
    (sum, row) => sum + (Number(row.count) || 0),
    0
  );

  return (
    <div className="border rounded overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Category</th>
            <th className="border px-3 py-2 text-right">Vacancies</th>
          </tr>
        </thead>

        <tbody>
          {value.map((row, i) => (
            <tr key={i}>
              <td className="border px-3 py-2">
                <input
                  value={row.category || ""}
                  onChange={e =>
                    handleChange(i, "category", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </td>

              <td className="border px-3 py-2 text-right">
                <input
                  type="number"
                  value={row.count ?? ""}
                  onChange={e =>
                    handleChange(i, "count", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 text-right"
                />
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="bg-gray-50 font-semibold">
          <tr>
            <td className="border px-3 py-2 text-right">
              Total
            </td>
            <td className="border px-3 py-2 text-right">
              {total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
