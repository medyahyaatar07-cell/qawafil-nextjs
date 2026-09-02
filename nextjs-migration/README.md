# الموقع الرسمي لجمعية قوافل الخير — نسخة Next.js

هذه نسخة مطابقة من حيث المحتوى والسلوك والهوية البصرية والحركية للموقع
الأصلي (المبني بـ Django)، أُعيد بناؤها بالكامل كتطبيق **Next.js 14 (App
Router) + TypeScript**. لا توجد قاعدة بيانات ولا نظام دفع إلكتروني ولا
حسابات مستخدمين — تماماً كالمشروع الأصلي؛ الموقع تعريفي بحت.

## لماذا Next.js بدل Django هنا تحديداً

المشروع الأصلي كان أصلاً موقعاً "بلا قاعدة بيانات فعلية" (المحتوى كله في
ملف بايثون واحد `pages/content.py`)، وكل صفحاته قوالب HTML تُعرض من
الخادم دون أي تفاعل خلفي حقيقي (لا نماذج تسجيل، لا معالجة دفع، لا API).
هذا النمط بالتحديد هو ما يناسب Next.js بامتياز: يمكن توليد كل صفحة
**ثابتة بالكامل وقت البناء** (Static Site Generation)، فتُخدَّم من شبكة
توزيع محتوى (CDN) دون الحاجة لخادم Python يعمل باستمرار، مع تحسينات
تلقائية للصور والخطوط لم تكن متاحة في القوالب اليدوية الأصلية.

## أهم التغييرات المعمارية

- **التوجيه (Routing):** بنية `/ar/...` و`/fr/...` محفوظة تماماً عبر
  مقطع ديناميكي واحد `src/app/[lang]/`. `middleware.ts` يحل محل
  `LocaleMiddleware` في Django: أي رابط بلا بادئة لغة يُعاد توجيهه تلقائياً
  حسب ترويسة `Accept-Language`، والعربية هي الافتراضية دائماً (مطابقة
  لـ`LANGUAGE_CODE = "ar"` في `settings.py`).
- **المحتوى:** `pages/content.py` (546 سطراً) نُقل حرفياً إلى
  `src/lib/content.ts` مع types صارمة بـTypeScript، بلا أي إضافة أو حذف
  لأي جملة. `ASSOCIATION` من `settings.py` أصبح `src/lib/association.ts`.
- **رأس الموقع/تذييله والقائمة المنسدلة والزر العائم للواتساب:** مكونات
  React مستقلة تحت `src/components/`، بدل تكرارها داخل كل قالب.
- **الحركة (Motion):** كل حركة كانت في `static/js/main.js` (139 سطراً)
  أُعيد بناؤها كمكونات React منفصلة (`ScrollRevealController`,
  `PageVeil`, `LogoIntro`)، مع فارق واحد مقصود: التنقل بين الصفحات في
  Django كان تحميلاً كاملاً للصفحة، بينما Next.js يتنقّل من جهة المتصفح
  (client-side) بدون إعادة تحميل — فستارة الانتقال (`PageVeil`) أُعيد
  تصميم منطقها لتتوافق مع هذا (تفصيل موثّق بتعليق كامل داخل
  `src/components/PageVeil.tsx`) بدل فرض إعادة تحميل كاملة تُلغي أهم ميزة
  في Next.js.
- **الصور والخطوط:** `next/image` يستبدل وسم `<picture>` اليدوي
  (webp + jpg احتياطي)، ويقوم تلقائياً بالتحسين والتحويل للتنسيقات
  الحديثة. `next/font/google` يستضيف خطي Cairo وInter محلياً ضمن البناء
  نفسه بدل تحميلهما من خوادم Google في كل زيارة.
- **الأمان (Security Headers):** كل ترويسة كانت في
  `pages/middleware.py` و`settings.py` (X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS)
  محفوظة بنفس القيم في `next.config.mjs`. أما Content-Security-Policy
  فانتقلت إلى `middleware.ts` مع nonce عشوائي لكل طلب (بدل قيمة ثابتة)،
  لأن Next.js يحتاج بضعة سكربتات inline صغيرة لتشغيل React، والنمط
  الموثّق رسمياً من Next.js لهذه الحالة هو nonce + `strict-dynamic` بدل
  إضعاف السياسة بـ`unsafe-inline` على script-src.
