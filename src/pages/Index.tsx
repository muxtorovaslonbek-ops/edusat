import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Boxes,
  Brain,
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
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const todayQuote = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return quotes[day % quotes.length];
  }, []);

  const t = translations[lang];
  const displayName = userName.trim() || t.guest;
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
    const email = authEmail.trim();
    if (authMode === "login" && !email && !authPassword) {
      setUserName("Foydalanuvchi");
      setProfileName("Foydalanuvchi");
      setIsAuthenticated(true);
      setActive("profile");
      setAuthError("");
      setAuthOpen(false);
      completeActivity(50);
      return;
    }
    if (authMode === "register" && name.length < 2) {
      setAuthError("Ro‘yxatdan o‘tish uchun ismni kiriting.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || authPassword.length < 6) {
      setAuthError("To‘g‘ri email va kamida 6 belgili parol kiriting.");
      return;
    }
    const nextName = name || email.split("@")[0] || "Foydalanuvchi";
    setUserName(nextName);
    setProfileName(nextName);
    setProfileEmail(email);
    setIsAuthenticated(true);
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

  const nav = (
    <aside className="glass-panel fixed inset-y-3 left-3 z-40 flex w-[min(84vw,320px)] flex-col rounded-3xl p-4 shadow-premium transition-transform duration-300 lg:sticky lg:top-3 lg:h-[calc(100vh-1.5rem)] lg:w-80 lg:translate-x-0 data-[open=false]:-translate-x-[110%]" data-open={sidebarOpen}>
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
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <GlassCard className="text-center">
          <img src={avatar || aslonbekImg} alt="Profil rasmi" className="mx-auto h-32 w-32 rounded-full border-4 border-primary/30 object-cover shadow-glow" />
          <h3 className="mt-4 text-2xl font-black text-foreground">{displayName}</h3>
          <p className="text-muted-foreground">EduSAT Academy foydalanuvchisi</p>
          <label className="mt-5 inline-flex cursor-pointer rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground">
            Rasmni tahrirlash
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </label>
          <button className="mt-3 w-full rounded-2xl border border-border px-5 py-3 text-sm font-black text-foreground hover:bg-accent" onClick={() => { setIsAuthenticated(false); setUserName("Mehmon"); setProfileName("Mehmon"); setAuthEmail(""); setAuthPassword(""); setActive("home"); }}>Profildan chiqish</button>
        </GlassCard>
        <GlassCard>
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

  const renderSat = () => (
    <section>
      <SectionTitle kicker="SAT/OTM" title="Real exam simulyatsiya va natija analizi" text="Timer, namunaviy savollar, javoblar va tezkor tahlil bilan imtihon muhitini sinab ko‘ring." />
      <div className="grid gap-5 lg:grid-cols-3">
        {["Namunaviy testlar", "Real exam simulyatsiya", "Natija analizi"].map((title, index) => (
          <GlassCard key={title}>
            <Timer className="mb-4 h-8 w-8 text-primary" />
            <h3 className="text-2xl font-black text-foreground">{title}</h3>
            <p className="mt-3 text-muted-foreground">{index === 1 ? "90 daqiqalik timer va bloklar bo‘yicha test muhiti." : "Savollar, javoblar va kuchli/kuchsiz tomonlar tahlili."}</p>
            <button className="mt-5 rounded-2xl border border-border px-4 py-2 font-black text-foreground hover:bg-accent" onClick={() => completeActivity(35)}>Boshlash +35 coin</button>
          </GlassCard>
        ))}
      </div>
      <QuestionGrid />
    </section>
  );

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
              {['Quiz', 'Fan testlari', 'Full exam', 'Random'].map((item) => <button key={item} className="rounded-2xl bg-secondary/70 px-3 py-3 text-sm font-black text-secondary-foreground hover:bg-accent">{item}</button>)}
            </div>
            <div className="mt-4"><FavoriteButton item={{ id: `subject-test-${subject}`, title: `${subject} free testi`, category: "Fan testi", section: "free-tests" }} /></div>
          </GlassCard>
        ))}
      </div>
      <QuestionGrid />
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {satOtmQuestions.map((q) => (
          <div key={q.subject} className="rounded-3xl border border-border/60 bg-card/70 p-5">
            <Pill>{q.subject}</Pill>
            <p className="mt-4 font-black text-foreground">{q.question}</p>
            <p className="mt-3 text-sm text-muted-foreground">To‘g‘ri javob: {q.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderLevel = () => (
    <section>
      <SectionTitle kicker="Daraja aniqlash" title="IELTS, Multi-level va Milliy sertifikat testlari" text="Birinchi sinab ko‘rish bepul. Keyingi foydalanish uchun premium xarid talab qilinadi." />
      <div className="grid gap-5 lg:grid-cols-3">
        {levelTests.map((test) => (
          <GlassCard key={test.title}>
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
            <button className="mt-5 premium-button w-full rounded-2xl px-4 py-3 font-black" onClick={() => completeActivity(50)}>Testni boshlash +50 coin</button>
          </GlassCard>
        ))}
      </div>
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

  const renderCoinShop = () => (
    <section>
      <SectionTitle kicker="Coin do‘koni" title="Coin evaziga kontent va chegirmalar" text="Darslar, mock testlar va kitoblarga coin orqali chegirma oling." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {coinShopItems.map((item) => (
          <GlassCard key={item.title}>
            <div className="mb-4 grid h-24 place-items-center rounded-3xl bg-primary/15 text-3xl font-black text-primary shadow-glow">{item.image}</div>
            <h3 className="text-xl font-black text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-2xl font-black text-primary">{item.price} coin</p>
              <button className="rounded-2xl border border-border px-3 py-2 text-sm font-black text-foreground hover:bg-accent" onClick={() => setCoins((current) => Math.max(0, current - item.price))}>Olish</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );

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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((item) => (
            <GlassCard key={item.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Pill>{item.category}</Pill>
                  <h3 className="mt-4 text-2xl font-black text-foreground">{item.title}</h3>
                </div>
                <Heart className="h-7 w-7 shrink-0 text-primary" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="premium-button rounded-2xl px-4 py-2 text-sm font-black" onClick={() => setActive(item.section)}>Ochish</button>
                <button className="rounded-2xl border border-border px-4 py-2 text-sm font-black text-foreground hover:bg-accent" onClick={() => toggleFavorite(item)}>Olib tashlash</button>
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

  const renderPremium = () => (
    <section>
      <SectionTitle kicker="Premium" title="1, 3 va 12 oylik xizmat turlari" text="Kengaytirilgan testlar, 3D qo‘llanmalar, kutubxona va chuqur natija tahlilidan foydalaning." />
      <div className="grid gap-5 lg:grid-cols-3">
        {[["1 oylik", "49 000 so‘m"], ["3 oylik", "129 000 so‘m"], ["12 oylik", "399 000 so‘m"]].map(([plan, price]) => (
          <GlassCard key={plan} className={plan === "3 oylik" ? "ring-2 ring-primary" : ""}>
            <Crown className="mb-4 h-9 w-9 text-primary" />
            <h3 className="text-3xl font-black text-foreground">{plan}</h3>
            <p className="mt-2 text-2xl font-black text-primary">{price}</p>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              {['Premium testlar', '3D qo‘llanmalar', 'Natija analizi', 'Market chegirmalari'].map((item) => <li key={item} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />{item}</li>)}
            </ul>
          </GlassCard>
        ))}
      </div>
    </section>
  );

  const renderReviews = () => (
    <section>
      <SectionTitle kicker="Baholash" title="Xizmatlarni 1 dan 5 gacha baholang" text="Baholashlar ilovani yaxshilash uchun demo ko‘rinishda saqlanadi." />
      <GlassCard>
        {["Bepul darslar", "Kutubxona", "3D qo‘llanmalar", "Edu market", "Free testlar"].map((item) => (
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
              <button className="rounded-2xl p-3 hover:bg-accent lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Menyuni ochish"><Menu /></button>
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
              <button onClick={() => { if (isAuthenticated) { setActive("profile"); } else { setAuthMode("register"); setAuthOpen(true); } }} aria-label="Profilga o‘tish"><img src={avatar || aslonbekImg} alt="Profil" className="h-11 w-11 rounded-full border-2 border-primary/40 object-cover" /></button>
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
