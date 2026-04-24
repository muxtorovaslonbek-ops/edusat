## Reja: EduSAT Academy ilovasini yaratish

### Maqsad
Hozirgi bo‘sh sahifani EduSAT Academy uchun zamonaviy, responsive, premium ko‘rinishdagi ta’lim platformasiga aylantirish. Dizayn uslubi: Modern Glassmorphism + Premium Tech, dark/light theme, yumshoq burchaklar, shaffof panellar, silliq animatsiyalar va minimal interfeys.

### Asosiy dizayn
- Slate asosidagi professional dark theme va yorug‘ rejim.
- Glassmorphism: sidebar, kartalar va modal/panellarda `backdrop-blur`, yarim shaffof fon, nozik border va glow effektlar.
- `rounded-2xl` / `rounded-3xl` burchaklar, premium gradientlar, toza spacing.
- Sarlavhalar qalin (`font-black`), matnlar o‘qilishi oson sans-serif.
- Katta-kichik ekranlarda moslashuvchi layout: desktopda sidebar, mobilda hamburger menyu.
- Yuqori panelda coin hisoblagich, profil rasmi va theme/language boshqaruvlari.

### Ilova strukturasi
Chap menyuda quyidagi bo‘limlar bo‘ladi:
- Profil
- SAT/OTM tayyorgarlik
- Kurslar
- Free Testlar
- Daraja aniqlash
- 3D qo‘llanmalar
- Kutubxona
- Coin do‘koni
- Edu market
- Reyting
- Sevimli
- Bepul darslar
- Premium xizmatlar
- Xizmatlarni baholash
- Ilova haqida

### Tillar va theme
- Uzbek, English, Russian tanlash imkoniyati qo‘shiladi.
- Asosiy UI matnlari tarjima qilinadigan qilib tuziladi.
- Light/Dark toggle ishlaydi.
- Coin qiymati yuqori o‘ng tomonda ko‘rinadi.

### Kirish va ro‘yxatdan o‘tish
- Login/register oynalari tayyorlanadi.
- Auth hozircha frontend demo holatda ishlaydi: foydalanuvchi ismini saqlab, ilovada salomlashish va profilga chiqaradi.
- Keyinchalik haqiqiy xavfsiz auth kerak bo‘lsa, Supabase/Lovable Cloud bilan ulash uchun tayyor struktura qoldiriladi.
- Mehmon holatida: “Xush kelibsiz, Mehmon” ko‘rinadi.

### Bosh sahifa
- Foydalanuvchi ismi bilan salomlashish.
- “Bugungi shior” kartasi: fayldagi 7 ta shior kun bo‘yicha navbat bilan almashadi.
- Tez kirish kartalari: Daraja aniqlash, Free Testlar, 3D qo‘llanmalar, Bepul darslar.
- Progress/statistika kartalari: coin, testlar, reyting, sevimlilar.

### Profil
- Profil rasmi yuklash/tahrirlash imkoniyati.
- Foydalanuvchi ma’lumotlari va demo statistika: coinlar, test natijalari, kurs progressi, reyting.
- Profil rasmi yuqori o‘ng tomonda dumaloq shaklda ko‘rinadi.

### SAT/OTM tayyorgarlik
- Namunaviy testlar, real exam simulyatsiya, timer, natija analizi kartalari.
- Matematika, ingliz tili, rus tili, biologiya, kimyo, fizika, tarix bo‘yicha namunaviy savollar qo‘shiladi.
- Exam simulation UI: savol, variantlar, timer, yakuniy natija va tahlil.

### Kurslar
Fanlar: matematika, ingliz tili, rus tili, biologiya, kimyo, fizika, tarix.
Har bir fan ichida:
- Video darslik
- PDF darslik kartasi
- Qo‘llanma
- Sinov testlari
- Kursda qatnashgan o‘quvchiga coin rag‘batlantirish elementi

### Free Testlar
Fanlar: matematika, ingliz tili, rus tili, biologiya, kimyo, fizika, tarix.
Har bir fanda:
- Quiz
- Fan testlari
- Full exam
- Random savollar
- Timer
- Namuna savollar va variantlar bilan to‘ldiriladi.

### Daraja aniqlash
Bo‘limlar:
- IELTS
- Multi-level
- Milliy sertifikat

Narxlar:
- IELTS: 69 000 so‘m
- Multi-level: 69 000 so‘m
- Milliy sertifikat: 59 000 so‘m
- Birinchi sinab ko‘rish: bepul

Milliy sertifikat ichidagi fanlar:
- Matematika
- Ingliz tili
- Rus tili
- Biologiya
- Kimyo
- Fizika
- Tarix

