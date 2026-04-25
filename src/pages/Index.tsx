import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Boxes,
  Brain,
  Briefcase,
  ChevronRight,
  Coins,
  Crown,
  GraduationCap,
  Heart,
  Home,
  Languages,
  Library,
  Lock,
  LogIn,
  Menu,
  MessageCircle,
  Moon,
  PlayCircle,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Star,
  Sun,
  Timer,
  Trophy,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import hayitovImg from "@/assets/edusat/hayitov.jpg";
import halimovaImg from "@/assets/edusat/halimova.jpg";
import jorayevaImg from "@/assets/edusat/jorayeva.jpg";
import oybekImg from "@/assets/edusat/oybek.jpg";
import aslonbekImg from "@/assets/edusat/aslonbek.jpg";
import azizaImg from "@/assets/edusat/aziza.jpg";

const sections = [
  { id: "home", label: "Bosh sahifa", icon: Home },
  { id: "profile", label: "Profil", icon: User },
  { id: "sat", label: "SAT/OTM tayyorgarlik", icon: GraduationCap },
  { id: "courses", label: "Kurslar", icon: BookOpen },
  { id: "free-tests", label: "Free Testlar", icon: Brain },
  { id: "level", label: "Daraja aniqlash", icon: ShieldCheck },
  { id: "models", label: "3D qo‘llanmalar", icon: Boxes },
  { id: "library", label: "Kutubxona", icon: Library },
  { id: "coin-shop", label: "Coin do‘koni", icon: Coins },
  { id: "market", label: "Edu market", icon: ShoppingBag },
  { id: "rating", label: "Reyting", icon: Trophy },
  { id: "favorites", label: "Sevimli", icon: Heart },
  { id: "lessons", label: "Bepul darslar", icon: PlayCircle },
  { id: "premium", label: "Premium xizmatlar", icon: Crown },
  { id: "reviews", label: "Xizmatlarni baholash", icon: Star },
  { id: "jobs", label: "Ish o‘rinlari", icon: Briefcase },
  { id: "about", label: "Ilova haqida", icon: Award },
] as const;