- **الميتاداتا وSEO:** `generateMetadata()` في كل صفحة يحل محل تمرير
  `meta_title`/`meta_description` يدوياً من كل view في Django، مع إضافة
  علامات hreflang وJSON-LD (بيانات NGO منظَّمة) في `layout.tsx`.

## البنية

```
src/
  app/
    [lang]/
      layout.tsx        ← Layout الجذري (بديل base.html) + generateMetadata
      not-found.tsx      ← صفحة 404
      page.tsx           ← الرئيسية
      about/page.tsx
      work/page.tsx       ← قائمة مجالات العمل
      work/[slug]/page.tsx ← تفاصيل مجال عمل واحد
      donate/page.tsx
      contact/page.tsx
    globals.css          ← منقول شبه حرفي من static/css/style.css
  components/
    Header.tsx, Footer.tsx, WhatsappFab.tsx,
    PageVeil.tsx, ScrollRevealController.tsx, LogoIntro.tsx
  lib/
    content.ts           ← كل نصوص الموقع (عربي/فرنسي)
    association.ts        ← بيانات الجمعية (هاتف، واتساب، بريد...)
    i18n.ts               ← أدوات اللغة (ar/fr، الاتجاه RTL/LTR)
    css-vars.ts           ← نوع TypeScript مساعد لمتغيرات CSS المخصّصة
  middleware.ts           ← إعادة توجيه اللغة + CSP بnonce
public/
  images/, video/         ← نفس الملفات من static/ بلا أي تعديل
```

## التشغيل محلياً

```bash
npm install
npm run dev
```
ثم افتح المتصفح على `http://localhost:3000` (سيُعاد توجيهك تلقائياً إلى
`/ar` أو `/fr` حسب لغة متصفحك).

### متغيرات البيئة

انسخ `.env.example` إلى `.env.local` واضبط:
```
NEXT_PUBLIC_SITE_URL=https://your-real-domain.mr
```
يُستخدم هذا فقط لبناء الروابط المطلقة (canonical، hreflang، JSON-LD)
ووسوم OpenGraph — تماماً كما كان Django يستخدم `request.get_host()`، لكن
Next.js يحتاجه صراحةً وقت البناء بدل استنتاجه من الطلب.

## البناء للإنتاج

```bash
npm run build
npm start
```
`npm run build` يولّد كل الصفحات (بما فيها صفحات مجالات العمل السبعة عبر
`generateStaticParams`) كملفات ثابتة مسبقاً. يمكن نشر الناتج على أي
مزوّد يدعم Next.js (Vercel، أو أي خادم Node.js عادي عبر `npm start`).

## ⚠️ تنبيه مهم بخصوص التحقق من البناء

تم بناء هذا المشروع بالكامل يدوياً وبعناية، مع تدقيق كل ملف حرفاً بحرف
مقابل المشروع الأصلي (أسماء الحقول، الروابط، النصوص، القيم الأمنية). كل
ملف تم فحصه بأداة تحليل صياغة (syntax parser) للتأكد من خلوّه من أخطاء
الكتابة البرمجية.

**لكن** بيئة العمل التي بُني فيها هذا المشروع لا تملك اتصالاً بالإنترنت
لتثبيت الحزم (سجل npm محجوب فيها بالكامل)، وبالتالي **لم يتسنَّ تشغيل
`npm install` ولا `npm run build` فعلياً والتأكد من نجاحهما بشكل قاطع في
هذه البيئة**. الخطوة الأولى والضرورية بعد استلام المشروع هي تشغيل:
```bash
npm install
npm run build
```
وإصلاح أي خطأ TypeScript أو ESLint طفيف قد يظهر (إن وُجد) — وهذا متوقع
وطبيعي في أي مشروع بهذا الحجم لم يُبنَ فعلياً بعد، وليس علامة على خلل
جوهري في التصميم أو المحتوى.

## ما لم يتغيّر عمداً

- كل نص عربي وفرنسي في الموقع منقول حرفياً، بدون أي إضافة لأرقام مستفيدين
  أو قصص نجاح أو شركاء لم تُقرّهم الجمعية.
- شعارات Bankily وMasrivi وSedad في صفحة التبرع تبقى للعرض فقط وليست
  أزرار دفع، تماماً كالأصل.
- لا قاعدة بيانات ولا نظام مستخدمين — الموقع بأكمله معلومات ثابتة.
