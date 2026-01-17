import GenericTable from "./GenericTable";

export default function NestedTableSection({
  title,
  rows,
  parentKey,
  nestedKey,
  nestedColumns,
  path,
  onChange
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{title}</h3>

      {rows.map((row, index) => (
        <div key={index} className="border rounded p-3">
          <div className="font-medium mb-2">
            {row[parentKey]}
          </div>

          <GenericTable
            columns={nestedColumns}
            rows={row[nestedKey]}
            path={`${path}[${index}].${nestedKey}`}
            lockFields={["category"]}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
}
