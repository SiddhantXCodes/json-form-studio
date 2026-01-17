import GenericTable from "./GenericTable";

export default function GenderKeyedTable({
  title,
  value,
  path,
  onChange
}) {
  const rows = Object.entries(value).map(([gender, data]) => ({
    gender,
    ...data
  }));

  const update = (index, key, newVal) => {
    const gender = rows[index].gender;
    onChange(`${path}.${gender}.${key}`, newVal);
  };

  return (
    <GenericTable
      title={title}
      columns={[
        { key: "gender", label: "Gender" },
        { key: "criteria", label: "Criteria" },
        { key: "distance", label: "Distance" },
        { key: "time", label: "Time" },
        { key: "marks", label: "Marks", type: "number" }
      ]}
      rows={rows}
      lockFields={["gender"]}
      path={path}
      onChange={(p, v) => {
        const [, index, field] = p.match(/\[(\d+)\]\.(.+)/);
        update(Number(index), field, v);
      }}
    />
  );
}
