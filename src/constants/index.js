export const COMMON_CONTEXT_STORAGE = "COMMON_STORAGE_PERSIST";
export const NAVBAR_HEIGHT_DESKTOP = 80;
export const NAVBAR_HEIGHT_MOBILE = 80;

export const SIDE_NAV_BAR_DRAWER_WIDTH = 280;

export const CONTENT_SORT_ITEMS = [
  "newest",
  "oldest",
  "likes",
  "viewed",
  "highest_reading_time",
  "lowest_reading_time",
];

export const CONTENT_SORT_VALUES = {
  newest: { category: "timestamp", value: "-1" },
  oldest: { category: "timestamp", value: "1" },
  likes: { category: "likes", value: "-1" },
  viewed: { category: "views", value: "-1" },
  highest_reading_time: { category: "duration", value: "-1" },
  lowest_reading_time: { category: "duration", value: "1" },
};

export const TRUST_LEVELS = {
  1: "user",
  2: "internal",
  3: "admin",
};

export const CONTENT_DIFFICULTY_LEVELS = ["beginner", "intermediate", "expert"];

export const ASSESSMENT_QUESTION_TYPES = [
  "multiple_choice",
  "checkbox",
  "text",
  "file",
];
