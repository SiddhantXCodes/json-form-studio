/**
 * Job Editor Schema (Phase 1 – Internal)
 * Controls UI order, grouping, and labels
 * JSON structure itself is NOT changed
 */

export const jobSchema = [
  /* =========================
     BASIC INFO
  ========================= */
  {
    id: "basic",
    title: "Basic Information",
    description: "Core job details",
    fields: [
      "title",
      "meta.organization",
      "meta.post_name",
      "meta.exam_year",
      "meta.notice_type",
      "meta.advt_no",
      "meta.job_type",
      "meta.job_state",
      "meta.total_posts",
      "meta.vacancy_status",
      "meta.salary",
      "meta.qualification",
      "meta.apply_mode",
      "meta.age_limit",
      "meta.official_website",
      "meta.apply_link",
      "meta.author",
      "meta.last_updated"
    ]
  },

  /* =========================
     VISUAL SUMMARY (CARD DATA)
  ========================= */
  {
    id: "visual",
    title: "Visual Summary",
    description: "Homepage / image summary fields",
    fields: [
      "visual_summary"
    ]
  },

  /* =========================
     IMPORTANT DATES
  ========================= */
  {
    id: "dates",
    title: "Important Dates",
    description: "Application, exam & result timeline",
    fields: [
      "dates"
    ]
  },

  /* =========================
     APPLICATION FEE
  ========================= */
  {
    id: "fee",
    title: "Application Fee",
    description: "Category-wise fee & payment modes",
    fields: [
      "application_fee"
    ]
  },

  /* =========================
     AGE LIMIT
  ========================= */
  {
    id: "age",
    title: "Age Limit",
    description: "Category-wise age criteria",
    fields: [
      "age_limit"
    ]
  },

  /* =========================
     VACANCY DETAILS
  ========================= */
  {
    id: "vacancy",
    title: "Vacancy Details",
    description: "Post, category, gender & state-wise vacancies",
    fields: [
      "vacancy"
    ]
  },

  /* =========================
     ELIGIBILITY
  ========================= */
  {
    id: "eligibility",
    title: "Eligibility",
    description: "Educational qualification & conditions",
    fields: [
      "eligibility"
    ]
  },

  /* =========================
     EXAM PATTERN
  ========================= */
  {
    id: "exam",
    title: "Exam Pattern",
    description: "Mode, duration, marks & subject breakup",
    fields: [
      "exam_pattern",
      "negative_marking"
    ]
  },

  /* =========================
     SYLLABUS
  ========================= */
  {
    id: "syllabus",
    title: "Syllabus",
    description: "Subject-wise syllabus",
    fields: [
      "syllabus"
    ]
  },

  /* =========================
     PHYSICAL / MEDICAL
  ========================= */
  {
    id: "physical",
    title: "Physical & Medical Standards",
    description: "PET, PST & medical requirements",
    fields: [
      "physical_marks",
      "pst",
      "pet",
      "medical_standards"
    ]
  },

  /* =========================
     SELECTION & APPLY
  ========================= */
  {
    id: "selection",
    title: "Selection & Application",
    description: "Selection stages & how to apply",
    fields: [
      "selection_process",
      "how_to_apply"
    ]
  },

  /* =========================
     LINKS & FAQ
  ========================= */
  {
    id: "extras",
    title: "Links & FAQs",
    description: "Official links and common questions",
    fields: [
      "links",
      "faqs"
    ]
  },

  /* =========================
     FILTERS & FLAGS
  ========================= */
  {
    id: "flags",
    title: "Filters & Content Flags",
    description: "App filters, visibility & priority",
    fields: [
      "filters",
      "content_flags"
    ]
  },

  /* =========================
     LIFECYCLE
  ========================= */
  {
    id: "lifecycle",
    title: "Job Lifecycle",
    description: "Notification, application, exam & result stages",
    fields: [
      "lifecycle"
    ]
  },

  /* =========================
     SEO
  ========================= */
  {
    id: "seo",
    title: "SEO",
    description: "Search engine tags",
    fields: [
      "seo"
    ]
  }
];
