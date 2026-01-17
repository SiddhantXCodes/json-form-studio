export default function TableVacancyMatrix({ value, path, onChange }) {
  const categories =
    value[0]?.categories?.map(c => c.category) || [];

  const updateCell = (postIndex, category, newValue) => {
    const updated = value.map((row, i) => {
      if (i !== postIndex) return row;

      return {
        ...row,
        categories: row.categories.map(c =>
          c.category === category
            ? { ...c, count: Number(newValue) || 0 }
            : c
        )
      };
    });

    onChange(path, updated);
  };

  const postTotal = row =>
    row.categories.reduce((s, c) => s + (c.count || 0), 0);

  const columnTotal = category =>
    value.reduce((s, r) => {
      const c = r.categories.find(x => x.category === category);
      return s + (c?.count || 0);
    }, 0);

  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Post</th>
            {categories.map(cat => (
              <th key={cat} className="border px-3 py-2 text-right">
                {cat}
              </th>
            ))}
            <th className="border px-3 py-2 text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {value.map((row, i) => (
            <tr key={row.post}>
              <td className="border px-3 py-2 font-medium">
                {row.post}
              </td>

              {categories.map(cat => {
                const cell = row.categories.find(c => c.category === cat);
                return (
                  <td key={cat} className="border px-3 py-2">
                    <input
                      type="number"
                      value={cell?.count ?? 0}
                      onChange={e =>
                        updateCell(i, cat, e.target.value)
                      }
                      className="w-full border rounded px-2 py-1 text-right"
                    />
                  </td>
                );
              })}

              <td className="border px-3 py-2 text-right font-semibold">
                {postTotal(row)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="bg-gray-50 font-semibold">
          <tr>
            <td className="border px-3 py-2 text-right">Total</td>
            {categories.map(cat => (
              <td key={cat} className="border px-3 py-2 text-right">
                {columnTotal(cat)}
              </td>
            ))}
            <td className="border px-3 py-2 text-right">
              {categories.reduce((s, c) => s + columnTotal(c), 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