const subjects = ["Matematika", "Ingliz tili", "Rus tili", "Biologiya", "Kimyo", "Fizika", "Tarix"];
const science3d = ["Biologiya", "Kimyo", "Fizika", "Tarix", "Geografiya"];
const levels = ["C", "C+", "B", "B+", "A", "A+"];
const languageOptions: Array<{ code: Lang; label: string }> = [
  { code: "uz", label: "O‘zbek" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

const libraryBooks = [
  { title: "O‘tkan kunlar", author: "Abdulla Qodiriy", level: "Adabiyot", formats: ["PDF", "Audio", "Tahlil"], cover: "OQ", scene: "Tarixiy roman" },
  { title: "Mehrobdan chayon", author: "Abdulla Qodiriy", level: "Roman", formats: ["PDF", "Audio"], cover: "MC", scene: "Klassik asar" },
  { title: "Boburnoma", author: "Zahiriddin Bobur", level: "Tarix", formats: ["PDF", "Xarita", "Izoh"], cover: "BN", scene: "Xotira va tarix" },
  { title: "Alpomish", author: "Xalq dostoni", level: "Doston", formats: ["PDF", "Audio", "Film"], cover: "AL", scene: "Qahramonlik" },
  { title: "1984", author: "George Orwell", level: "English B2", formats: ["PDF", "Audio", "Vocab"], cover: "84", scene: "Dystopia" },
  { title: "Hamlet", author: "William Shakespeare", level: "English C1", formats: ["PDF", "Audio", "Scene"], cover: "HL", scene: "Drama" },
  { title: "The Old Man and the Sea", author: "Ernest Hemingway", level: "English B1", formats: ["PDF", "Audio"], cover: "OS", scene: "Sea story" },
  { title: "War and Peace", author: "Leo Tolstoy", level: "Russian C1", formats: ["PDF", "Audio", "Film"], cover: "WP", scene: "Epic novel" },
];

const coinShopItems = [
  { title: "Premium test ochish", price: 300, image: "PT", description: "Daraja va SAT mini mock testlariga kirish." },
  { title: "Bepul dars bonus", price: 450, image: "BD", description: "Tanlangan video dars uchun qo‘shimcha materiallar." },
  { title: "Mock test chegirmasi", price: 700, image: "MT", description: "IELTS/Multi-level mock test uchun 50% chegirma." },
  { title: "Kitob paketi", price: 900, image: "KP", description: "Kutubxona PDF/audio resurslarini ochish." },
];

const marketItems = [
  { title: "SAT Math workbook", category: "SAT", price: "79 000 so‘m", image: "SM", description: "Algebra, problem solving va practice setlar." },
  { title: "OTM blok to‘plami", category: "OTM", price: "69 000 so‘m", image: "OB", description: "Majburiy fanlar va asosiy blok savollari." },
  { title: "IELTS Writing kit", category: "IELTS", price: "89 000 so‘m", image: "IW", description: "Task 1/2 shablonlari, band descriptor va namunalar." },
  { title: "Milliy sertifikat paketi", category: "Sertifikat", price: "59 000 so‘m", image: "MS", description: "Fanlar kesimida nazariya va mavzuli testlar." },
  { title: "Biologiya 3D atlas", category: "3D", price: "49 000 so‘m", image: "BA", description: "Anatomiya, hujayra va organlar bo‘yicha vizual atlas." },
  { title: "Kimyo formula kartalari", category: "Kimyo", price: "39 000 so‘m", image: "KF", description: "Reaksiya, molekula va formulalar uchun tezkor kartalar." },
];

const statCards: Array<{ label: string; value: string | number; icon: LucideIcon }> = [
  { label: "Coin balans", value: 1280, icon: Coins },
  { label: "Yechilgan test", value: 42, icon: Brain },
  { label: "Reyting o‘rni", value: "#12", icon: Trophy },
  { label: "Sevimlilar", value: 18, icon: Heart },
];

const quotes = [
  ["Muvaffaqiyat – bu yakun emas, mag‘lubiyat – bu halokat emas. Eng muhimi – davom etish jasoratidir.", "Winston Churchill"],
  ["Kelajak bugun nima qilayotganingizga bog‘liq.", "Mahatma Gandhi"],
  ["Orzularingizni amalga oshirish uchun eng yaxshi vaqt — hozir.", "Napoleon Hill"],
  ["Men yutqazmadim. Men ishlamaydigan 10 000 usulni topdim.", "Thomas Edison"],
  ["Agar siz tez borishni xohlasangiz — yolg‘iz boring. Agar uzoqqa borishni xohlasangiz — birga boring.", "Afrika maqoli"],
  ["Qiyinchiliklar ichida imkoniyat yashirinadi.", "Albert Einstein"],
  ["Katta ishlarni qilish uchun nafaqat harakat, balki orzu ham kerak.", "Anatole France"],
];

const sampleQuestions = [
  { subject: "Matematika", question: "Agar 3x + 7 = 22 bo‘lsa, x nechaga teng?", answer: "5" },
  { subject: "Ingliz tili", question: "Choose the correct form: She ___ to school every day.", answer: "goes" },
  { subject: "Rus tili", question: "Сколько падежей в русском языке?", answer: "6" },
  { subject: "Biologiya", question: "Fotosintez jarayonida qaysi gaz ajraladi?", answer: "Kislorod" },
  { subject: "Kimyo", question: "Suvning kimyoviy formulasi qanday?", answer: "H₂O" },
  { subject: "Fizika", question: "Tok kuchi qaysi birlikda o‘lchanadi?", answer: "Amper" },
  { subject: "Tarix", question: "Amir Temur davlati poytaxti qaysi shahar bo‘lgan?", answer: "Samarqand" },
];

const satOtmQuestions = [
  { subject: "SAT Math", question: "If f(x)=2x²-3x+1, find f(3).", answer: "10" },
  { subject: "SAT Reading", question: "Main idea savolida avval nimani aniqlash kerak?", answer: "Matnning umumiy g‘oyasi" },
  { subject: "SAT Writing", question: "Choose the concise version: Due to the fact that it rained, the match was delayed.", answer: "Because it rained, the match was delayed." },
  { subject: "SAT Algebra", question: "2x - 5 = 13 bo‘lsa, x nechaga teng?", answer: "9" },
  { subject: "SAT Data", question: "Agar 40 ning 25% i so‘ralsa, javob nechchi?", answer: "10" },
  { subject: "OTM Matematika", question: "Kvadrat tenglama diskriminanti formulasi qanday?", answer: "D=b²-4ac" },
  { subject: "OTM Ona tili", question: "Gap bo‘laklari nechta asosiy turga bo‘linadi?", answer: "5 ta" },
  { subject: "OTM Tarix", question: "Mustaqillik deklaratsiyasi qachon qabul qilingan?", answer: "1990-yil 20-iyun" },
  { subject: "OTM Ingliz tili", question: "Choose: I have lived here ___ 2020.", answer: "since" },
  { subject: "OTM Biologiya", question: "DNK tarkibidagi azotli asoslardan biri qaysi?", answer: "Adenin" },
  { subject: "OTM Kimyo", question: "NaCl moddasining nomi nima?", answer: "Natriy xlorid" },
  { subject: "OTM Fizika", question: "Tezlik formulasi qanday?", answer: "v=s/t" },
  { subject: "OTM Geografiya", question: "Yerning eng katta okeani qaysi?", answer: "Tinch okeani" },
];

const freeTestPacks = [
  { title: "SAT Diagnostic", meta: "35 daqiqa • 25 savol", items: ["Algebra", "Reading", "Writing"] },
  { title: "OTM Blok testi", meta: "60 daqiqa • 45 savol", items: ["Majburiy fanlar", "Asosiy fan", "Natija"] },
  { title: "Milliy sertifikat Mini", meta: "25 daqiqa • 20 savol", items: ["C", "B", "A"] },
  { title: "IELTS Mini Mock", meta: "30 daqiqa • 4 bo‘lim", items: ["Listening", "Reading", "Writing"] },
];

const levelTests = [
  { title: "IELTS", price: "69 000 so‘m", accent: "Band 4.0 → 8.0", items: ["Listening", "Reading", "Writing", "Speaking"] },
  { title: "Multi-level", price: "69 000 so‘m", accent: "A2 → C1", items: ["Grammar", "Vocabulary", "Reading", "Writing"] },
  { title: "Milliy sertifikat", price: "59 000 so‘m", accent: "C → A+", items: subjects },
];

const levelTestQuestions: Record<string, Array<{ subject: string; question: string; answer: string }>> = {
  IELTS: [
    { subject: "Vocabulary", question: "Synonym of 'significant'?", answer: "important" },
    { subject: "Grammar", question: "Fill: If I ___ rich, I would travel.", answer: "were" },
    { subject: "Reading", question: "Antonym of 'ancient'?", answer: "modern" },
    { subject: "Writing", question: "Plural of 'analysis'?", answer: "analyses" },
    { subject: "Listening", question: "How many minutes in 1.5 hours?", answer: "90" },
  ],
  "Multi-level": [
    { subject: "Grammar", question: "Choose: She ___ to school every day.", answer: "goes" },
    { subject: "Vocabulary", question: "Past tense of 'go'?", answer: "went" },
    { subject: "Reading", question: "Antonym of 'happy'?", answer: "sad" },
    { subject: "Writing", question: "Article: ___ apple a day.", answer: "an" },
    { subject: "Listening", question: "Capital of the UK?", answer: "London" },
  ],
  "Milliy sertifikat": [
    { subject: "Matematika", question: "5! (faktorial) nechaga teng?", answer: "120" },
    { subject: "Ona tili", question: "Gapning bosh bo‘laklari nechta?", answer: "2" },
    { subject: "Tarix", question: "Mustaqillik yili?", answer: "1991" },
    { subject: "Biologiya", question: "Inson tanasida nechta xromosoma bor?", answer: "46" },
    { subject: "Kimyo", question: "Oltinning kimyoviy belgisi?", answer: "Au" },
  ],
};

const quizBank: Record<string, Array<{ question: string; answer: string }>> = {
  Matematika: [
    { question: "12 × 8 = ?", answer: "96" },
    { question: "144 ning kvadrat ildizi?", answer: "12" },
    { question: "3x = 27 bo‘lsa, x = ?", answer: "9" },
    { question: "5! (faktorial) nechaga teng?", answer: "120" },
    { question: "Aylananing yuzi formulasi (S = ?)", answer: "πr²" },
    { question: "1 km nechta metr?", answer: "1000" },
    { question: "Eng kichik tub son qaysi?", answer: "2" },
    { question: "log10(1000) = ?", answer: "3" },
    { question: "sin(90°) = ?", answer: "1" },
    { question: "2^10 = ?", answer: "1024" },
  ],
  "Ingliz tili": [
    { question: "Past tense of 'go'?", answer: "went" },
    { question: "Antonym of 'happy'?", answer: "sad" },
    { question: "Plural of 'child'?", answer: "children" },
    { question: "Article: ___ apple a day.", answer: "an" },
    { question: "Choose: She ___ to school every day.", answer: "goes" },
    { question: "Synonym of 'big'?", answer: "large" },
    { question: "Past participle of 'write'?", answer: "written" },
    { question: "Comparative of 'good'?", answer: "better" },
    { question: "How many letters in the English alphabet?", answer: "26" },
    { question: "Capital of England?", answer: "London" },
  ],
  "Rus tili": [
    { question: "Сколько падежей в русском языке?", answer: "6" },
    { question: "Множественное число от 'дом'?", answer: "дома" },
    { question: "Антоним слова 'белый'?", answer: "черный" },
    { question: "Столица России?", answer: "Москва" },
    { question: "Глагол: я ___ книгу (читать)", answer: "читаю" },
    { question: "Синоним слова 'большой'?", answer: "огромный" },
    { question: "Сколько букв в русском алфавите?", answer: "33" },
    { question: "Прошедшее время от 'идти'?", answer: "шёл" },
    { question: "Перевод 'apple' на русский?", answer: "яблоко" },
    { question: "Число 'пять' цифрами?", answer: "5" },
  ],
  Biologiya: [
    { question: "Fotosintezda ajraladigan gaz?", answer: "Kislorod" },
    { question: "Inson tanasida nechta xromosoma?", answer: "46" },
    { question: "Hujayraning energiya stansiyasi?", answer: "Mitoxondriya" },
    { question: "Qonni tozalovchi organ?", answer: "Buyrak" },
    { question: "Eng katta organ?", answer: "Teri" },
    { question: "DNK to‘liq nomi?", answer: "Dezoksiribonuklein kislota" },
    { question: "Yurakda nechta bo‘lma bor?", answer: "4" },
    { question: "O‘simliklarda yashil pigment?", answer: "Xlorofill" },
    { question: "Inson skeletida nechta suyak bor?", answer: "206" },
    { question: "Qon guruhlari nechta?", answer: "4" },
  ],
  Kimyo: [
    { question: "Suvning formulasi?", answer: "H2O" },
    { question: "Oltinning kimyoviy belgisi?", answer: "Au" },
    { question: "Davriy jadvalda nechta element bor (taxminan)?", answer: "118" },
    { question: "NaCl nomi?", answer: "Natriy xlorid" },
    { question: "Kislorodning belgisi?", answer: "O" },
    { question: "pH 7 bu qanday muhit?", answer: "Neytral" },
    { question: "Vodorod belgisi?", answer: "H" },
    { question: "CO2 nomi?", answer: "Karbonat angidrid" },
    { question: "Eng yengil element?", answer: "Vodorod" },
    { question: "Temirning belgisi?", answer: "Fe" },
  ],
  Fizika: [
    { question: "Tezlik formulasi?", answer: "v=s/t" },
    { question: "Tok kuchi birligi?", answer: "Amper" },
    { question: "Erkin tushish tezlanishi (g)?", answer: "9.8" },
    { question: "Quvvat birligi?", answer: "Vatt" },
    { question: "Yorug‘lik tezligi (km/s)?", answer: "300000" },
    { question: "Massa birligi (SI)?", answer: "kg" },
    { question: "F = ma — bu kimning qonuni?", answer: "Nyuton" },
    { question: "Kuchlanish birligi?", answer: "Volt" },
    { question: "Energiya birligi?", answer: "Joul" },
    { question: "Temperatura birligi (SI)?", answer: "Kelvin" },
  ],
  Tarix: [
    { question: "Mustaqillik yili?", answer: "1991" },
    { question: "Amir Temur poytaxti?", answer: "Samarqand" },
    { question: "Birinchi jahon urushi qachon boshlangan?", answer: "1914" },
    { question: "Ikkinchi jahon urushi tugagan yili?", answer: "1945" },
    { question: "Mustaqillik kuni (sana)?", answer: "1-sentyabr" },
    { question: "Bobur qaysi davlatga asos solgan?", answer: "Boburiylar" },
    { question: "Konstitutsiya qabul qilingan yil?", answer: "1992" },
    { question: "Sovet Ittifoqi tarqalgan yil?", answer: "1991" },
    { question: "Birinchi prezident?", answer: "Islom Karimov" },
    { question: "Ipak yo‘li qaysi qit’alarni bog‘lagan?", answer: "Osiyo va Yevropa" },
  ],
};

const quizModeMeta: Record<string, { count: number; label: string }> = {
  Quiz: { count: 5, label: "Tezkor 5 savol" },
  "Fan testlari": { count: 10, label: "To‘liq fan 10 savol" },
  "Full exam": { count: 10, label: "Full exam 10 savol" },
  Random: { count: 7, label: "Random 7 savol" },
};

const sketchfab = {
  Biologiya: [
    "https://sketchfab.com/3d-models/modern-human-skeletal-organs-c06468c7f4444e08a397e90bc84381d3",
    "https://sketchfab.com/3d-models/human-internal-organs-fe69d7b1ed6f46a3bd0b6933b796092e",
    "https://sketchfab.com/3d-models/human-internal-organs-anatomy-8a43f3a308994699a4000b17004d5220",
    "https://sketchfab.com/3d-models/muscle-system-in-human-body-muscular-system-7ea21567ff9942bf9511e2d99efe85d9",
  ],
  Kimyo: [
    "https://sketchfab.com/3d-models/sulfamic-acid-2302bbd9779f497db80948ab45cac0b8",
    "https://sketchfab.com/3d-models/flavin-adenine-dinucleotide-fad-b3328386cff14905a60ea1a44db17d65",
    "https://sketchfab.com/3d-models/chemical-reaction-aca0bf7c2d0440ae81a26ab4a0a399d2",
  ],
  Fizika: [
    "https://sketchfab.com/3d-models/rube-goldberg-machine-for-7c-labs-fd05465ccafd4896b36df06b11683c8e",
    "https://sketchfab.com/3d-models/iron-stand-with-base-and-clamp-arrangement-3dc06bae602a479c9c8d3c2456699f2c",
    "https://sketchfab.com/3d-models/atom-31a8f6ac569449f7a22b8fdd9b81dafc",
  ],
  Tarix: [
    "https://sketchfab.com/3d-models/the-great-pyramid-of-giza-4a251113722f4d969b6cf2ca5f35c502",
    "https://sketchfab.com/3d-models/pula-roman-amphitheater-vektra-doo-4d9a5b0eb5534ba3b88342e79b50cccd",
    "https://sketchfab.com/3d-models/inner-hall-mastaba-of-ti-saqqara-c8dcba37917a4dcf823cb5a8d60b5149",
  ],
  Geografiya: [
    "https://sketchfab.com/3d-models/planets-47364f26b7de41c7ab3b020c7b794ee1",
    "https://sketchfab.com/3d-models/need-some-space-d6521362b37b48e3a82bce4911409303",
    "https://sketchfab.com/3d-models/star-cluster-15k-stars-model-51148b78a37a4a72b22d8e06f4293e07",
    "https://sketchfab.com/3d-models/celestial-sphere-2020-update-6a9fbfbac60f437fa1ce9aea2a38c692",
  ],
};

const videos = [
  ["Matematika", "https://youtu.be/s321MsIH5y4?si=ssBsJVc_lkGXv3PL"],
  ["Ingliz tili", "https://youtu.be/d-fvgkbTED0?si=y55kgLwxGrZp9f5c"],
  ["Rus tili", "https://youtu.be/NubrWHBh4O0?si=fSe4yet99kWWhDHI"],
  ["Biologiya", "https://youtu.be/1iCuo4tlHnE?si=VTgRRcSMTXF3BGLS"],
  ["Kimyo", "https://youtu.be/2KWEi3fL77c?si=hBhsQBOkMvgF4jaD"],
  ["Fizika", "https://youtu.be/oxoBvF7j8JA?si=ZEc8UJdPg56QQhZ6"],
  ["Tarix", "https://youtu.be/4jh5iWJ7Cds?si=TC3joati70JWcAh-"],
];

const mentors = [
  { name: "Hayitov Rizamat Shonazarovich", role: "Qo‘llab-quvvatlovchi ustoz", image: hayitovImg },
  { name: "Halimova Nazokat To’xtasinovna", role: "Qo‘llab-quvvatlovchi ustoz", image: halimovaImg },
  { name: "Jo’rayeva Dildora Yunusovna", role: "Qo‘llab-quvvatlovchi ustoz", image: jorayevaImg },
  { name: "Oybek Abduraimov", role: "Yordam beruvchi ustoz", image: oybekImg },
];

const team = [
  { name: "Muxtorov Aslonbek Maksudovich", role: "Loyixa egasi va dasturchi", image: aslonbekImg, link: "https://t.me/ASLONBEK_MUXTOROV" },
  { name: "BOTIROVA AZIZA NURALIYEVNA", role: "Yetakchi jamoa a’zosi", image: azizaImg },
];

const translations = {
  uz: { greeting: "Xush kelibsiz", guest: "Mehmon", login: "Kirish", register: "Ro‘yxatdan o‘tish", search: "Qidirish" },
  en: { greeting: "Welcome", guest: "Guest", login: "Login", register: "Sign up", search: "Search" },
  ru: { greeting: "Добро пожаловать", guest: "Гость", login: "Войти", register: "Регистрация", search: "Поиск" },
};

type SectionId = (typeof sections)[number]["id"];
type Lang = keyof typeof translations;

const getSketchfabEmbed = (url: string) => {
  const id = url.split("-").pop();
  return id ? `https://sketchfab.com/models/${id}/embed` : url;
};

const getYoutubeEmbed = (url: string) => {
  const id = url.match(/youtu\.be\/([^?]+)/)?.[1] || url.match(/[?&]v=([^&]+)/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`glass-panel rounded-3xl p-5 shadow-premium animate-fade-in ${className}`}>{children}</div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-bold text-secondary-foreground">
    {children}
  </span>
);

const SectionTitle = ({ kicker, title, text }: { kicker: string; title: string; text: string }) => (
  <div className="mb-6 max-w-3xl">
    <p className="mb-2 text-sm font-black uppercase tracking-normal text-primary">{kicker}</p>
    <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">{title}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground">{text}</p>
  </div>
);

const ProgressBar = ({ value }: { value: number }) => (
  <div className="h-2 overflow-hidden rounded-full bg-secondary">
    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
  </div>
);

const Index = () => {
  const [active, setActive] = useState<SectionId>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<Lang>("uz");
  const [coins, setCoins] = useState(1280);
  const [userName, setUserName] = useState("Mehmon");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, { name: string; password: string }>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("edusat:users") || "{}"); } catch { return {}; }
  });
  const [profileName, setProfileName] = useState("Mehmon");
  const [profileEmail, setProfileEmail] = useState("demo@edusat.uz");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Array<{ id: string; title: string; category: string; section: SectionId }>>([]);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [submittedTests, setSubmittedTests] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [active3dSubject, setActive3dSubject] = useState("Hammasi");
  const [activeLevelTest, setActiveLevelTest] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<{ subject: string; mode: string } | null>(null);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [examTimer, setExamTimer] = useState(0);
  const [examRunning, setExamRunning] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const [shopMessage, setShopMessage] = useState("");
  const [reviewSaved, setReviewSaved] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobSubject, setJobSubject] = useState(subjects[0]);
  const [jobPhone, setJobPhone] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jobCertificate, setJobCertificate] = useState<string | null>(null);
  const [jobSent, setJobSent] = useState(false);
  const [jobError, setJobError] = useState("");

  useEffect(() => {
    if (!examRunning) return;
    const interval = setInterval(() => setExamTimer((current) => (current > 0 ? current - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [examRunning]);

  useEffect(() => {
    if (examRunning && examTimer === 0) setExamRunning(false);
  }, [examRunning, examTimer]);

  useEffect(() => {
    if (!shopMessage) return;
    const t = setTimeout(() => setShopMessage(""), 2500);
    return () => clearTimeout(t);
  }, [shopMessage]);

  const formatTimer = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Persist registered users
  useEffect(() => {
    try { localStorage.setItem("edusat:users", JSON.stringify(registeredUsers)); } catch { /* ignore */ }
  }, [registeredUsers]);

  // Restore session on first mount
  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("edusat:session") || "null");
      if (session?.email && session?.name) {
        setUserName(session.name);
        setProfileName(session.name);
        setProfileEmail(session.email);
        setIsAuthenticated(true);
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todayQuote = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return quotes[day % quotes.length];
  }, []);

  const t = translations[lang];
  const displayName = userName.trim() || t.guest;
  const initials = (displayName === "Mehmon" || displayName === "Guest" || displayName === "Гость")
    ? "M"
    : (displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "M");

  const AvatarBlock = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const dim = size === "lg" ? "h-28 w-28 text-4xl" : size === "sm" ? "h-11 w-11 text-base" : "h-14 w-14 text-xl";
    if (avatar) return <img src={avatar} alt="Profil rasmi" className={`${dim} rounded-full border-2 border-primary/40 object-cover shadow-glow`} />;
    return <span className={`${dim} grid place-items-center rounded-full border-2 border-primary/40 bg-primary/15 font-black text-primary shadow-glow`}>{initials}</span>;
  };
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchableItems = useMemo(() => [
    ...sections.map((section) => ({ title: section.label, category: "Bo‘lim", section: section.id })),
    ...subjects.map((subject) => ({ title: subject, category: "Fan", section: "courses" as SectionId })),
    ...libraryBooks.map((book) => ({ title: book.title, category: book.author, section: "library" as SectionId })),
    ...coinShopItems.map((item) => ({ title: item.title, category: `${item.price} coin`, section: "coin-shop" as SectionId })),
    ...marketItems.map((item) => ({ title: item.title, category: item.category, section: "market" as SectionId })),
    ...freeTestPacks.map((pack) => ({ title: pack.title, category: pack.meta, section: "free-tests" as SectionId })),
  ], []);
  const searchResults = normalizedSearch
    ? searchableItems.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(normalizedSearch)).slice(0, 8)
    : [];
  const filteredSections = normalizedSearch
    ? sections.filter((section) => section.label.toLowerCase().includes(normalizedSearch))
    : sections;
  const all3dModels = useMemo(
    () => science3d.flatMap((subject) => (sketchfab[subject as keyof typeof sketchfab] || []).map((url, index) => ({ subject, url, index }))),
    []
  );
  const visible3dModels = active3dSubject === "Hammasi" ? all3dModels : all3dModels.filter((model) => model.subject === active3dSubject);
  const favoriteCategoryOrder = ["Kurs", "Free test", "Fan testi", "Kitob", "3D qo‘llanma", "Bepul dars", "Edu market"];
  const groupedFavorites = favoriteCategoryOrder
    .map((category) => ({ category, items: favorites.filter((item) => item.category === category) }))
    .filter((group) => group.items.length > 0);
  const normalizeAnswer = (value: string) => value.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ");
  const getTestScore = (testId: string, questions: typeof sampleQuestions) => questions.filter((q) => normalizeAnswer(testAnswers[`${testId}-${q.subject}`] || "") === normalizeAnswer(q.answer)).length;

  const completeActivity = (reward = 25) => setCoins((current) => current + reward);

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  };

  const handleAuthSubmit = () => {
    const name = authName.trim();
    const email = authEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || authPassword.length < 6) {
      setAuthError("To‘g‘ri email va kamida 6 belgili parol kiriting.");
      return;
    }
    if (authMode === "login") {
      const user = registeredUsers[email];
      if (!user || user.password !== authPassword) {
        setAuthError("Email yoki parol noto‘g‘ri. Avval ro‘yxatdan o‘ting yoki ma’lumotlarni tekshiring.");
        return;
      }
      setUserName(user.name);
      setProfileName(user.name);
      setProfileEmail(email);
      setIsAuthenticated(true);
      try { localStorage.setItem("edusat:session", JSON.stringify({ email, name: user.name })); } catch { /* ignore */ }
      setActive("profile");
      setAuthError("");
      setAuthOpen(false);
      completeActivity(50);
      return;
    }
    if (name.length < 2) {
      setAuthError("Ro‘yxatdan o‘tish uchun ismni kiriting.");
      return;
    }
    const nextName = name || email.split("@")[0] || "Foydalanuvchi";
    setRegisteredUsers((current) => ({ ...current, [email]: { name: nextName, password: authPassword } }));
    setUserName(nextName);
    setProfileName(nextName);
    setProfileEmail(email);
    setIsAuthenticated(true);
    try { localStorage.setItem("edusat:session", JSON.stringify({ email, name: nextName })); } catch { /* ignore */ }
    setActive("profile");
    setAuthError("");
    setAuthOpen(false);
    completeActivity(authMode === "register" ? 100 : 50);
  };

  const isFavorite = (id: string) => favorites.some((item) => item.id === id);
  const toggleFavorite = (item: { id: string; title: string; category: string; section: SectionId }) => {
    setFavorites((current) => current.some((favorite) => favorite.id === item.id) ? current.filter((favorite) => favorite.id !== item.id) : [item, ...current]);
  };

  const FavoriteButton = ({ item }: { item: { id: string; title: string; category: string; section: SectionId } }) => (
    <button
      className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-black ${isFavorite(item.id) ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-accent"}`}
      onClick={() => toggleFavorite(item)}
    >
      <Heart className="h-4 w-4" /> {isFavorite(item.id) ? "Saqlangan" : "Sevimli"}
    </button>
  );

  const TestRunner = ({ testId, questions }: { testId: string; questions: typeof sampleQuestions }) => {
    const submitted = submittedTests[testId];
    const score = getTestScore(testId, questions);

    return (
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {questions.map((q, index) => {
          const answerKey = `${testId}-${q.subject}`;
          const isCorrect = normalizeAnswer(testAnswers[answerKey] || "") === normalizeAnswer(q.answer);
          return (
            <div key={`${testId}-${q.subject}-${index}`} className="rounded-3xl border border-border/60 bg-card/70 p-5">
              <Pill>{q.subject}</Pill>
              <p className="mt-4 font-black text-foreground">{q.question}</p>
              <input className="mt-4 h-11 w-full rounded-2xl border border-input bg-background px-4 font-bold text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Javob yozing" value={testAnswers[answerKey] || ""} onChange={(event) => setTestAnswers({ ...testAnswers, [answerKey]: event.target.value })} />
              {submitted && <p className={`mt-3 text-sm font-black ${isCorrect ? "text-primary" : "text-destructive"}`}>{isCorrect ? "To‘g‘ri javob" : `Noto‘g‘ri. To‘g‘ri javob: ${q.answer}`}</p>}
            </div>
          );
        })}
        <GlassCard className="md:col-span-2 xl:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-black text-foreground">Test natijasi</h3>
              <p className="mt-1 text-sm text-muted-foreground">{submitted ? `${score}/${questions.length} ta to‘g‘ri javob` : "Javoblarni yozib, tekshirish tugmasini bosing."}</p>
            </div>
            <button className="premium-button rounded-2xl px-5 py-3 font-black" onClick={() => { setSubmittedTests({ ...submittedTests, [testId]: true }); completeActivity(30); }}>Tekshirish +30 coin</button>
          </div>
        </GlassCard>
      </div>
    );
  };

  const navVisible = sidebarOpen || !sidebarHidden;
  const nav = (
    <aside
      className="glass-panel fixed inset-y-3 left-3 z-40 flex w-[min(84vw,320px)] flex-col rounded-3xl p-4 shadow-premium transition-all duration-300 lg:sticky lg:top-3 lg:h-[calc(100vh-1.5rem)] lg:w-80 data-[open=false]:-translate-x-[110%] data-[open=false]:lg:pointer-events-none data-[open=false]:lg:w-0 data-[open=false]:lg:p-0 data-[open=false]:lg:opacity-0"
      data-open={navVisible}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <button className="flex items-center gap-3 text-left" onClick={() => setActive("home")}>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
            <Rocket className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-xl font-black text-foreground">EduSAT</span>
            <span className="text-xs font-bold text-muted-foreground">Academy Premium</span>
          </span>
        </button>
        <button className="rounded-2xl p-2 text-muted-foreground hover:bg-accent lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Menyuni yopish">
          <X />
        </button>
        <button className="hidden rounded-2xl p-2 text-muted-foreground hover:bg-accent lg:inline-flex" onClick={() => setSidebarHidden(true)} aria-label="Yon panelni yashirish">
          <X />
        </button>
      </div>
      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-border/60 bg-secondary/50 p-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder={t.search} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      </div>
      {searchResults.length > 0 && (
        <div className="mb-4 space-y-1 rounded-3xl border border-border/60 bg-card/70 p-2">
          {searchResults.map((item) => (
            <button
              key={`${item.section}-${item.title}`}
              className="w-full rounded-2xl px-3 py-2 text-left hover:bg-accent"
              onClick={() => {
                setActive(item.section);
                setSearchQuery("");
                setSidebarOpen(false);
              }}
            >
              <span className="block text-sm font-black text-foreground">{item.title}</span>
              <span className="text-xs font-bold text-muted-foreground">{item.category}</span>
            </button>
          ))}
        </div>
      )}
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
        {filteredSections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              if (id === "profile" && !isAuthenticated) {
                setAuthMode("register");
                setAuthOpen(true);
                return;
              }
              setActive(id);
              setSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold transition-all ${
              active === id ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
        {filteredSections.length === 0 && <p className="px-3 py-4 text-sm font-bold text-muted-foreground">Natija topilmadi</p>}
      </nav>
    </aside>
  );

  const renderHome = () => (
    <>
      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <GlassCard className="relative min-h-[360px] overflow-hidden p-7 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,hsl(var(--primary)/0.2),transparent_34%)]" />
          <div className="relative z-10 flex h-full flex-col justify-center">
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-foreground md:text-6xl">
              EduSAT <span className="text-primary">Academy</span><br />Sizning <span className="text-primary">Muvaffaqiyat</span> Yo‘lingiz
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {t.greeting}, <b className="text-foreground">{displayName === "Mehmon" ? t.guest : displayName}</b>! SAT, OTM va xalqaro imtihonlarga premium tayyorlaning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Daraja aniqlash", "Free Testlar", "3D qo‘llanmalar", "Bepul darslar"].map((item) => (
                <button key={item} className="premium-button rounded-2xl px-5 py-3 text-sm font-black" onClick={() => setActive(sections.find((s) => s.label === item)?.id ?? "level")}>
                  {item}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-4 right-6 text-[180px] font-black leading-none text-primary/10">”</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
              <Star />
            </div>
            <div>
              <p className="text-sm font-black text-primary">Bugungi shior</p>
              <p className="text-xs text-muted-foreground">Har kuni avtomatik almashadi</p>
            </div>
          </div>
          <blockquote className="mt-5 text-xl font-black leading-8 text-foreground">“{todayQuote[0]}”</blockquote>
          <p className="mt-4 font-bold text-muted-foreground">— {todayQuote[1]}</p>
        </GlassCard>
      </section>
      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon }) => (
          <GlassCard key={label}>
            <Icon className="mb-4 h-7 w-7 text-primary" />
            <p className="text-sm font-bold text-muted-foreground">{label}</p>
            <p className="mt-1 text-3xl font-black text-foreground">{label === "Coin balans" ? coins : value}</p>
          </GlassCard>
        ))}
      </section>
    </>
  );

  const renderProfile = () => (
    <section>
      <SectionTitle kicker="Profil" title="Foydalanuvchi ma’lumotlari va statistika" text="Profil rasmini tahrirlang, natijalar, coinlar va o‘quv progressini kuzating." />
      <div className="space-y-5">
        <GlassCard>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <AvatarBlock size="lg" />
              <div>
                <Pill>1-bosqich • Shaxsiy profil</Pill>
                <h3 className="mt-3 text-3xl font-black text-foreground">{displayName}</h3>
                <p className="text-muted-foreground">{avatar ? "EduSAT Academy foydalanuvchisi" : "Profil rasmi qo‘yilmagan — istasangiz yuklab qo‘ying"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground">
                {avatar ? "Rasmni o‘zgartirish" : "Rasm yuklash"}
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              </label>
              {avatar && <button className="rounded-2xl border border-border px-5 py-3 text-sm font-black text-foreground hover:bg-accent" onClick={() => setAvatar(null)}>Rasmni olib tashlash</button>}
              <button className="rounded-2xl border border-border px-5 py-3 text-sm font-black text-foreground hover:bg-accent" onClick={() => { setIsAuthenticated(false); setUserName("Mehmon"); setProfileName("Mehmon"); setAvatar(null); setAuthEmail(""); setAuthPassword(""); setActive("home"); }}>Profildan chiqish</button>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <Pill>2-bosqich • Ma’lumotlarni tahrirlash</Pill>
          <div className="mb-5 grid gap-3 md:grid-cols-2">
            <label className="space-y-2 text-sm font-black text-foreground">
              Ism familiya
              <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 font-bold text-foreground outline-none focus:ring-2 focus:ring-ring" value={profileName} onChange={(event) => { setProfileName(event.target.value); setUserName(event.target.value || "Mehmon"); }} />
            </label>
            <label className="space-y-2 text-sm font-black text-foreground">
              Email
              <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 font-bold text-foreground outline-none focus:ring-2 focus:ring-ring" type="email" value={profileEmail} onChange={(event) => setProfileEmail(event.target.value)} />
            </label>
            <label className="space-y-2 text-sm font-black text-foreground md:col-span-2">
              Maqsad
              <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 font-bold text-foreground outline-none focus:ring-2 focus:ring-ring" defaultValue="SAT/OTM imtihonlariga tayyorgarlik" />
            </label>
          </div>
        </GlassCard>
        <GlassCard>
          <Pill>3-bosqich • O‘quv progressi</Pill>
          <div className="grid gap-4 md:grid-cols-2">
            {["SAT/OTM progress", "Free test aniqligi", "Daraja testi", "Kurs ishtiroki"].map((item, index) => (
              <div key={item} className="rounded-2xl border border-border/60 bg-secondary/40 p-4">
                <p className="mb-3 font-black text-foreground">{item}</p>
                <ProgressBar value={[78, 64, 82, 56][index]} />
                <p className="mt-2 text-sm text-muted-foreground">{[78, 64, 82, 56][index]}% yakunlangan</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );

  const renderSat = () => {
    const startExam = (minutes: number) => { setExamTimer(minutes * 60); setExamRunning(true); completeActivity(35); };
    return (
      <section>
        <SectionTitle kicker="SAT/OTM" title="Real exam simulyatsiya va natija analizi" text="Timer, namunaviy savollar, javoblar va tezkor tahlil bilan imtihon muhitini sinab ko‘ring." />
        <GlassCard className="mb-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow"><Timer className="h-8 w-8" /></div>
              <div>
                <Pill>Imtihon timeri</Pill>
                <p className="mt-2 font-mono text-4xl font-black text-foreground">{formatTimer(examTimer)}</p>
                <p className="text-sm font-bold text-muted-foreground">{examRunning ? "Imtihon davom etmoqda — savollarni quyida yeching." : examTimer > 0 ? "Pauza qilingan" : "Boshlash uchun davomiylikni tanlang"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="premium-button rounded-2xl px-4 py-3 text-sm font-black" onClick={() => startExam(15)}>15 daqiqa</button>
              <button className="premium-button rounded-2xl px-4 py-3 text-sm font-black" onClick={() => startExam(45)}>45 daqiqa</button>
              <button className="premium-button rounded-2xl px-4 py-3 text-sm font-black" onClick={() => startExam(90)}>90 daqiqa</button>
              {examRunning ? (
                <button className="rounded-2xl border border-border px-4 py-3 text-sm font-black text-foreground hover:bg-accent" onClick={() => setExamRunning(false)}>Pauza</button>
              ) : examTimer > 0 ? (
                <button className="rounded-2xl border border-border px-4 py-3 text-sm font-black text-foreground hover:bg-accent" onClick={() => setExamRunning(true)}>Davom etish</button>
              ) : null}
              <button className="rounded-2xl border border-border px-4 py-3 text-sm font-black text-foreground hover:bg-accent" onClick={() => { setExamRunning(false); setExamTimer(0); }}>Reset</button>
            </div>
          </div>
        </GlassCard>
        <div className="grid gap-5 lg:grid-cols-3">
          {["Namunaviy testlar", "Real exam simulyatsiya", "Natija analizi"].map((title, index) => (
            <GlassCard key={title}>
              <Timer className="mb-4 h-8 w-8 text-primary" />
              <h3 className="text-2xl font-black text-foreground">{title}</h3>
              <p className="mt-3 text-muted-foreground">{index === 1 ? "90 daqiqalik timer va bloklar bo‘yicha test muhiti." : "Savollar, javoblar va kuchli/kuchsiz tomonlar tahlili."}</p>
              <button className="mt-5 rounded-2xl border border-border px-4 py-2 font-black text-foreground hover:bg-accent" onClick={() => index === 1 ? startExam(90) : completeActivity(35)}>{index === 1 ? "Real exam boshlash" : "Boshlash +35 coin"}</button>
            </GlassCard>
          ))}
        </div>
        <TestRunner testId="sat-otm" questions={satOtmQuestions} />
      </section>
    );
  };

  const QuestionGrid = () => (
    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sampleQuestions.map((q) => (
        <div key={q.subject} className="rounded-3xl border border-border/60 bg-card/70 p-5">
          <Pill>{q.subject}</Pill>
          <p className="mt-4 font-black text-foreground">{q.question}</p>
          <p className="mt-3 text-sm text-muted-foreground">To‘g‘ri javob: {q.answer}</p>
        </div>
      ))}
    </div>
  );

  const renderCourses = () => (
    <section>
      <SectionTitle kicker="Kurslar" title="Fanlar bo‘yicha video, PDF va sinov testlari" text="Kurslarda qatnashing, progressni oshiring va coinlar bilan rag‘bat oling." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject, index) => (
          <GlassCard key={subject}>
            <BookOpen className="mb-4 h-7 w-7 text-primary" />
            <h3 className="text-2xl font-black text-foreground">{subject}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Video darslik', 'PDF darslik', 'Qo‘llanma', 'Sinov testlari'].map((tag) => <Pill key={tag}>{tag}</Pill>)}
            </div>
            <ProgressBar value={35 + index * 7} />
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="premium-button rounded-2xl px-4 py-2 text-sm font-black" onClick={() => completeActivity(20)}>Kursga kirish +20 coin</button>
              <FavoriteButton item={{ id: `course-${subject}`, title: `${subject} kursi`, category: "Kurs", section: "courses" }} />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );

  const renderFreeTests = () => (
    <section>
      <SectionTitle kicker="Free Testlar" title="SAT, OTM, quiz va fan testlari" text="Bepul sinovlar SAT, OTM, IELTS mini mock va fanlar bo‘yicha namunaviy savollar bilan to‘ldirildi." />
      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {freeTestPacks.map((pack) => (
          <GlassCard key={pack.title}>
            <Timer className="mb-4 h-8 w-8 text-primary" />
            <h3 className="text-xl font-black text-foreground">{pack.title}</h3>
            <p className="mt-2 text-sm font-bold text-muted-foreground">{pack.meta}</p>
            <div className="mt-4 flex flex-wrap gap-2">{pack.items.map((item) => <Pill key={item}>{item}</Pill>)}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="premium-button rounded-2xl px-4 py-3 text-sm font-black" onClick={() => completeActivity(30)}>Bepul boshlash +30 coin</button>
              <FavoriteButton item={{ id: `test-pack-${pack.title}`, title: pack.title, category: "Free test", section: "free-tests" }} />
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <GlassCard key={subject}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-foreground">{subject}</h3>
                <p className="mt-2 text-sm text-muted-foreground">15:00 timer • 20 savol • tezkor natija</p>
              </div>
              <Timer className="text-primary" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {['Quiz', 'Fan testlari', 'Full exam', 'Random'].map((item) => (
                <button
                  key={item}
                  onClick={() => { setActiveQuiz({ subject, mode: item }); setSubmittedTests((current) => ({ ...current, [`quiz-${subject}-${item}`]: false })); }}
                  className={`rounded-2xl px-3 py-3 text-sm font-black hover:bg-accent ${activeQuiz?.subject === subject && activeQuiz?.mode === item ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-secondary-foreground"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-4"><FavoriteButton item={{ id: `subject-test-${subject}`, title: `${subject} free testi`, category: "Fan testi", section: "free-tests" }} /></div>
          </GlassCard>
        ))}
      </div>
      {activeQuiz && quizBank[activeQuiz.subject] && (() => {
        const meta = quizModeMeta[activeQuiz.mode];
        const bank = quizBank[activeQuiz.subject];
        const count = Math.min(meta.count, bank.length);
        const questions = (activeQuiz.mode === "Random" ? [...bank].sort(() => 0.5 - Math.random()) : bank).slice(0, count).map((q) => ({ subject: `${activeQuiz.subject} ${activeQuiz.mode}`, question: q.question, answer: q.answer }));
        const testId = `quiz-${activeQuiz.subject}-${activeQuiz.mode}`;
        return (
          <div className="mt-6">
            <GlassCard>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Pill>{meta.label}</Pill>
                  <h3 className="mt-3 text-2xl font-black text-foreground">{activeQuiz.subject} — {activeQuiz.mode}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Javoblarni yozing va tekshirish tugmasini bosing.</p>
                </div>
                <button className="rounded-2xl border border-border px-4 py-2 text-sm font-black text-foreground hover:bg-accent" onClick={() => setActiveQuiz(null)}>Yopish</button>
              </div>
              <TestRunner testId={testId} questions={questions} />
            </GlassCard>
          </div>
        );
      })()}
      <TestRunner testId="free-subjects" questions={sampleQuestions} />
      <TestRunner testId="free-sat-otm" questions={satOtmQuestions} />
    </section>
  );

  const renderLevel = () => (
    <section>
      <SectionTitle kicker="Daraja aniqlash" title="IELTS, Multi-level va Milliy sertifikat testlari" text="Birinchi sinab ko‘rish bepul. Keyingi foydalanish uchun premium xarid talab qilinadi." />
      <div className="grid gap-5 lg:grid-cols-3">
        {levelTests.map((test) => (
          <GlassCard key={test.title} className={activeLevelTest === test.title ? "ring-2 ring-primary" : ""}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-3xl font-black text-foreground">{test.title}</h3>
              <Pill>1 marta bepul</Pill>
            </div>
            <p className="mt-2 text-2xl font-black text-primary">{test.price}</p>
            <p className="mt-1 text-sm font-bold text-muted-foreground">{test.accent}</p>
            <div className="my-5 flex flex-wrap gap-2">{test.items.map((item) => <Pill key={item}>{item}</Pill>)}</div>
            <div className="grid grid-cols-6 gap-1">
              {levels.map((level) => <span key={level} className="rounded-xl bg-secondary/70 py-2 text-center text-xs font-black text-secondary-foreground">{level}</span>)}
            </div>
            <button className="mt-5 premium-button w-full rounded-2xl px-4 py-3 font-black" onClick={() => { setActiveLevelTest(test.title); completeActivity(50); }}>{activeLevelTest === test.title ? "Test ochilgan" : "Testni boshlash +50 coin"}</button>
          </GlassCard>
        ))}
      </div>
      {activeLevelTest && levelTestQuestions[activeLevelTest] && (
        <div className="mt-6">
          <GlassCard>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Pill>Daraja testi</Pill>
                <h3 className="mt-3 text-2xl font-black text-foreground">{activeLevelTest} — bepul sinov</h3>
                <p className="mt-1 text-sm text-muted-foreground">Javoblarni yozing va tekshirish tugmasini bosing. Natijaga qarab darajangiz aniqlanadi.</p>
              </div>
              <button className="rounded-2xl border border-border px-4 py-2 text-sm font-black text-foreground hover:bg-accent" onClick={() => setActiveLevelTest(null)}>Yopish</button>
            </div>
            {(() => {
              const questions = levelTestQuestions[activeLevelTest];
              const testId = `level-${activeLevelTest}`;
              const submitted = submittedTests[testId];
              const score = getTestScore(testId, questions);
              const ratio = score / questions.length;
              const levelLabel = !submitted ? "" : ratio >= 0.9 ? "A+ • Mukammal" : ratio >= 0.7 ? "A • Yuqori" : ratio >= 0.5 ? "B • O‘rta" : ratio >= 0.3 ? "C • Boshlang‘ich" : "Boshlang‘ich darajadan past";
              return (
                <>
                  <TestRunner testId={testId} questions={questions} />
                  {submitted && <p className="mt-4 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-center text-base font-black text-primary">Sizning darajangiz: {levelLabel} ({score}/{questions.length})</p>}
                </>
              );
            })()}
          </GlassCard>
        </div>
      )}
    </section>
  );

  const renderModels = () => (
    <section>
      <SectionTitle kicker="3D qo‘llanmalar" title="Biologiya, Kimyo, Fizika, Tarix va Geografiya modellari" text="Fayldagi Sketchfab 3D modellar fanlar bo‘yicha joylashtirildi." />
      <div className="mb-5 flex flex-wrap gap-2">
        {["Hammasi", ...science3d].map((subject) => (
          <button
            key={subject}
            className={`rounded-2xl border px-4 py-3 text-sm font-black transition-all ${active3dSubject === subject ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-border bg-secondary/50 text-foreground hover:bg-accent"}`}
            onClick={() => setActive3dSubject(subject)}
          >
            {subject}
          </button>
        ))}
      </div>
      <GlassCard>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-black text-foreground">{active3dSubject === "Hammasi" ? "Barcha 3D qo‘llanmalar" : `${active3dSubject} 3D qo‘llanmalari`}</h3>
          <Pill>{visible3dModels.length} ta model</Pill>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible3dModels.map(({ subject, url, index }) => (
            <div key={url} className="overflow-hidden rounded-3xl border border-border/60 bg-secondary/40">
              <iframe src={getSketchfabEmbed(url)} title={`${subject} 3D model ${index + 1}`} className="h-64 w-full" allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen />
              <div className="p-4">
                <Pill>{subject}</Pill>
                <p className="mt-3 font-black text-foreground">{subject} modeli {index + 1}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">Shu oynada ko‘rish <ChevronRight className="h-4 w-4" /></p>
                <div className="mt-4"><FavoriteButton item={{ id: `model-${subject}-${index}`, title: `${subject} modeli ${index + 1}`, category: "3D qo‘llanma", section: "models" }} /></div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );

  const renderLibrary = () => (
    <section>
      <SectionTitle kicker="Kutubxona" title="Badiiy asarlar va jahon adabiyoti" text="Har bir kitob uchun PDF, audio va film formatlari namuna sifatida joylashtirildi." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {libraryBooks.map((book) => (
          <GlassCard key={book.title}>
            <div className="mb-5 overflow-hidden rounded-3xl border border-border/60 bg-primary/15 shadow-glow">
              <div className="grid aspect-[3/4] place-items-center bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.34),transparent_34%),linear-gradient(145deg,hsl(var(--card)),hsl(var(--secondary)))] p-5 text-center">
                <div>
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-primary text-3xl font-black text-primary-foreground">{book.cover}</div>
                  <p className="text-xs font-black uppercase text-primary">{book.scene}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-foreground">{book.title}</h3>
                  <p className="mt-2 text-sm font-bold text-muted-foreground">{book.author}</p>
                </div>
              </div>
            </div>
            <Pill>{book.level}</Pill>
            <h3 className="mt-4 text-xl font-black text-foreground">{book.title}</h3>
            <p className="mt-1 text-sm font-bold text-muted-foreground">{book.author}</p>
            <div className="mt-4 flex flex-wrap gap-2">{book.formats.map((format) => <Pill key={format}>{format}</Pill>)}</div>
            <div className="mt-4"><FavoriteButton item={{ id: `book-${book.title}`, title: book.title, category: "Kitob", section: "library" }} /></div>
          </GlassCard>
        ))}
      </div>
    </section>
  );

  const renderCoinShop = () => {
    const buy = (title: string, price: number) => {
      if (purchasedItems[title]) { setShopMessage(`✓ "${title}" allaqachon ochilgan`); return; }
      if (coins < price) { setShopMessage(`Coin yetarli emas. Yana ${price - coins} coin kerak.`); return; }
      setCoins((current) => current - price);
      setPurchasedItems((current) => ({ ...current, [title]: true }));
      setShopMessage(`✓ "${title}" muvaffaqiyatli ochildi!`);
    };
    return (
      <section>
        <SectionTitle kicker="Coin do‘koni" title="Coin evaziga kontent va chegirmalar" text="Darslar, mock testlar va kitoblarga coin orqali chegirma oling." />
        <GlassCard className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><Coins className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">Joriy balans</p>
              <p className="text-2xl font-black text-foreground">{coins} coin</p>
            </div>
          </div>
          {shopMessage && <p className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-black text-primary">{shopMessage}</p>}
        </GlassCard>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {coinShopItems.map((item) => {
            const owned = purchasedItems[item.title];
            return (
              <GlassCard key={item.title} className={owned ? "ring-2 ring-primary" : ""}>
                <div className="mb-4 grid h-24 place-items-center rounded-3xl bg-primary/15 text-3xl font-black text-primary shadow-glow">{item.image}</div>
                <h3 className="text-xl font-black text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-2xl font-black text-primary">{item.price} coin</p>
                  <button
                    disabled={owned}
                    className={`rounded-2xl px-3 py-2 text-sm font-black ${owned ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-accent"}`}
                    onClick={() => buy(item.title, item.price)}
                  >
                    {owned ? "Ochilgan" : "Olish"}
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>
    );
  };

  const renderMarket = () => (
    <section>
      <SectionTitle kicker="Edu market" title="Qo‘llanmalar, test kitoblari va adabiyotlar" text="Fanlar bo‘yicha mavzulashtirilgan kitoblar va badiiy adabiyotlarni xarid qiling." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {marketItems.map((item) => (
          <GlassCard key={item.title}>
            <div className="mb-4 flex items-center gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-primary/15 text-2xl font-black text-primary shadow-glow">{item.image}</div>
              <div>
                <Pill>{item.category}</Pill>
                <h3 className="mt-3 text-2xl font-black text-foreground">{item.title}</h3>
              </div>
            </div>
            <p className="text-muted-foreground">{item.description}</p>
            <p className="mt-4 text-2xl font-black text-primary">{item.price}</p>
            <div className="mt-4"><FavoriteButton item={{ id: `market-${item.title}`, title: item.title, category: "Edu market", section: "market" }} /></div>
          </GlassCard>
        ))}
      </div>
    </section>
  );

  const renderRating = () => (
    <section>
      <SectionTitle kicker="Reyting" title="Top foydalanuvchilar" text="Natija, coin va test faolligi bo‘yicha demo reyting jadvali." />
      <GlassCard>
        {["Aslonbek", "Aziza", "Dildora", "Oybek", "Nazokat", "Rizamat"].map((name, index) => (
          <div key={name} className="flex items-center justify-between border-b border-border/50 py-4 last:border-b-0">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground font-black">{index + 1}</span><span className="font-black text-foreground">{name}</span></div>
            <span className="font-black text-primary">{980 - index * 73} ball</span>
          </div>
        ))}
      </GlassCard>
    </section>
  );

  const renderFavorites = () => (
    <section>
      <SectionTitle kicker="Sevimli" title="Saqlangan kontentlar" text="Kurs, test, kitob, 3D model va darslarni sevimlilarga qo‘shib, shu yerdan tez oching." />
      {favorites.length === 0 ? (
        <GlassCard className="text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h3 className="text-2xl font-black text-foreground">Hali sevimlilar yo‘q</h3>
          <p className="mt-2 text-muted-foreground">Kontentlardagi “Sevimli” tugmasini bosing — ular shu yerda yig‘iladi.</p>
        </GlassCard>
      ) : (
        <div className="space-y-5">
          {groupedFavorites.map((group, groupIndex) => (
            <GlassCard key={group.category}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <Pill>{groupIndex + 1}-toifa</Pill>
                  <h3 className="mt-3 text-2xl font-black text-foreground">{group.category}</h3>
                </div>
                <span className="rounded-2xl bg-primary/15 px-3 py-2 text-sm font-black text-primary">{group.items.length} ta</span>
              </div>
              <div className="space-y-3">
                {group.items.map((item, index) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border/60 bg-secondary/40 p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground font-black">{index + 1}</span>
                      <div><h4 className="font-black text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">Saqlangan sevimli</p></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="premium-button rounded-2xl px-4 py-2 text-sm font-black" onClick={() => setActive(item.section)}>Ochish</button>
                      <button className="rounded-2xl border border-border px-4 py-2 text-sm font-black text-foreground hover:bg-accent" onClick={() => toggleFavorite(item)}>Olib tashlash</button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </section>
  );

  const renderLessons = () => (
    <section>
      <SectionTitle kicker="Bepul darslar" title="Fanlar bo‘yicha YouTube video darslar" text="Fayldagi barcha video dars havolalari fanlar kesimida joylashtirildi." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {videos.map(([subject, url]) => (
          <GlassCard key={subject}>
            <div className="mb-4 overflow-hidden rounded-3xl border border-border/60 bg-secondary/40">
              <iframe src={getYoutubeEmbed(url)} title={`${subject} bepul dars`} className="aspect-video w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <PlayCircle className="mb-3 h-8 w-8 text-primary" />
            <h3 className="text-2xl font-black text-foreground">{subject}</h3>
            <p className="mt-2 text-sm text-muted-foreground">Video dars shu oynaning ichida ochiladi.</p>
            <div className="mt-4"><FavoriteButton item={{ id: `lesson-${subject}`, title: `${subject} bepul darsi`, category: "Bepul dars", section: "lessons" }} /></div>
          </GlassCard>
        ))}
      </div>
    </section>
  );

  const renderPremium = () => {
    const plans = [
      { name: "Boshlang‘ich", duration: "1 oylik", price: "49 000", monthly: "49 000", badge: "Sinab ko‘rish", features: ["Premium testlar", "3D qo‘llanmalar", "Bepul darslar", "Kutubxona kirishi"] },
      { name: "Tavsiya etiladi", duration: "3 oylik", price: "129 000", monthly: "43 000", badge: "Eng mashhur • -12%", features: ["Barcha 1 oylik imkoniyatlar", "Mock testlar va tahlil", "Edu market chegirmalari", "Shaxsiy o‘qish rejasi"] },
      { name: "Maksimal", duration: "12 oylik", price: "399 000", monthly: "33 250", badge: "Eng tejamli • -32%", features: ["Barcha 3 oylik imkoniyatlar", "Premium 3D atlas", "Mentor maslahatlari", "Sertifikat va analitika"] },
    ];
    const benefits = [
      { icon: ShieldCheck, title: "Cheksiz testlar", text: "SAT, OTM, IELTS va daraja testlariga to‘liq kirish." },
      { icon: Boxes, title: "3D qo‘llanmalar", text: "Biologiya, kimyo, fizika va tarix bo‘yicha premium modellar." },
      { icon: Brain, title: "Natija tahlili", text: "Kuchli/kuchsiz tomonlarni avtomatik aniqlash." },
      { icon: Crown, title: "Premium qo‘llab-quvvatlash", text: "Mentor va ustozlardan tezkor javob." },
    ];

    return (
      <section>
        <SectionTitle kicker="Premium xizmatlar" title="Bilimingizni keyingi bosqichga olib chiqing" text="3 ta tarif: 1 oylik, 3 oylik va 12 oylik. Har biri kengaytirilgan testlar, 3D qo‘llanmalar va shaxsiy tahlil bilan keladi." />

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const isPopular = index === 1;
            return (
              <GlassCard
                key={plan.duration}
                className={`relative overflow-hidden ${isPopular ? "ring-2 ring-primary shadow-glow lg:-translate-y-2" : ""}`}
              >
                {isPopular && <div className="absolute inset-x-0 top-0 bg-primary py-2 text-center text-xs font-black uppercase tracking-wider text-primary-foreground">⭐ Eng mashhur tanlov</div>}
                <div className={isPopular ? "pt-8" : ""}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary"><Crown className="h-7 w-7" /></div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-black text-primary">{plan.badge}</span>
                  </div>
                  <p className="mt-5 text-sm font-black uppercase tracking-wide text-primary">{plan.name}</p>
                  <h3 className="mt-1 text-3xl font-black text-foreground">{plan.duration}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <p className="text-4xl font-black text-foreground">{plan.price}</p>
                    <p className="text-sm font-bold text-muted-foreground">so‘m</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-muted-foreground">≈ {plan.monthly} so‘m / oy</p>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-bold text-foreground">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><ShieldCheck className="h-3 w-3" /></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={`mt-7 w-full rounded-2xl px-4 py-3 text-sm font-black ${isPopular ? "premium-button" : "border border-border bg-secondary/60 text-foreground hover:bg-accent"}`} onClick={() => completeActivity(75)}>Tarifni tanlash +75 coin</button>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <GlassCard key={title}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-lg font-black text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Pill>Kafolat</Pill>
              <h3 className="mt-3 text-2xl font-black text-foreground">7 kun ichida pulni qaytarish kafolati</h3>
              <p className="mt-2 text-sm text-muted-foreground">Premium tarifdan foydalanib ko‘ring — yoqmasa, pulingiz to‘liq qaytariladi.</p>
            </div>
            <button className="premium-button rounded-2xl px-6 py-3 text-sm font-black" onClick={() => setActive("reviews")}>Foydalanuvchilar fikri</button>
          </div>
        </GlassCard>
      </section>
    );
  };

  const renderReviews = () => {
    const reviewItems = ["Bepul darslar", "Kutubxona", "3D qo‘llanmalar", "Edu market", "Free testlar"];
    const totalRated = reviewItems.filter((item) => ratings[item]).length;
    const avgRating = totalRated > 0 ? (reviewItems.reduce((sum, item) => sum + (ratings[item] || 0), 0) / totalRated).toFixed(1) : "—";
    return (
      <section>
        <SectionTitle kicker="Baholash" title="Xizmatlarni 1 dan 5 gacha baholang" text="Baholashlar ilovani yaxshilash uchun demo ko‘rinishda saqlanadi." />
        <GlassCard className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Pill>Sizning baholashlaringiz</Pill>
            <p className="mt-2 text-3xl font-black text-foreground">O‘rtacha: <span className="text-primary">{avgRating}</span> / 5</p>
            <p className="text-sm font-bold text-muted-foreground">{totalRated}/{reviewItems.length} ta xizmat baholandi</p>
          </div>
          <button className="premium-button rounded-2xl px-5 py-3 font-black" onClick={() => { if (totalRated === 0) return; setReviewSaved(true); completeActivity(20); setTimeout(() => setReviewSaved(false), 3000); }}>Baholashni saqlash +20 coin</button>
        </GlassCard>
        {reviewSaved && <div className="mb-5 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-black text-primary">✓ Baholashlaringiz qabul qilindi. Rahmat!</div>}
        <GlassCard>
          {reviewItems.map((item) => (
            <div key={item} className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 py-4 last:border-b-0">
              <p className="font-black text-foreground">{item}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((score) => <button key={score} onClick={() => setRatings({ ...ratings, [item]: score })} className={`rounded-xl p-2 ${score <= (ratings[item] || 0) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}><Star className="h-4 w-4" /></button>)}
              </div>
            </div>
          ))}
        </GlassCard>
      </section>
    );
  };

  const handleJobCertificate = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setJobCertificate(URL.createObjectURL(file));
  };

  const submitJobApplication = (event: React.FormEvent) => {
    event.preventDefault();
    setJobError("");
    if (jobName.trim().length < 2) { setJobError("Ism-familiyangizni to‘liq kiriting."); return; }
    if (!/^[+\d\s\-()]{7,}$/.test(jobPhone.trim())) { setJobError("To‘g‘ri telefon raqam kiriting."); return; }
    if (jobExperience.trim().length < 10) { setJobError("Tajribangiz haqida qisqacha yozing (kamida 10 belgi)."); return; }
    if (!jobCertificate) { setJobError("Sertifikat rasmini yuklash majburiy."); return; }
    setJobSent(true);
    completeActivity(40);
    setTimeout(() => {
      setJobSent(false);
      setJobName(""); setJobPhone(""); setJobExperience(""); setJobCertificate(null);
    }, 4000);
  };

  const renderJobs = () => (
    <section>
      <SectionTitle
        kicker="Ish o‘rinlari"
        title="EduSAT Academy jamoasiga qo‘shiling"
        text="Tajribali o‘qituvchilarni mentor sifatida ishga taklif qilamiz. Ariza qoldirish uchun maxsus sertifikatingiz rasmini biriktiring."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <GlassCard>
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow"><Briefcase className="h-7 w-7" /></div>
              <div>
                <Pill>Bo‘sh ish o‘rni</Pill>
                <h3 className="mt-2 text-2xl font-black text-foreground">O‘qituvchi / Mentor</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Fan o‘qituvchilari, IELTS/SAT mentorlar va Multi-level tayyorlovchi mutaxassislarni jamoamizga qo‘shilishga taklif qilamiz. Onlayn va aralash ish formati mavjud.
            </p>
            <div className="mt-5 grid gap-2 text-sm font-bold text-foreground">
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Maxsus sertifikat / diplom talab qilinadi</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Pedagogik tajriba — kamida 1 yil</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Onlayn dars o‘tish ko‘nikmasi</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Jamoa bilan ishlay olish</p>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="text-xl font-black text-foreground">Imtiyozlar</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                { t: "Raqobatbardosh maosh", d: "Tajribaga mos to‘lov tizimi" },
                { t: "Moslashuvchan jadval", d: "O‘zingizga qulay vaqtda dars" },
                { t: "Premium platforma", d: "Barcha materiallarga kirish" },
                { t: "Jamoa va o‘sish", d: "Treninglar va sertifikatlar" },
              ].map((b) => (
                <div key={b.t} className="rounded-2xl border border-border/60 bg-secondary/40 p-4">
                  <p className="font-black text-foreground">{b.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <h3 className="text-2xl font-black text-foreground">Ariza qoldirish</h3>
          <p className="mt-2 text-sm text-muted-foreground">Quyidagi maydonlarni to‘ldiring va sertifikatingiz rasmini yuklang.</p>
          <form className="mt-5 space-y-3" onSubmit={submitJobApplication}>
            <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Ism Familiya" value={jobName} onChange={(e) => setJobName(e.target.value)} />
            <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Telefon raqam (+998...)" value={jobPhone} onChange={(e) => setJobPhone(e.target.value)} />
            <select className="h-12 w-full rounded-2xl border border-input bg-card px-4 font-bold text-foreground outline-none focus:ring-2 focus:ring-ring" value={jobSubject} onChange={(e) => setJobSubject(e.target.value)}>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="IELTS">IELTS</option>
              <option value="SAT">SAT</option>
              <option value="Multi-level">Multi-level</option>
            </select>
            <textarea className="min-h-28 w-full resize-none rounded-2xl border border-input bg-card px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Pedagogik tajribangiz haqida qisqacha yozing" value={jobExperience} onChange={(e) => setJobExperience(e.target.value)} />

            <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-4">
              <p className="text-sm font-black text-foreground">Sertifikat rasmi (majburiy)</p>
              <p className="mt-1 text-xs text-muted-foreground">Diplom yoki maxsus sertifikatingiz rasmini yuklang (JPG/PNG).</p>
              <input type="file" accept="image/*" className="mt-3 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-2xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-black file:text-primary-foreground hover:file:bg-primary/90" onChange={handleJobCertificate} />
              {jobCertificate && (
                <div className="mt-4">
                  <img src={jobCertificate} alt="Sertifikat" className="max-h-56 w-full rounded-2xl border border-border/60 object-contain" />
                  <button type="button" className="mt-3 rounded-2xl border border-border px-3 py-2 text-xs font-black text-foreground hover:bg-accent" onClick={() => setJobCertificate(null)}>Rasmni o‘chirish</button>
                </div>
              )}
            </div>

            {jobError && <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">{jobError}</p>}
            {jobSent && <p className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-black text-primary">✓ Arizangiz qabul qilindi! Tez orada siz bilan bog‘lanamiz. +40 coin</p>}

            <button type="submit" className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-black"><Send className="h-4 w-4" /> Arizani yuborish</button>
          </form>
        </GlassCard>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section>
      <SectionTitle kicker="Ilova haqida" title="EduSAT Academy — ishonchli ta’lim hamrohingiz" text="SAT, OTM va xalqaro imtihonlarga tayyorgarlik uchun yaratilgan zamonaviy ta’lim ilovasi." />
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <GlassCard className="overflow-hidden">
            <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
                <Award className="h-11 w-11" />
              </div>
              <div>
                <Pill>Premium ta’lim platformasi</Pill>
                <h3 className="mt-4 text-3xl font-black leading-tight text-foreground">Bilim, test va 3D qo‘llanmalar bitta joyda</h3>
                <p className="mt-3 leading-7 text-muted-foreground">EduSAT Academy foydalanuvchilarga video darslar, testlar, kutubxona, 3D qo‘llanmalar va real imtihon simulyatsiyalari orqali bilimini bosqichma-bosqich mustahkamlashga yordam beradi.</p>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-3">
            {["1. Maqsad", "2. O‘rganish", "3. Natija"].map((title, index) => (
              <GlassCard key={title}>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-lg font-black text-primary">{index + 1}</div>
                <h3 className="text-xl font-black text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{index === 0 ? "Aniq reja va daraja bo‘yicha yo‘nalish tanlanadi." : index === 1 ? "Darslar, kitoblar va 3D vizual qo‘llanmalar bilan mustahkamlanadi." : "Testlar va reyting orqali o‘sish kuzatib boriladi."}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard>
            <h3 className="mb-5 text-2xl font-black text-foreground">Minnatdorchilik</h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{mentors.map((person) => <PersonCard key={person.name} {...person} />)}</div>
          </GlassCard>
          <GlassCard>
            <h3 className="mb-5 text-2xl font-black text-foreground">Jamoa A’zolari</h3>
            <div className="grid gap-4 md:grid-cols-2">{team.map((person) => <PersonCard key={person.name} {...person} />)}</div>
          </GlassCard>
        </div>

        <div className="space-y-5">
          <GlassCard>
            <MessageCircle className="mb-4 h-9 w-9 text-primary" />
            <h3 className="text-2xl font-black text-foreground">Fikr va taklif qoldirish</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Ilovani yaxshilash uchun taklifingizni yozib qoldiring.</p>
            <form className="mt-5 space-y-3" onSubmit={(event) => { event.preventDefault(); if (feedbackText.trim()) { setFeedbackSent(true); setFeedbackText(""); } }}>
              <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Ismingiz" value={feedbackName} onChange={(event) => setFeedbackName(event.target.value)} />
              <textarea className="min-h-32 w-full resize-none rounded-2xl border border-input bg-card px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Fikr yoki taklifingizni yozing..." value={feedbackText} onChange={(event) => setFeedbackText(event.target.value)} />
              {feedbackSent && <p className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold text-primary">Taklifingiz qabul qilindi. Rahmat!</p>}
              <button type="submit" className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-black"><Send className="h-4 w-4" /> Yuborish</button>
            </form>
          </GlassCard>
          <GlassCard>
            <h3 className="text-2xl font-black text-foreground">Aloqa</h3>
            <div className="mt-4 space-y-3 text-sm font-bold text-muted-foreground">
              <p>Navoiy, O‘zbekiston</p>
              <p>Telegram: @ASLONBEK_MUXTOROV</p>
              <p>BIOSTEP_EDUCATION_bot</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );

  const PersonCard = ({ name, role, image, link }: { name: string; role: string; image: string; link?: string }) => (
    <div className="rounded-3xl border border-border/60 bg-secondary/40 p-5 text-center">
      <img src={image} alt={`${name} rasmi`} className="mx-auto h-32 w-32 rounded-full border-4 border-primary/30 object-cover shadow-glow" />
      <p className="mt-4 text-sm font-bold text-primary">{role}</p>
      <h4 className="mt-1 text-lg font-black text-foreground">{name}</h4>
      {link && <a href={link} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-black text-primary">Telegram orqali bog‘lanish</a>}
    </div>
  );

  const content = {
    home: renderHome,
    profile: renderProfile,
    sat: renderSat,
    courses: renderCourses,
    "free-tests": renderFreeTests,
    level: renderLevel,
    models: renderModels,
    library: renderLibrary,
    "coin-shop": renderCoinShop,
    market: renderMarket,
    rating: renderRating,
    favorites: renderFavorites,
    lessons: renderLessons,
    premium: renderPremium,
    reviews: renderReviews,
    jobs: renderJobs,
    about: renderAbout,
  }[active];

  const authModal = authOpen ? (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl">
      <form className="glass-panel w-full max-w-md rounded-3xl p-6 shadow-premium" onSubmit={(event) => { event.preventDefault(); handleAuthSubmit(); }}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-foreground">{authMode === "login" ? t.login : t.register}</h3>
          <button type="button" className="rounded-2xl p-2 hover:bg-accent" onClick={() => setAuthOpen(false)}><X /></button>
        </div>
        <div className="mt-5 space-y-3 text-foreground">
          {authMode === "register" && <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Ismingiz" value={authName} onChange={(e) => setAuthName(e.target.value)} autoComplete="name" />}
          <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Email" type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} autoComplete="email" />
          <input className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="Parol" type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} autoComplete={authMode === "login" ? "current-password" : "new-password"} />
          {authError && <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">{authError}</p>}
          <button type="submit" className="premium-button w-full rounded-2xl py-3 font-black">{authMode === "login" ? "Kirish" : "Ro‘yxatdan o‘tish"} +100 coin</button>
        </div>
        <button type="button" className="mt-4 text-sm font-bold text-primary" onClick={() => { setAuthError(""); setAuthMode(authMode === "login" ? "register" : "login"); }}>{authMode === "login" ? "Hisob yo‘qmi? Ro‘yxatdan o‘ting" : "Hisobingiz bormi? Kirish"}</button>
      </form>
    </div>
  ) : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-premium-radial" />
      <div className="flex min-h-screen gap-4 p-3">
        {nav}
        {sidebarOpen && <button className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Menyuni yopish" />}
        <div className="min-w-0 flex-1">
          <header className="glass-panel sticky top-3 z-20 mb-5 flex items-center justify-between gap-3 rounded-3xl px-4 py-3 shadow-premium">
            <div className="flex items-center gap-3">
              <button
                className="rounded-2xl p-3 hover:bg-accent"
                onClick={() => {
                  // Toggle: hide if currently visible, otherwise show.
                  const visible = sidebarOpen || !sidebarHidden;
                  if (visible) { setSidebarOpen(false); setSidebarHidden(true); }
                  else { setSidebarOpen(true); setSidebarHidden(false); }
                }}
                aria-label="Menyuni ochish/yopish"
              >
                <Menu />
              </button>
              <div>
                <p className="text-xs font-black uppercase text-primary">{sections.find((s) => s.id === active)?.label}</p>
                <p className="hidden text-sm text-muted-foreground sm:block">Bilim, test, 3D qo‘llanma va premium tayyorgarlik markazi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-2xl border border-border bg-secondary/50 px-3 py-2 font-black text-foreground sm:flex"><Coins className="h-4 w-4 text-primary" />{coins}</div>
              <button className="rounded-2xl p-3 hover:bg-accent" onClick={() => setDark(!dark)} aria-label="Theme almashtirish">{dark ? <Sun /> : <Moon />}</button>
              <div className="relative">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-border bg-secondary/50 px-3 py-3 font-black text-foreground hover:bg-accent" onClick={() => setLangOpen(!langOpen)} aria-label="Til tanlash"><Languages className="h-5 w-5" /><span className="text-xs uppercase">{lang}</span></button>
                {langOpen && <div className="absolute right-0 top-14 z-40 w-40 rounded-3xl border border-border bg-card/95 p-2 shadow-premium backdrop-blur-xl">{languageOptions.map((option) => <button key={option.code} className={`w-full rounded-2xl px-3 py-2 text-left text-sm font-black ${lang === option.code ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"}`} onClick={() => { setLang(option.code); setLangOpen(false); }}>{option.label}</button>)}</div>}
              </div>
              <button className="hidden rounded-2xl bg-primary px-4 py-3 font-black text-primary-foreground md:inline-flex" onClick={() => { if (isAuthenticated) { setActive("profile"); } else { setAuthMode("register"); setAuthOpen(true); } }}><LogIn className="mr-2 h-4 w-4" />{isAuthenticated ? "Profil" : t.register}</button>
              <button onClick={() => { if (isAuthenticated) { setActive("profile"); } else { setAuthMode("register"); setAuthOpen(true); } }} aria-label="Profilga o‘tish"><AvatarBlock size="sm" /></button>
            </div>
          </header>
          <div className="pb-8">{content()}</div>
        </div>
      </div>
      {authModal}
      <button className="fixed bottom-4 right-4 z-30 rounded-3xl bg-primary px-5 py-4 font-black text-primary-foreground shadow-glow md:hidden" onClick={() => { setAuthMode("login"); setAuthOpen(true); }}><Lock className="h-5 w-5" /></button>
    </main>
  );
};

export default Index;
