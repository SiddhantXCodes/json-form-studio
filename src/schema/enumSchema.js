/**
 * ENUM DEFINITIONS (Phase 1 – Internal)
 * Controls select / multiselect / toggle fields
 * Keys MUST match JSON paths exactly
 */

export const enumSchema = {

  /* =========================
     BASIC META
  ========================= */
  "meta.job_type": {
    type: "select",
    options: ["Central", "State", "PSU", "Bank", "Defence"]
  },

  "meta.job_state": {
    type: "multiselect",
    options: [
      "Uttar Pradesh",
      "Delhi",
      "Bihar",
      "Rajasthan",
      "Maharashtra",
      "All India"
    ]
  },

  "meta.apply_mode": {
    type: "select",
    options: ["Online", "Offline"]
  },

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
