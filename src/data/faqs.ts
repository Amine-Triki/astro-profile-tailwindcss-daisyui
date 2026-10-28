import type { Lang } from "../i18n/ui";
import { keyFacts, process } from "./site-facts";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: Record<Lang, FaqItem[]> = {
  en: [
    { question: "How much does a website cost in Tunisia?", answer: "A landing page starts at 500 TND and a business website starts at 900 TND. E-commerce websites start at 2,500 TND and web applications at 5,000 TND; the final quote depends on features, content and deadlines." },
    { question: "How long does it take to build a website?", answer: "A landing page usually takes 3–7 days, while a business website usually takes 2–3 weeks. E-commerce websites and applications receive a delivery estimate in the written quote because their scope varies." },
    { question: "Are domain and hosting included in the price?", answer: "No. The domain, hosting and any app-store fees are paid by you in your own accounts. I can recommend an option, deploy the project and configure everything for you." },
    { question: "Who owns the code and accounts?", answer: `${keyFacts.clientAccounts} ${keyFacts.codeOwnership} I hand over and deploy the project as part of delivery.` },
    { question: "How many revisions are included?", answer: `${process.revisionRounds} rounds of revisions are included. Anything added after the quote is agreed is priced separately so the scope and price stay clear.` },
    { question: "Do you build iOS apps?", answer: "I currently build Android mobile applications with Flutter. iOS is priced separately, and a PWA can be a lower-cost alternative when it fits the project." },
    { question: "Is maintenance after delivery included?", answer: `No, ${keyFacts.maintenance.toLowerCase()} The quote can define the support or maintenance work you need after launch.` },
  ],
  fr: [
    { question: "Combien coûte un site web en Tunisie ?", answer: "Une landing page commence à 500 TND et un site vitrine à 900 TND. Les sites e-commerce commencent à 2 500 TND et les applications web à 5 000 TND ; le devis final dépend des fonctionnalités, du contenu et des délais." },
    { question: "Combien de temps faut-il pour créer un site web ?", answer: "Une landing page prend généralement 3 à 7 jours, tandis qu’un site vitrine prend généralement 2 à 3 semaines. Les sites e-commerce et les applications ont un délai indiqué dans le devis écrit, car leur périmètre varie." },
    { question: "Le domaine et l’hébergement sont-ils inclus dans le prix ?", answer: "Non. Le nom de domaine, l’hébergement et les éventuels frais des stores sont payés par vous depuis vos propres comptes. Je peux vous conseiller, déployer le projet et tout configurer." },
    { question: "À qui appartiennent le code et les comptes ?", answer: "Votre domaine, votre hébergement et vos comptes de store restent à votre nom, et le code vous appartient après le paiement final. Je remets et déploie le projet lors de la livraison." },
    { question: "Combien de révisions sont incluses ?", answer: "Deux séries de révisions sont incluses. Toute demande ajoutée après validation du devis est facturée séparément afin de garder un périmètre et un prix clairs." },
    { question: "Créez-vous des applications iOS ?", answer: "Je crée actuellement des applications mobiles Android avec Flutter. iOS est tarifé séparément, et une PWA peut être une alternative moins coûteuse lorsque le projet s’y prête." },
    { question: "La maintenance est-elle incluse après la livraison ?", answer: "Non, la maintenance après livraison est facturée séparément. Le devis peut préciser le support ou la maintenance dont vous avez besoin après le lancement." },
  ],
  ar: [
    { question: "كم تكلّف صناعة موقع إلكتروني في تونس؟", answer: "تبدأ صفحة الهبوط من 500 دينار تونسي، ويبدأ الموقع التعريفي للأعمال من 900 دينار. تبدأ المتاجر الإلكترونية من 2500 دينار، وتطبيقات الويب من 5000 دينار؛ ويتحدد السعر النهائي حسب الخصائص والمحتوى والآجال." },
    { question: "كم من الوقت يستغرق إنشاء موقع إلكتروني؟", answer: "تستغرق صفحة الهبوط عادةً من 3 إلى 7 أيام، بينما يستغرق الموقع التعريفي عادةً من أسبوعين إلى 3 أسابيع. أما المتجر الإلكتروني والتطبيقات فيُحدَّد أجلهما في العرض الكتابي لأن نطاق العمل يختلف من مشروع إلى آخر." },
    { question: "هل اسم النطاق والاستضافة مشمولان في السعر؟", answer: "لا. يدفع العميل ثمن اسم النطاق والاستضافة وأي رسوم لمتاجر التطبيقات من حساباته الخاصة. أستطيع اقتراح الخيار المناسب ونشر المشروع وإعداد كل شيء." },
    { question: "من يملك الكود والحسابات؟", answer: "تبقى حسابات اسم النطاق والاستضافة ومتاجر التطبيقات باسمك، ويصبح الكود ملكك بعد الدفع النهائي. أُسلّم المشروع وأنشره ضمن مرحلة التسليم." },
    { question: "كم عدد جولات التعديلات المشمولة؟", answer: "يشمل السعر جولتين من التعديلات. أي طلب يُضاف بعد الاتفاق على العرض يُسعَّر بشكل منفصل حتى يبقى نطاق العمل والسعر واضحين." },
    { question: "هل تبني تطبيقات iOS؟", answer: "أبني حالياً تطبيقات Android باستعمال Flutter. تسعير iOS يكون منفصلاً، وقد تكون PWA بديلاً أقل تكلفة عندما يناسب المشروع." },
    { question: "هل تشمل الخدمة الصيانة بعد التسليم؟", answer: "لا، تُسعَّر الصيانة بعد التسليم بشكل منفصل. يمكن أن يحدد العرض نوع الدعم أو الصيانة المطلوبة بعد إطلاق المشروع." },
  ],
};
