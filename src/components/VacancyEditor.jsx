import GenericTable from "./GenericTable";

export default function VacancyEditor({ value, path, onChange }) {
  if (!value) return null;

  const tables = value.tables || [];

  const updateTable = (index, subPath, v) => {
    onChange(`${path}.tables[${index}].${subPath}`, v);
  };

  return (
    <div className="border rounded p-4 space-y-4">
      <h3 className="font-semibold text-lg">Vacancy Details</h3>

      {/* TOTAL */}
      <div>
        <label className="block font-medium mb-1">
          Total Vacancies
        </label>
        <input
          type="number"
          className="border rounded px-2 py-1"
          value={value.total || ""}
          onChange={e =>
            onChange(`${path}.total`, Number(e.target.value))
          }
        />
      </div>

      {/* TABLES */}
      {tables.map((table, i) => (
        <div key={table.id || i} className="border rounded p-3">
          <input
            className="w-full border rounded px-2 py-1 mb-2 font-medium"
            value={table.title}
            onChange={e =>
              updateTable(i, "title", e.target.value)
            }
          />

          <GenericTable
            title=""
            columns={table.columns}
            rows={table.rows}
            path={`${path}.tables[${i}].rows`}
            onChange={onChange}
          />

          <button
            className="text-red-600 text-sm mt-2"
            onClick={() => {
              const copy = [...tables];
              copy.splice(i, 1);
              onChange(`${path}.tables`, copy);
            }}
          >
            Delete Table
          </button>
        </div>
      ))}

      {/* ADD TABLE */}
      <button
        className="border rounded px-3 py-1 text-sm"
        onClick={() =>
          onChange(`${path}.tables`, [
            ...tables,
            {
              id: `table_${Date.now()}`,
              title: "New Vacancy Table",
              columns: [
                { key: "col1", label: "Column 1" }
              ],
              rows: []
            }
          ])
        }
      >
        + Add Vacancy Table
      </button>

      {/* NOTES */}
      <div>
        <label className="block font-medium mb-1">Notes</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          rows={3}
          value={(value.notes || []).join("\n")}
          onChange={e =>
            onChange(
              `${path}.notes`,
              e.target.value.split("\n").filter(Boolean)
            )
          }
        />
      </div>
    </div>
  );
}
