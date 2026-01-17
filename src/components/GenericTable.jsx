export default function GenericTable({
  title,
  columns,
  rows,
  path,
  onChange,
  rowKey = "index",
  lockFields = []
}) {
  return (
    <div className="mb-4">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}

      <div className="border rounded overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row[rowKey] ?? index} className="border-t">
                {columns.map(col => (
                  <td key={col.key} className="px-3 py-2">
                    {lockFields.includes(col.key) ? (
                      <span className="text-sm font-medium">
                        {row[col.key]}
                      </span>
                    ) : (
                      <input
                        type={col.type || "text"}
                        value={row[col.key] ?? ""}
                        onChange={(e) =>
                          onChange(
                            `${path}[${index}].${col.key}`,
                            col.type === "number"
                              ? Number(e.target.value)
                              : e.target.value
                          )
                        }
                        className="w-full border rounded px-2 py-1"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
