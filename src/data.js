// دالة لتحويل العنوان إلى slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // حذف الرموز الخاصة
    .replace(/\s+/g, "-") // تحويل المسافات إلى -
    .replace(/--+/g, "-") // حذف -- المتكررة
    .trim();
}

const data = [
  {
    title: "Converting Your React Vite App into PWA",
    img: "Converting Your React Vite App into PWA.webp",
    videoUrl: "https://www.youtube.com/watch?v=HExHPdX4Rb0",
    description:
      "Learn how to convert your React Vite app into a Progressive Web App (PWA) step by step.",
  },
  {
    title: "orange fixbox change password & Wi-Fi name",
    img: "orange fixbox change password & Wi-Fi name.webp",
    videoUrl: "https://www.youtube.com/watch?v=Vh_S2Cwps7U",
    description:
      "Explication de la procédure pour modifier le mot de passe et le nom du réseau Wi-Fi d'un routeur Orange Fixbox.",
  },
  {
    title: "create ovhcloud professional email",
    img: "create ovhcloud professional email.webp",
    videoUrl: "https://www.youtube.com/watch?v=GY11bxP0coA",
    description: "How to create a professional email address on OVHcloud.",
  },
  {
    title: "connection lost. Saving has been disabled until you're reconnected",
    img: "connection.webp",
    videoUrl: "https://www.youtube.com/watch?v=ukiiC6y-D8Q",
    description: "Solving the connection loss problem in WordPress.",
    content: `
      <p>The solution </p>
      <ul>
      <li>1) THe plugin/theme you installed : try to disable them one to one and see if the error remains
</li>
<li>2) Make PHP version : 8 or more  & PHP memory limit : 256M or more
</li>
<li>3) install plugin “Health Check & Troubleshooting added”
</li>
<li>else; issue from your hosting provider : you can still go to their forum and see if it’s their fault that you have this issue</li>
      </ul>
    `,
  },
  {
    title: "Les fonction logiques : Algèbre de Boole",
    img: "Les-fonction-logiques.webp",
    videoUrl: "https://www.youtube.com/watch?v=ar2vuZ-TrCk",
    description:
      "Les fonction logiques Algèbre de Boole  équation , symbole , tableau de vérité ",
  },
];

// إضافة slug لكل عنصر
const dataWithSlugs = data.map((item) => ({
  ...item,
  slug: createSlug(item.title),
}));

export default dataWithSlugs;
