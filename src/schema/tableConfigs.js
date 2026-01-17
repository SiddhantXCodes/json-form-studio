export const TABLE_CONFIGS = {
  visual_summary: {
    title: "Visual Summary",
    path: "visual_summary",
    columns: [
      { key: "label", label: "Label" },
      { key: "value", label: "Value" }
    ],
    lockFields: ["label"]
  },

  age_limit_rows: {
    title: "Age Limit",
    path: "age_limit.rows",
    columns: [
      { key: "category", label: "Category" },
      { key: "min", label: "Min Age", type: "number" },
      { key: "max", label: "Max Age", type: "number" }
    ],
    lockFields: ["category"]
  },

  exam_pattern_rows: {
    title: "Exam Pattern",
    path: "exam_pattern.rows",
    columns: [
      { key: "subject", label: "Subject" },
      { key: "questions", label: "Questions", type: "number" },
      { key: "marks", label: "Marks", type: "number" }
    ],
    lockFields: ["subject"]
  },

  application_fee_rows: {
    title: "Application Fee",
    path: "application_fee.rows",
    columns: [
      { key: "category", label: "Category" },
      { key: "fee", label: "Fee" }
    ],
    lockFields: ["category"]
  }
,
  // -------------------------
  // Vacancy: Category Wise
  // -------------------------
  vacancy_category_wise: {
    title: "Vacancy – Category Wise",
    path: "vacancy.category_wise",
    columns: [
      { key: "category", label: "Category" },
      { key: "count", label: "Count", type: "number" }
    ],
    lockFields: ["category"]
  },

  // -------------------------
  // Vacancy: Post Wise
  // -------------------------
  vacancy_post_wise: {
    title: "Vacancy – Post Wise",
    path: "vacancy.post_wise",
    columns: [
      { key: "post", label: "Post" },
      { key: "count", label: "Count", type: "number" }
    ],
    lockFields: ["post"]
  }
,

  // -------------------------
  // FAQs
  // -------------------------
faqs: {
  title: "FAQs",
  path: "faqs",
  columns: [
    { key: "question", label: "Question" },
    { key: "answer", label: "Answer" }
  ]
}

, 
 // -------------------------
  // Important Links
  // -------------------------


links: {
  title: "Important Links",
  path: "links",
  columns: [
    { key: "label", label: "Label" },
    { key: "url", label: "URL" }
  ],
  lockFields: []
}


 

};





