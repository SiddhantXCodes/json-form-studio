import GenericTable from "./GenericTable";

export default function PhysicalMedicalEditor({ value, path, onChange }) {
if (!value) return <div className="text-red-500">Invalid data</div>;


  const update = (subPath, val) => {
    onChange(`${path}.${subPath}`, val);
  };

  /* ================= TRANSFORMS ================= */

  const petMarksRows = value.physical_marks
    ? [
        { gender: "Male", ...value.physical_marks.pet_marks.male },
        { gender: "Female", ...value.physical_marks.pet_marks.female }
      ]
    : [];
const syncPetMarks = (rows) => {
  onChange(
    `${path}.physical_marks.pet_marks`,
    {
      male: rows.find(r => r.gender === "male"),
      female: rows.find(r => r.gender === "female")
    }
  );
};


  const eyesightRows = value.medical_standards
    ? Object.entries(value.medical_standards.eyesight).map(
        ([k, v]) => ({
          key: k,
          value: v
        })
      )
    : [];

  const updateEyesight = (p, v) => {
    const [, index] = p.match(/\[(\d+)\]/);
    const key = eyesightRows[index].key;
    onChange(
      `${path}.medical_standards.eyesight.${key}`,
      v
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">

      {/* ================= PET MARKS ================= */}
      {value.physical_marks && (
        <div className="border rounded p-3">
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={value.physical_marks.enabled}
              onChange={e =>
                update("physical_marks.enabled", e.target.checked)
              }
            />
            Physical Marks (PET)
          </label>

          {value.physical_marks.enabled && (
        <GenericTable
  title="Physical Marks (PET)"
  columns={[
    { key: "gender", label: "Gender" },
    { key: "criteria", label: "Criteria" },
    { key: "distance", label: "Distance" },
    { key: "time", label: "Time" },
    { key: "marks", label: "Marks", type: "number" }
  ]}
  rows={petMarksRows}
  lockFields={["gender"]}
  path="__local_pet_marks__"
  onChange={(p, v) => {
    const match = p.match(/\[(\d+)\]\.(.+)/);
    const idx = Number(match[1]);
    const key = match[2];

    const next = [...petMarksRows];
    next[idx] = { ...next[idx], [key]: v };

    syncPetMarks(next);
  }}
/>

          )}
        </div>
      )}

      {/* ================= MEDICAL STANDARDS ================= */}
      {value.medical_standards && (
        <div className="border rounded p-3">
          <h3 className="font-semibold mb-2">Medical Standards</h3>

          <GenericTable
            title="Eyesight"
            columns={[
              { key: "key", label: "Parameter" },
              { key: "value", label: "Value" }
            ]}
            rows={eyesightRows}
            lockFields={["key"]}
            path={`${path}.medical_standards.eyesight`}
            onChange={updateEyesight}
          />

          <div className="mt-3">
            <label className="block font-medium mb-1">
              General Conditions
            </label>
            <textarea
              className="w-full border rounded px-2 py-1"
              rows={3}
              value={value.medical_standards.general.join(", ")}
              onChange={e =>
                onChange(
                  `${path}.medical_standards.general`,
                  e.target.value
                    .split(",")
                    .map(v => v.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>
        </div>
      )}

      {/* ================= PST ================= */}
      {value.pst && (
        <div className="border rounded p-3">
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={value.pst.enabled}
              onChange={e =>
                update("pst.enabled", e.target.checked)
              }
            />
            Physical Standard Test (PST)
          </label>

          {value.pst.enabled && (
            <>
              <GenericTable
                title="PST – Male"
                columns={[
                  { key: "category", label: "Category" },
                  { key: "height", label: "Height" },
                  { key: "chest", label: "Chest" }
                ]}
                rows={value.pst.male}
                lockFields={["category"]}
                path={`${path}.pst.male`}
                onChange={onChange}
              />

              <GenericTable
                title="PST – Female"
                columns={[
                  { key: "category", label: "Category" },
                  { key: "height", label: "Height" },
                  { key: "weight", label: "Weight" }
                ]}
                rows={value.pst.female}
                lockFields={["category"]}
                path={`${path}.pst.female`}
                onChange={onChange}
              />
            </>
          )}
        </div>
      )}

      {/* ================= PET (NO MARKS) ================= */}
      {value.pet && (
        <div className="border rounded p-3">
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={value.pet.enabled}
              onChange={e =>
                update("pet.enabled", e.target.checked)
              }
            />
            Physical Efficiency Test (PET)
          </label>

          {value.pet.enabled && (
            <GenericTable
              title=""
              columns={[
                { key: "category", label: "Category" },
                { key: "distance", label: "Distance" },
                { key: "time", label: "Time" }
              ]}
              rows={value.pet.rows}
              lockFields={["category"]}
              path={`${path}.pet.rows`}
              onChange={onChange}
            />
          )}
        </div>
      )}

    </div>
  );
}
