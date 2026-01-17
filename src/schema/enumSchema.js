/**
 * ENUM DEFINITIONS (Phase 1 – Internal)
 * Controls select / multiselect / toggle fields
 * Keys MUST match JSON paths exactly
 */

export const enumSchema = {

  /* =========================
     BASIC META
  ========================= */

   "meta.notice_type": {
    type: "select",
    options: [
     "Short Notice",
  "Detailed Notice",
  "Update",
  "Corrigendum",
  "Result",
  "Admit Card",
  "Answer Key",
  "Cut Off",
  "Final Result"
    ]
  },
  "meta.job_type": {
    type: "select",
    options: ["Central", "State", "PSU", "Bank", "Defence"]
  },

"meta.job_state": {
  type: "select",
  options: [
    "All India",

    // Popular / High-traffic states
    "Uttar Pradesh",
    "Delhi",
    "Bihar",
    "Maharashtra",
    "Rajasthan",
    "West Bengal",
    "Madhya Pradesh",
    "Gujarat",
    "Karnataka",
    "Tamil Nadu",

    // Other Indian States & UTs (Alphabetical)
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Goa",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Sikkim",
    "Telangana",
    "Tripura",
    "Uttarakhand"
  ]
}
,
"meta.vacancy_status": {
  type: "select",
  required: true,
  options: [
    "Exact",
    "Tentative",
    "Expected",
    "Not Disclosed"
  ]
}
,
"meta.qualification": {
  type: "multiselect",
  required: true,
  options: [
    "8th Pass",
    "10th Pass",
    "12th Pass",
    "Diploma",
    "ITI",
    "Graduate",
    "Post Graduate",
    "B.Tech",
    "B.E",
    "B.Sc",
    "B.Com",
    "B.A",
    "LLB",
    "MBBS",
    "BAMS",
    "BHMS",
    "BDS",
    "B.Ed",
    "M.Ed",
    "MCA",
    "MBA",
    "CA",
    "CS",
    "ICWA",
    "PhD",
    "Any Degree",
    "Any Graduate",
    "Engineering",
    "Medical",
    "Paramedical",
    "Nursing",
    "Teaching"
  ]
}
,
 "meta.apply_mode": {
  type: "select",
  required: true,
  options: [
    "Online",
    "Offline",
    "Online / Offline",
    "Email",
    "Walk-in"
  ]
}
,

  /* =========================
     APPLICATION FEE
  ========================= */
  "application_fee.payment_mode": {
    type: "multiselect",
    options: [
      "Debit Card",
      "Credit Card",
      "Internet Banking",
      "IMPS",
      "Mobile Wallet"
    ]
  },

  /* =========================
     FILTERS
  ========================= */
  "filters.gender_eligibility": {
    type: "multiselect",
    options: ["Male", "Female", "Transgender"]
  },

  "filters.application_mode": {
    type: "multiselect",
    options: ["Online", "Offline"]
  },

  /* =========================
     CONTENT FLAGS (BOOLEAN)
  ========================= */
  "content_flags.is_new": { type: "boolean" },
  "content_flags.is_updated": { type: "boolean" },
  "content_flags.is_trending": { type: "boolean" },
  "content_flags.show_on_homepage": { type: "boolean" },
  "content_flags.show_in_latest_jobs": { type: "boolean" },

  /* =========================
     LIFECYCLE
  ========================= */
  "lifecycle.current_stage": {
    type: "select",
    options: [
      "notification",
      "application_open",
      "application_closed",
      "exam_scheduled",
      "result_declared"
    ]
  }
};
