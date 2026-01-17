export default function FiltersEditor({ value, path, onChange }) {
  if (!value) return null;

  return (
    <div className="border rounded p-4 space-y-4">
      <h3 className="font-semibold text-lg">Filters</h3>

      {Object.entries(value).map(([key, v]) => {
        // Boolean
        if (typeof v === "boolean") {
          return (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={v}
                onChange={() =>
                  onChange(`${path}.${key}`, !v)
                }
              />
              {key.replaceAll("_", " ")}
            </label>
          );
        }

        // Array → comma editor
        if (Array.isArray(v)) {
          return (
            <div key={key}>
              <label className="block font-medium">
                {key.replaceAll("_", " ")}
              </label>
              <input
                className="w-full border rounded px-2 py-1"
                value={v.join(", ")}
                onChange={(e) =>
                  onChange(
                    `${path}.${key}`,
                    e.target.value
                      .split(",")
                      .map(x => x.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>
          );
        }

        // String
        return (
          <div key={key}>
            <label className="block font-medium">
              {key.replaceAll("_", " ")}
            </label>
            <input
              className="w-full border rounded px-2 py-1"
              value={v}
              onChange={(e) =>
                onChange(`${path}.${key}`, e.target.value)
              }
            />
          </div>
        );
      })}
    </div>
  );
}
