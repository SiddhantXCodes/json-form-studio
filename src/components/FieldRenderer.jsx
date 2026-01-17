import { useState } from "react";
import { enumSchema } from "../schema/enumSchema";
import TableDates from "./TableDates";
import GenericTable from "./GenericTable";
import { TABLE_CONFIGS } from "../schema/tableConfigs";
import NestedTableSection from "./NestedTableSection";
import SyllabusEditor from "./SyllabusEditor";
import PhysicalMedicalEditor from "./PhysicalMedicalEditor";
import StringListEditor from "./StringListEditor";
import LifecycleEditor from "./LifecycleEditor";
import ContentFlagsEditor from "./ContentFlagsEditor";
import FiltersEditor from "./FiltersEditor";
import VacancyEditor from "./VacancyEditor";
export default function FieldRenderer({
  label,
  value,
  path,
  onChange
}) {
  const [open, setOpen] = useState(true);
  const enumDef = enumSchema[path];

  /* =========================
     BOOLEAN
  ========================= */
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

  /* =========================
     SELECT
  ========================= */
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

  /* =========================
     MULTI-SELECT (CHECKBOXES)
  ========================= */
  if (enumDef?.type === "multiselect") {
    const selectedValues = Array.isArray(value) ? value : [];

    const toggleValue = (opt) => {
      if (selectedValues.includes(opt)) {
        onChange(
          path,
          selectedValues.filter(v => v !== opt)
        );
      } else {
        onChange(
          path,
          [...selectedValues, opt]
        );
      }
    };

    return (
      <div className="mb-2">
        <label className="block font-medium mb-1">{label}</label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border rounded p-2">
          {enumDef.options.map(opt => (
            <label
              key={opt}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(opt)}
                onChange={() => toggleValue(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  /* =========================
     STRING
  ========================= */
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

  /* =========================
     NUMBER
  ========================= */
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

  /* =========================
     SPECIAL TABLE: DATES
     (Timeline → stays custom)
  ========================= */
  if (path === "dates" && Array.isArray(value)) {
    return (
      <div>
        <h3 className="font-semibold mb-2">Important Dates</h3>
        <TableDates
          value={value}
          path={path}
          onChange={onChange}
        />
      </div>
    );
  }

  /* =========================
     GENERIC TABLE HANDLER
  ========================= */
  const tableConfig = Object.values(TABLE_CONFIGS)
    .find(cfg => cfg.path === path);

  if (tableConfig && Array.isArray(value)) {
    return (
      <GenericTable
        title={tableConfig.title}
        columns={tableConfig.columns}
        rows={value}
        path={path}
        lockFields={tableConfig.lockFields}
        onChange={onChange}
      />
    );
  }
  if (path === "lifecycle") {
  return (
    <LifecycleEditor
      value={value}
      path={path}
      onChange={onChange}
    />
  );
}
if (path === "vacancy") {
  return (
    <VacancyEditor
      value={value}
      path={path}
      onChange={onChange}
    />
  );
}

if (path === "vacancy.post_category_matrix" && Array.isArray(value)) {
  return (
    <NestedTableSection
      title="Vacancy – Post & Category Matrix"
      rows={value}
      parentKey="post"
      nestedKey="categories"
      nestedColumns={[
        { key: "category", label: "Category" },
        { key: "count", label: "Count", type: "number" }
      ]}
      path={path}
      onChange={onChange}
    />
  );
}

if (path === "syllabus" && typeof value === "object") {
  return (
    <SyllabusEditor
      value={value}
      path={path}
      onChange={onChange}
    />
  );
}
if (path === "lifecycle") {
  return (
    <LifecycleEditor
      value={value}
      path={path}
      onChange={onChange}
    />
  );
}
if (path === "content_flags") {
  return <ContentFlagsEditor value={value} path={path} onChange={onChange} />;
}

if (path === "filters") {
  return <FiltersEditor value={value} path={path} onChange={onChange} />;
}



/* =========================
   PHYSICAL & MEDICAL BLOCK
========================= */
if (path === "physical_medical") {
  return (
    <PhysicalMedicalEditor
      value={value}
      path={path}
      onChange={onChange}
    />
  );
}
if (
  path === "selection_process" ||
  path === "how_to_apply" ||
  path === "seo.tags"
) {
  return (
    <StringListEditor
      label={label}
      value={value}
      path={path}
      onChange={onChange}
    />
  );
}


  /* =========================
     ARRAY (FALLBACK)
  ========================= */
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

  /* =========================
     OBJECT (FALLBACK)
  ========================= */
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
