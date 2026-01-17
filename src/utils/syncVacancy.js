export function syncVacancy(vacancy) {
  const matrix = vacancy.post_category_matrix || [];

  /* -------- category_wise -------- */
  const categoryMap = {};

  matrix.forEach(row => {
    row.categories.forEach(c => {
      categoryMap[c.category] =
        (categoryMap[c.category] || 0) + (c.count || 0);
    });
  });

  if (Array.isArray(vacancy.category_wise)) {
    vacancy.category_wise = vacancy.category_wise.map(c => ({
      ...c,
      count: categoryMap[c.category] ?? c.count
    }));
  }

  /* -------- post_wise -------- */
  if (Array.isArray(vacancy.post_wise)) {
    vacancy.post_wise = vacancy.post_wise.map(p => {
      const row = matrix.find(r => r.post === p.post);
      const total = row
        ? row.categories.reduce((s, c) => s + (c.count || 0), 0)
        : p.count;
      return { ...p, count: total };
    });
  }

  /* -------- total -------- */
  vacancy.total = Object.values(categoryMap).reduce(
    (s, n) => s + n,
    0
  );

  return vacancy;
}
