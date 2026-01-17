const STAGE_ORDER = [
  "short_notice",
  "notification",
  "application",
  "exam",
  "city_intimation",
  "admit_card",
  "answer_key",
  "challenge_window",
  "result",
  "cutoff",
  "final_result"
];

const STAGE_LABELS = {
  short_notice: "Short Notice",
  notification: "Notification",
  application: "Application",
  exam: "Exam",
  city_intimation: "City Intimation",
  admit_card: "Admit Card",
  answer_key: "Answer Key",
  challenge_window: "Challenge Window",
  result: "Result",
  cutoff: "Cutoff",
  final_result: "Final Result"
};

export default function LifecycleEditor({ value, path, onChange }) {
  if (!value) return null;

  const stages = value.stages || {};

  return (
    <div className="border rounded p-4 space-y-4">
      <h3 className="font-semibold text-lg">Lifecycle</h3>

      {/* CURRENT STAGE */}
      <div>
        <label className="block font-medium mb-1">
          Current Stage
        </label>
        <select
          className="border rounded px-2 py-1"
          value={value.current_stage || ""}
          onChange={e =>
            onChange(`${path}.current_stage`, e.target.value)
          }
        >
          <option value="">Select</option>
          {STAGE_ORDER.map(k => (
            <option key={k} value={k}>
              {STAGE_LABELS[k]}
            </option>
          ))}
        </select>
      </div>

      {/* STAGES */}
      {STAGE_ORDER.map(stageKey => {
        const stage = stages[stageKey];
        if (!stage) return null;

        return (
          <div key={stageKey} className="border rounded p-3">
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={stage.enabled}
                onChange={e =>
                  onChange(
                    `${path}.stages.${stageKey}.enabled`,
                    e.target.checked
                  )
                }
              />
              {STAGE_LABELS[stageKey]}
            </label>

            {stage.enabled && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {"date" in stage && (
                  <input
                    type="date"
                    value={stage.date || ""}
                    onChange={e =>
                      onChange(
                        `${path}.stages.${stageKey}.date`,
                        e.target.value || null
                      )
                    }
                    className="border rounded px-2 py-1"
                  />
                )}

                {"start_date" in stage && (
                  <input
                    type="date"
                    value={stage.start_date || ""}
                    onChange={e =>
                      onChange(
                        `${path}.stages.${stageKey}.start_date`,
                        e.target.value || null
                      )
                    }
                    className="border rounded px-2 py-1"
                  />
                )}

                {"end_date" in stage && (
                  <input
                    type="date"
                    value={stage.end_date || ""}
                    onChange={e =>
                      onChange(
                        `${path}.stages.${stageKey}.end_date`,
                        e.target.value || null
                      )
                    }
                    className="border rounded px-2 py-1"
                  />
                )}

                {"url" in stage && (
                  <input
                    type="text"
                    placeholder="URL"
                    value={stage.url || ""}
                    onChange={e =>
                      onChange(
                        `${path}.stages.${stageKey}.url`,
                        e.target.value || null
                      )
                    }
                    className="border rounded px-2 py-1 col-span-2"
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
