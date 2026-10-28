export const blogCategories = ["web-development", "business-tools", "tips-and-tutorials"] as const;
export type BlogCategory = (typeof blogCategories)[number];

export const categoryLabels = {
  en: {
    "web-development": "Web development",
    "business-tools": "Business tools",
    "tips-and-tutorials": "Tips and tutorials",
  },
  fr: {
    "web-development": "Développement web",
    "business-tools": "Outils professionnels",
    "tips-and-tutorials": "Conseils et tutoriels",
  },
  ar: {
    "web-development": "تطوير الويب",
    "business-tools": "أدوات الأعمال",
    "tips-and-tutorials": "نصائح ودروس",
  },
} as const;

export const categoryCopy = {
  en: {
    title: "Blog",
    description: "Articles and tutorials by Amine Triki.",
    all: "All articles",
    filter: "Filter articles by category",
    videoSummary: "Video summary",
    published: "Published",
    updated: "Last updated",
    author: "By",
  },
  fr: {
    title: "Blog",
    description: "Articles et tutoriels d’Amine Triki.",
    all: "Tous les articles",
    filter: "Filtrer les articles par catégorie",
    videoSummary: "Résumé vidéo",
    published: "Publié le",
    updated: "Mis à jour le",
    author: "Par",
  },
  ar: {
    title: "المدونة",
    description: "مقالات ودروس من أمين التريكي.",
    all: "كل المقالات",
    filter: "تصفية المقالات حسب التصنيف",
    videoSummary: "ملخص الفيديو",
    published: "تاريخ النشر",
    updated: "آخر تحديث",
    author: "بقلم",
  },
} as const;

export const blogSortOrder: Record<BlogCategory, number> = {
  "web-development": 0,
  "business-tools": 1,
  "tips-and-tutorials": 2,
};
