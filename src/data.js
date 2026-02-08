// دالة لتحويل العنوان إلى slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // حذف الرموز الخاصة
    .replace(/\s+/g, '-')      // تحويل المسافات إلى -
    .replace(/--+/g, '-')      // حذف -- المتكررة
    .trim();
}

const data = [
  {
    title: "Converting Your React Vite App into PWA",
    img: "Converting Your React Vite App into PWA.webp",
    videoUrl: "https://www.youtube.com/watch?v=1wDiSTC2MTA",
    description: "Learn how to convert your React Vite app into a Progressive Web App (PWA) step by step.",
    content: `
      <p>في هذا الدرس سنتعلم كيفية تحويل تطبيق React Vite إلى PWA...</p>
      <h3>الخطوات الأساسية:</h3>
      <ol>
        <li>تثبيت vite-plugin-pwa</li>
        <li>إعداد ملف manifest.json</li>
        <li>إنشاء Service Worker</li>
      </ol>
    `
  },
  {
    title: "orange fixbox change password & Wi-Fi name",
    img: "orange fixbox change password & Wi-Fi name.webp",
    videoUrl: "https://www.youtube.com/watch?v=sbYks0w3WyY",
    description: "شرح كيفية تغيير كلمة السر واسم الواي فاي لراوتر Orange Fixbox.",
    content: `
      <p>في هذا الفيديو سنشرح خطوات تغيير إعدادات راوتر Orange...</p>
    `
  },
  {
    title: "create ovhcloud professional email",
    img: "create ovhcloud professional email.webp",
    videoUrl: "https://www.youtube.com/watch?v=-t78_OWHN-Y",
    description: "كيفية إنشاء بريد إلكتروني احترافي على OVHcloud.",
    content: `
      <p>سنتعلم كيفية إنشاء بريد احترافي خاص بنطاقك...</p>
    `
  },
  {
    title: "connection lost. Saving has been disabled until you're reconnected",
    img: "connection lost. Saving has been disabled until you're reconnected.webp",
    videoUrl: "https://www.youtube.com/watch?v=1wDiSTC2MTA",
    description: "حل مشكلة فقدان الاتصال في WordPress.",
    content: `
      <p>هذه المشكلة شائعة في WordPress عندما يتم قطع الاتصال...</p>
    `
  },
  {
    title: "Les fonction logiques : Algèbre de Boole",
    img: "Les fonction logiques .webp",
    videoUrl: "https://www.youtube.com/watch?v=1wDiSTC2MTA",
    description: "شرح الدوال المنطقية وجبر بول.",
    content: `
      <p>سنتعلم أساسيات الدوال المنطقية وجبر بول...</p>
    `
  },
];

// إضافة slug لكل عنصر
const dataWithSlugs = data.map(item => ({
  ...item,
  slug: createSlug(item.title)
}));

export default dataWithSlugs;