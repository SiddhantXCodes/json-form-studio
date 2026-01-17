import { jobSchema } from "../schema/jobSchema";
import FieldRenderer from "./FieldRenderer";
import { setByPath } from "../utils/setByPath";
import { syncVacancy } from "../utils/syncVacancy";

const getByPath = (obj, path) =>
  path.replace(/\[(\d+)\]/g, ".$1").split(".").reduce((a, k) => a?.[k], obj);

export default function JobEditor({ data, onChange }) {

  if (!data) {
    return (
      <div className="p-4 text-gray-500">
        Paste JSON and click <b>Parse / Sync JSON</b>
      </div>
    );
  }

 const handleFieldChange = (path, value) => {
  onChange(prev => {
    const updated = setByPath(prev, path, value);

    if (path.startsWith("vacancy.post_category_matrix")) {
      updated.vacancy = syncVacancy(updated.vacancy);
    }

    return updated;
  });
};


  return (
    <div className="p-4 space-y-6 overflow-auto bg-white">
      {jobSchema.map(section => (
        <Section
          key={section.id}
          title={section.title}
          description={section.description}
        >
          {section.fields.map(path => {
            const value = getByPath(data, path);
            if (typeof value === "undefined") return null;

            return (
              <FieldRenderer
                key={path}
                label={path.split(".").slice(-1)[0]}
                value={value}
                path={path}
                onChange={handleFieldChange}
              />
            );
          })}
        </Section>
      ))}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <div className="border rounded-lg">
      <div className="px-4 py-3 bg-gray-100">
        <h2 className="text-lg font-bold">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  );
}
