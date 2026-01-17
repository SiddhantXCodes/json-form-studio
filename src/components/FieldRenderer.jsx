import { useState } from "react";
import { enumSchema } from "../schema/enumSchema";

export default function FieldRenderer({
  label,
  value,
  path,
  onChange
}) {
  const [open, setOpen] = useState(true);
  const enumDef = enumSchema[path];

  /* BOOLEAN */
  if (enumDef?.type === "boolean") {
    return (
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={e => onChange(path, e.target.checked)}
        />
        {label}
      </label>
    );
  }

  /* SELECT */
  if (enumDef?.type === "select") {
    return (
      <div>
        <label>{label}</label>
        <select
          value={value || ""}
          onChange={e => onChange(path, e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select</option>
          {enumDef.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  /* MULTI-SELECT */
  if (enumDef?.type === "multiselect") {
    return (
      <div>
        <label>{label}</label>
        <select
          multiple
          value={Array.isArray(value) ? value : []}
          onChange={e =>
            onChange(
              path,
              Array.from(e.target.selectedOptions).map(o => o.value)
            )
          }
          className="w-full border rounded px-2 py-1 h-32"
        >
          {enumDef.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  /* STRING */
  if (typeof value === "string") {
    return (
      <div>
        <label>{label}</label>
        <input
          value={value}
          onChange={e => onChange(path, e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
    );
  }

  /* NUMBER */
  if (typeof value === "number") {
    return (
      <div>
        <label>{label}</label>
        <input
          type="number"
          value={value}
          onChange={e => onChange(path, Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        />
      </div>
    );
  }

  /* ARRAY */
  if (Array.isArray(value)) {
    return (
      <div className="border rounded">
        <div
          onClick={() => setOpen(!open)}
          className="bg-gray-200 px-3 py-2 cursor-pointer"
        >
          {label} ({value.length})
        </div>

        {open && (
          <div className="p-3 space-y-3">
            {value.map((item, i) => (
              <FieldRenderer
                key={i}
                label={`${label}[${i}]`}
                value={item}
                path={`${path}[${i}]`}
                onChange={onChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* OBJECT */
  if (typeof value === "object" && value !== null) {
    return (
      <div className="border rounded">
        <div
          onClick={() => setOpen(!open)}
          className="bg-gray-100 px-3 py-2 cursor-pointer font-semibold"
        >
          {label}
        </div>

        {open && (
          <div className="p-3 space-y-3">
            {Object.entries(value).map(([k, v]) => (
              <FieldRenderer
                key={k}
                label={k}
                value={v}
                path={`${path}.${k}`}
                onChange={onChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