Darajalar pastdan yuqoriga: C, C+, B, B+, A, A+.
Har bir test uchun namunaviy savollar, progress, natija va coin rag‘batlantirish ko‘rsatiladi.

### 3D qo‘llanmalar
Fanlar:
- Biologiya
- Kimyo
- Fizika
- Tarix
- Geografiya

Fayldagi Sketchfab havolalari har bir fan ichida chiroyli 3D model kartalari sifatida joylashtiriladi. Bosilganda model yangi oynada yoki embedded preview orqali ochiladi. Agar Sketchfab embed ruxsat bermasa, fallback sifatida “Modelni ochish” tugmasi bo‘ladi.

### Kutubxona
- Badiiy asarlar va jahon adabiyoti namunalari.
- Har bir kitob uchun PDF, audio va film kartalari.
- Namuna sifatida bir nechta mashhur asarlar qo‘shiladi.

### Coin do‘koni
- Coin evaziga kontent ochish.
- Darslarga chegirmalar.
- Mock testlariga chegirmalar.
- Badiiy kitob va qo‘llanmalarga 30%, 50%, 70% chegirma kartalari.

### Edu Market
- Matematika, ingliz tili, rus tili, biologiya, kimyo, fizika, tarix fanlaridan qo‘llanmalar.
- Mavzulashtirilgan test kitoblari.
- Badiiy va jahon adabiyotlarini xarid qilish kartalari.
- Demo narxlar, kategoriya filterlari va savatga qo‘shish tugmalari.

### Reyting
- Top foydalanuvchilar jadvali.
- Coin, test natijasi va progress asosida demo reyting.

### Sevimli
Foydalanuvchi saqlagan narsalar uchun bo‘lim:
- Bepul darslar
- Kutubxona
- 3D qo‘llanmalar
- Edu market tovarlari
- Free testlar

### Bepul darslar
Fayldagi YouTube havolalari fanlar bo‘yicha joylashtiriladi:
- Matematika
- Ingliz tili
- Rus tili
- Biologiya
- Kimyo
- Fizika
- Tarix

Har bir video karta ko‘rinishida bo‘ladi, tugma orqali YouTube dars ochiladi.

### Premium xizmatlar
3 tarif:
- 1 oylik
- 3 oylik
- 12 oylik

Har bir tarifda narx, afzalliklar va “Tanlash” tugmasi bo‘ladi. Premium imkoniyatlar: kengaytirilgan testlar, 3D qo‘llanmalar, kutubxona, natija tahlili, chegirmalar.

### Xizmatlarni baholash
1 dan 5 gacha baholash UI:
- Bepul darslar
- Kutubxona
- 3D qo‘llanmalar
- Edu market tovarlari
- Free testlar

Baholash natijasi frontendda ko‘rinadi.

### Ilova haqida
Fayldagi matnlar joylashtiriladi:
- Biz haqimizda
- Bizning maqsadimiz
- Minnatdorchilik
- Jamoa a’zolari
- Fikr va takliflar
- Aloqa

Fayldan ajratilgan rasmlar o‘z o‘rniga joylashtiriladi:
- Hayitov Rizamat Shonazarovich
- Halimova Nazokat To’xtasinovna
- Jo’rayeva Dildora Yunusovna
- Oybek Abduraimov
- Muxtorov Aslonbek Maksudovich
- Botirova Aziza Nuraliyevna

Telegram havolalari va aloqa ma’lumotlari ham qo‘shiladi.

### Texnik bajarish
- `src/pages/Index.tsx` to‘liq almashtiriladi.
- Zarur bo‘lsa komponentlar `src/components` ichida ajratiladi: layout, sidebar, auth modal, cards, tests, sections.
- Fayldan olingan rasmlar loyiha assetlariga ko‘chiriladi va komponentlarda import qilinadi.
- Animatsiyalar Tailwind CSS va mavjud animation utilitylar bilan beriladi; agar paket mavjud bo‘lsa `framer-motion` ishlatiladi, bo‘lmasa CSS/Tailwind animatsiyalari bilan silliq effektlar qilinadi.
- Demo ma’lumotlar TypeScript massivlari sifatida tuziladi.
- Routing hozircha bitta sahifa ichidagi bo‘limlar orqali ishlaydi; kerak bo‘lsa keyinchalik alohida route’lar qo‘shiladi.
- Responsive sidebar/hamburger va mobile layout tekshiriladi.

### Yakuniy natija
Tasdiqlangandan so‘ng EduSAT Academy ilovasi fayldagi talablar asosida to‘ldirilgan, premium glassmorphism dizaynli, testlar, darslar, 3D qo‘llanmalar, profil, coin, login/register demo tizimi va “Ilova haqida” rasmlari bilan tayyor interaktiv frontendga aylanadi.