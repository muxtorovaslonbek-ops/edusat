import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
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
  Mic,
  Moon,
  PlayCircle,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Timer,
  Trophy,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import introMusicSrc from "@/assets/intro-music.mp3";
import hayitovImg from "@/assets/edusat/hayitov.jpg";
import halimovaImg from "@/assets/edusat/halimova.jpg";
import jorayevaImg from "@/assets/edusat/jorayeva.jpg";
import oybekImg from "@/assets/edusat/oybek.jpg";
import aslonbekImg from "@/assets/edusat/aslonbek.jpg";
import azizaImg from "@/assets/edusat/aziza.jpg";
import bookOdamCover from "@/assets/books/odam-bolish-qiyin.jpg";
import bookIkkiEshikCover from "@/assets/books/ikki-eshik-orasi.jpg";
import bookKechaKunduzCover from "@/assets/books/kecha-va-kunduz.jpg";
import bookShahzodaCover from "@/assets/books/kichkina-shahzoda.jpg";
import bookBiologiyaCover from "@/assets/books/biologiya-super-qollanma.jpg";
import SpeakingTutor from "@/components/SpeakingTutor";
import ProctoredExam from "@/components/ProctoredExam";

const sections = [
  { id: "home", label: "Bosh sahifa", icon: Home },
  { id: "ai", label: "AI Yordamchi", icon: Sparkles },
  { id: "speaking", label: "AI Speaking", icon: Mic },
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
const languageOptions: Array<{ code: Lang; label: string; flag: string; iso: string }> = [
  { code: "uz", label: "O‘zbek", flag: "🇺🇿", iso: "uz" },
  { code: "en", label: "English", flag: "🇬🇧", iso: "gb" },
  { code: "ru", label: "Русский", flag: "🇷🇺", iso: "ru" },
];

const libraryBooks: Array<{
  title: string;
  author: string;
  level: string;
  formats: string[];
  cover: string;
  scene: string;
  image?: string;
  pdf?: string;
}> = [
  { title: "Odam bo‘lish qiyin", author: "O‘lmas Umarbekov", level: "Zamonaviy nasr", formats: ["PDF", "Tahlil"], cover: "OB", scene: "Hayotiy hikoya", image: bookOdamCover, pdf: "/books/odam-bolish-qiyin.pdf" },
  { title: "Ikki eshik orasi", author: "O‘tkir Hoshimov", level: "Roman", formats: ["PDF", "Tahlil"], cover: "IE", scene: "Oilaviy drama", image: bookIkkiEshikCover, pdf: "/books/ikki-eshik-orasi.pdf" },
  { title: "Kecha va kunduz", author: "Abdulhamid Cho‘lpon", level: "Klassik", formats: ["PDF", "Tahlil"], cover: "KK", scene: "Mustamlaka davri", image: bookKechaKunduzCover, pdf: "/books/kecha-va-kunduz.pdf" },
  { title: "Kichkina shahzoda", author: "Antuan de Sent-Ekzyuperi", level: "Jahon adabiyoti", formats: ["PDF", "Tahlil"], cover: "KS", scene: "Falsafiy ertak", image: bookShahzodaCover, pdf: "/books/kichkina-shahzoda.pdf" },
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

const marketItems: Array<{
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
  cover?: string;
  pdf?: string;
}> = [
  { title: "Biologiya super qo‘llanma", category: "Biologiya", price: "129 000 so‘m", image: "BQ", description: "Nazariya, amaliyot, testlar va batafsil izohlar bilan to‘liq qo‘llanma.", cover: bookBiologiyaCover, pdf: "/books/biologiya-super-qollanma.pdf" },
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

// Haftaning har bir kuni uchun shior (0 = Yakshanba ... 6 = Shanba)
const quotes: Array<[string, string, string]> = [
  ["Muvaffaqiyat – bu yakun emas, mag‘lubiyat – bu halokat emas. Eng muhimi – davom etish jasoratidir.", "Winston Churchill", "Yakshanba"],
  ["Kelajak bugun nima qilayotganingizga bog‘liq.", "Mahatma Gandhi", "Dushanba"],
  ["Orzularingizni amalga oshirish uchun eng yaxshi vaqt — hozir.", "Napoleon Hill", "Seshanba"],
  ["Men yutqazmadim. Men ishlamaydigan 10 000 usulni topdim.", "Thomas Edison", "Chorshanba"],
  ["Agar siz tez borishni xohlasangiz — yolg‘iz boring. Agar uzoqqa borishni xohlasangiz — birga boring.", "Afrika maqoli", "Payshanba"],
  ["Qiyinchiliklar ichida imkoniyat yashirinadi.", "Albert Einstein", "Juma"],
  ["Bilim — bu kuch. Har kuni bir qadam oldinga — bir umrlik yutuq.", "Francis Bacon", "Shanba"],
];

type QA = { subject: string; question: string; answer: string; options?: string[] };

const sampleQuestions: QA[] = [
  { subject: "Matematika", question: "Agar 3x + 7 = 22 bo‘lsa, x nechaga teng?", answer: "5", options: ["3", "5", "7", "15"] },
  { subject: "Ingliz tili", question: "Choose the correct form: She ___ to school every day.", answer: "goes", options: ["go", "goes", "going", "gone"] },
  { subject: "Rus tili", question: "Сколько падежей в русском языке?", answer: "6", options: ["5", "6", "7", "8"] },
  { subject: "Biologiya", question: "Fotosintez jarayonida qaysi gaz ajraladi?", answer: "Kislorod", options: ["Karbonat angidrid", "Azot", "Kislorod", "Vodorod"] },
  { subject: "Kimyo", question: "Suvning kimyoviy formulasi qanday?", answer: "H₂O", options: ["CO₂", "H₂O", "O₂", "NaCl"] },
  { subject: "Fizika", question: "Tok kuchi qaysi birlikda o‘lchanadi?", answer: "Amper", options: ["Volt", "Vatt", "Amper", "Om"] },
  { subject: "Tarix", question: "Amir Temur davlati poytaxti qaysi shahar bo‘lgan?", answer: "Samarqand", options: ["Toshkent", "Samarqand", "Buxoro", "Xiva"] },
];

const satOtmQuestions: QA[] = [
  { subject: "SAT Math", question: "If f(x)=2x²-3x+1, find f(3).", answer: "10", options: ["10", "12", "8", "16"] },
  { subject: "SAT Reading", question: "Main idea savolida avval nimani aniqlash kerak?", answer: "Matnning umumiy g‘oyasi", options: ["Muallif ismini", "Matnning umumiy g‘oyasi", "Birinchi gapni", "Oxirgi xulosani"] },
  { subject: "SAT Writing", question: "Choose the concise version: Due to the fact that it rained, the match was delayed.", answer: "Because it rained, the match was delayed.", options: ["Because it rained, the match was delayed.", "Owing to the fact of rain, match was delayed.", "Due to rain incident, match was delayed.", "By reason of the raining, match delayed."] },
  { subject: "SAT Algebra", question: "2x - 5 = 13 bo‘lsa, x nechaga teng?", answer: "9", options: ["7", "8", "9", "10"] },
  { subject: "SAT Data", question: "Agar 40 ning 25% i so‘ralsa, javob nechchi?", answer: "10", options: ["8", "10", "12", "15"] },
  { subject: "OTM Matematika", question: "Kvadrat tenglama diskriminanti formulasi qanday?", answer: "D=b²-4ac", options: ["D=b²-4ac", "D=b²+4ac", "D=2b-4ac", "D=a²-4bc"] },
  { subject: "OTM Ona tili", question: "Gap bo‘laklari nechta asosiy turga bo‘linadi?", answer: "5 ta", options: ["3 ta", "4 ta", "5 ta", "6 ta"] },
  { subject: "OTM Tarix", question: "Mustaqillik deklaratsiyasi qachon qabul qilingan?", answer: "1990-yil 20-iyun", options: ["1989-yil 1-sentyabr", "1990-yil 20-iyun", "1991-yil 31-avgust", "1992-yil 8-dekabr"] },
  { subject: "OTM Ingliz tili", question: "Choose: I have lived here ___ 2020.", answer: "since", options: ["for", "since", "from", "in"] },
  { subject: "OTM Biologiya", question: "DNK tarkibidagi azotli asoslardan biri qaysi?", answer: "Adenin", options: ["Glyukoza", "Adenin", "Lipid", "Kalsiy"] },
  { subject: "OTM Kimyo", question: "NaCl moddasining nomi nima?", answer: "Natriy xlorid", options: ["Natriy xlorid", "Kalsiy karbonat", "Natriy gidroksid", "Kaliy xlorid"] },
  { subject: "OTM Fizika", question: "Tezlik formulasi qanday?", answer: "v=s/t", options: ["v=s·t", "v=s/t", "v=t/s", "v=s+t"] },
  { subject: "OTM Geografiya", question: "Yerning eng katta okeani qaysi?", answer: "Tinch okeani", options: ["Atlantika okeani", "Hind okeani", "Tinch okeani", "Shimoliy Muz okeani"] },
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

type LevelQ = { subject: string; question: string; answer: string; options?: string[] };

const levelTestQuestions: Record<string, LevelQ[]> = {
  IELTS: [
    { subject: "Vocabulary", question: "Synonym of 'significant'?", answer: "important", options: ["important", "small", "ancient", "rapid"] },
    { subject: "Grammar", question: "Fill: If I ___ rich, I would travel.", answer: "were", options: ["was", "were", "am", "be"] },
    { subject: "Reading", question: "Antonym of 'ancient'?", answer: "modern", options: ["old", "modern", "tiny", "ugly"] },
    { subject: "Writing", question: "Plural of 'analysis'?", answer: "analyses", options: ["analysis", "analysises", "analyses", "analysis's"] },
    { subject: "Listening", question: "How many minutes in 1.5 hours?", answer: "90", options: ["60", "75", "90", "120"] },
    { subject: "Vocabulary", question: "Closest meaning of 'reluctant':", answer: "unwilling", options: ["eager", "unwilling", "tired", "honest"] },
    { subject: "Grammar", question: "She has been working ___ 8 a.m.", answer: "since", options: ["for", "since", "from", "during"] },
    { subject: "Reading", question: "'Crucial' is closest in meaning to:", answer: "essential", options: ["essential", "optional", "casual", "rare"] },
    { subject: "Writing", question: "a piece of ___", answer: "advice", options: ["advise", "advice", "advices", "advicing"] },
    { subject: "Listening", question: "Train leaves 14:45, 35 min trip — arrival?", answer: "15:20", options: ["15:10", "15:15", "15:20", "15:25"] },
  ],
  "Multi-level": [
    { subject: "Grammar", question: "Choose: She ___ to school every day.", answer: "goes", options: ["go", "goes", "going", "gone"] },
    { subject: "Vocabulary", question: "Past tense of 'go'?", answer: "went", options: ["goed", "gone", "went", "going"] },
    { subject: "Reading", question: "Antonym of 'happy'?", answer: "sad", options: ["glad", "sad", "merry", "joyful"] },
    { subject: "Writing", question: "Article: ___ apple a day.", answer: "an", options: ["a", "an", "the", "—"] },
    { subject: "Listening", question: "Capital of the UK?", answer: "London", options: ["Paris", "London", "Berlin", "Rome"] },
    { subject: "Grammar", question: "I ___ never been to Paris.", answer: "have", options: ["has", "have", "had", "having"] },
    { subject: "Vocabulary", question: "Comparative of 'good'?", answer: "better", options: ["gooder", "better", "best", "more good"] },
    { subject: "Reading", question: "Synonym of 'huge'?", answer: "enormous", options: ["tiny", "small", "enormous", "weak"] },
    { subject: "Writing", question: "Plural of 'mouse' (animal)?", answer: "mice", options: ["mouses", "mice", "mises", "mousen"] },
    { subject: "Listening", question: "Days in February (leap year)?", answer: "29", options: ["28", "29", "30", "31"] },
  ],
};

// Milliy sertifikat — fan kesimida katta MCQ bazasi (har fan alohida tanlanadi va alohida to'lanadi)
const milliySubjectBank: Record<string, LevelQ[]> = {
  Matematika: [
    { subject: "Matematika", question: "5! (faktorial) = ?", answer: "120", options: ["20", "60", "100", "120"] },
    { subject: "Matematika", question: "12 × 8 = ?", answer: "96", options: ["86", "92", "96", "104"] },
    { subject: "Matematika", question: "144 ning kvadrat ildizi?", answer: "12", options: ["10", "11", "12", "14"] },
    { subject: "Matematika", question: "3x = 27 bo'lsa, x = ?", answer: "9", options: ["3", "6", "9", "12"] },
    { subject: "Matematika", question: "log10(1000) = ?", answer: "3", options: ["1", "2", "3", "10"] },
    { subject: "Matematika", question: "sin(90°) = ?", answer: "1", options: ["0", "0.5", "1", "√2/2"] },
    { subject: "Matematika", question: "2^10 = ?", answer: "1024", options: ["512", "1024", "2048", "256"] },
    { subject: "Matematika", question: "Aylananing yuzi formulasi?", answer: "πr²", options: ["2πr", "πr²", "πd", "πr³"] },
    { subject: "Matematika", question: "1 km nechta metr?", answer: "1000", options: ["100", "500", "1000", "10000"] },
    { subject: "Matematika", question: "Eng kichik tub son?", answer: "2", options: ["1", "2", "3", "0"] },
    { subject: "Matematika", question: "(a+b)² = ?", answer: "a²+2ab+b²", options: ["a²+b²", "a²+2ab+b²", "a²-2ab+b²", "a²+ab+b²"] },
    { subject: "Matematika", question: "60° radianda?", answer: "π/3", options: ["π/2", "π/3", "π/4", "π/6"] },
  ],
  "Ona tili": [
    { subject: "Ona tili", question: "Gapning bosh bo'laklari nechta?", answer: "2", options: ["1", "2", "3", "5"] },
    { subject: "Ona tili", question: "Gap bo'laklari necha turga bo'linadi?", answer: "5", options: ["3", "4", "5", "6"] },
    { subject: "Ona tili", question: "O'zbek alifbosida nechta harf bor?", answer: "29", options: ["26", "28", "29", "33"] },
    { subject: "Ona tili", question: "Fe'l qaysi savolga javob beradi?", answer: "Nima qildi?", options: ["Kim?", "Qaysi?", "Nima qildi?", "Qancha?"] },
    { subject: "Ona tili", question: "Ot turkumiga misol:", answer: "Daraxt", options: ["Yugur", "Daraxt", "Qizil", "Tez"] },
    { subject: "Ona tili", question: "Sifat nimani bildiradi?", answer: "Belgi", options: ["Harakat", "Belgi", "Narsa", "Son"] },
    { subject: "Ona tili", question: "Ko'p nuqta nechta nuqtadan iborat?", answer: "3", options: ["2", "3", "4", "5"] },
    { subject: "Ona tili", question: "Unli tovushlar soni:", answer: "6", options: ["5", "6", "7", "10"] },
    { subject: "Ona tili", question: "Tinish belgisi qaysi?", answer: "Nuqta", options: ["Nuqta", "Daraxt", "Bola", "Yugur"] },
    { subject: "Ona tili", question: "Qo'shma gap nechta sodda gapdan tuziladi?", answer: "2 va undan ortiq", options: ["1", "2 va undan ortiq", "Faqat 2", "Faqat 3"] },
  ],
  Tarix: [
    { subject: "Tarix", question: "Mustaqillik yili?", answer: "1991", options: ["1989", "1990", "1991", "1992"] },
    { subject: "Tarix", question: "Amir Temur poytaxti?", answer: "Samarqand", options: ["Toshkent", "Samarqand", "Buxoro", "Xiva"] },
    { subject: "Tarix", question: "Konstitutsiya qabul qilingan yil?", answer: "1992", options: ["1991", "1992", "1993", "1995"] },
    { subject: "Tarix", question: "Mirzo Ulug'bek nima bilan mashhur?", answer: "Astronomiya", options: ["Tibbiyot", "Astronomiya", "Adabiyot", "Memorlik"] },
    { subject: "Tarix", question: "Birinchi jahon urushi qachon boshlangan?", answer: "1914", options: ["1905", "1914", "1918", "1939"] },
    { subject: "Tarix", question: "Ikkinchi jahon urushi tugagan yili?", answer: "1945", options: ["1939", "1941", "1945", "1950"] },
    { subject: "Tarix", question: "Buxoro amirligi qachon tugatildi?", answer: "1920", options: ["1917", "1920", "1924", "1930"] },
    { subject: "Tarix", question: "Alisher Navoiy tug'ilgan shahar?", answer: "Hirot", options: ["Samarqand", "Hirot", "Buxoro", "Toshkent"] },
    { subject: "Tarix", question: "Amir Temur tug'ilgan yil?", answer: "1336", options: ["1320", "1336", "1370", "1405"] },
    { subject: "Tarix", question: "Mustaqillik kuni (sana)?", answer: "1-sentyabr", options: ["1-sentyabr", "8-dekabr", "20-iyun", "31-avgust"] },
  ],
  Biologiya: [
    { subject: "Biologiya", question: "Inson tanasida nechta xromosoma?", answer: "46", options: ["23", "44", "46", "48"] },
    { subject: "Biologiya", question: "Fotosintezda ajraladigan gaz?", answer: "Kislorod", options: ["Karbonat angidrid", "Azot", "Kislorod", "Vodorod"] },
    { subject: "Biologiya", question: "Hujayraning energiya stansiyasi?", answer: "Mitoxondriya", options: ["Yadro", "Ribosoma", "Mitoxondriya", "Lizosoma"] },
    { subject: "Biologiya", question: "Eng katta organ?", answer: "Teri", options: ["Yurak", "Jigar", "Teri", "Miya"] },
    { subject: "Biologiya", question: "Yurakda nechta bo'lma bor?", answer: "4", options: ["2", "3", "4", "6"] },
    { subject: "Biologiya", question: "O'simliklarda yashil pigment?", answer: "Xlorofill", options: ["Karotin", "Xlorofill", "Ksantofill", "Lipid"] },
    { subject: "Biologiya", question: "Inson skeletida nechta suyak?", answer: "206", options: ["180", "206", "212", "256"] },
    { subject: "Biologiya", question: "Qon guruhlari nechta?", answer: "4", options: ["2", "3", "4", "5"] },
    { subject: "Biologiya", question: "DNK to'liq nomi?", answer: "Dezoksiribonuklein kislota", options: ["Ribonuklein kislota", "Dezoksiribonuklein kislota", "Aminokislota", "Glyukoza"] },
    { subject: "Biologiya", question: "Qonni tozalovchi organ?", answer: "Buyrak", options: ["Jigar", "Buyrak", "Yurak", "O'pka"] },
  ],
  Kimyo: [
    { subject: "Kimyo", question: "Oltinning kimyoviy belgisi?", answer: "Au", options: ["Ag", "Au", "Al", "As"] },
    { subject: "Kimyo", question: "Suvning formulasi?", answer: "H2O", options: ["H2O", "CO2", "O2", "HO"] },
    { subject: "Kimyo", question: "NaCl nomi?", answer: "Natriy xlorid", options: ["Natriy xlorid", "Kalsiy xlorid", "Natriy gidroksid", "Kaliy xlorid"] },
    { subject: "Kimyo", question: "pH 7 — qanday muhit?", answer: "Neytral", options: ["Kislotali", "Neytral", "Ishqoriy", "Kuchli kislota"] },
    { subject: "Kimyo", question: "Eng yengil element?", answer: "Vodorod", options: ["Geliy", "Vodorod", "Kislorod", "Litiy"] },
    { subject: "Kimyo", question: "CO2 nomi?", answer: "Karbonat angidrid", options: ["Karbonat angidrid", "Uglerod oksidi", "Metan", "Ozon"] },
    { subject: "Kimyo", question: "Temirning belgisi?", answer: "Fe", options: ["Fe", "Te", "Tr", "Ti"] },
    { subject: "Kimyo", question: "Davriy jadvalda nechta element?", answer: "118", options: ["100", "112", "118", "120"] },
    { subject: "Kimyo", question: "Vodorod belgisi?", answer: "H", options: ["H", "He", "Hg", "Hi"] },
    { subject: "Kimyo", question: "Suvning qaynash harorati (°C)?", answer: "100", options: ["90", "100", "110", "120"] },
  ],
  Fizika: [
    { subject: "Fizika", question: "Tezlik formulasi?", answer: "v=s/t", options: ["v=s·t", "v=s/t", "v=t/s", "v=s+t"] },
    { subject: "Fizika", question: "Tok kuchi birligi?", answer: "Amper", options: ["Volt", "Vatt", "Amper", "Om"] },
    { subject: "Fizika", question: "Erkin tushish tezlanishi (g)?", answer: "9.8", options: ["8.8", "9.8", "10.8", "11.2"] },
    { subject: "Fizika", question: "Quvvat birligi?", answer: "Vatt", options: ["Joul", "Vatt", "Amper", "Volt"] },
    { subject: "Fizika", question: "Yorug'lik tezligi (km/s)?", answer: "300000", options: ["3000", "30000", "300000", "3000000"] },
    { subject: "Fizika", question: "F = ma — kimning qonuni?", answer: "Nyuton", options: ["Eynshteyn", "Nyuton", "Galiley", "Arximed"] },
    { subject: "Fizika", question: "Kuchlanish birligi?", answer: "Volt", options: ["Volt", "Amper", "Om", "Vatt"] },
    { subject: "Fizika", question: "Energiya birligi?", answer: "Joul", options: ["Vatt", "Joul", "Nyuton", "Paskal"] },
    { subject: "Fizika", question: "Temperatura birligi (SI)?", answer: "Kelvin", options: ["Selsiy", "Kelvin", "Faringeit", "Renkin"] },
    { subject: "Fizika", question: "Massa birligi (SI)?", answer: "kg", options: ["g", "kg", "tonna", "mg"] },
  ],
  "Ingliz tili": [
    { subject: "Ingliz tili", question: "Past tense of 'go'?", answer: "went", options: ["goed", "gone", "went", "going"] },
    { subject: "Ingliz tili", question: "Antonym of 'happy'?", answer: "sad", options: ["glad", "sad", "merry", "kind"] },
    { subject: "Ingliz tili", question: "Plural of 'child'?", answer: "children", options: ["childs", "childen", "children", "childes"] },
    { subject: "Ingliz tili", question: "Article: ___ apple a day.", answer: "an", options: ["a", "an", "the", "—"] },
    { subject: "Ingliz tili", question: "Choose: She ___ to school every day.", answer: "goes", options: ["go", "goes", "going", "gone"] },
    { subject: "Ingliz tili", question: "Comparative of 'good'?", answer: "better", options: ["gooder", "better", "best", "well"] },
    { subject: "Ingliz tili", question: "Past participle of 'write'?", answer: "written", options: ["wrote", "writed", "written", "writing"] },
    { subject: "Ingliz tili", question: "Synonym of 'big'?", answer: "large", options: ["small", "large", "tiny", "weak"] },
    { subject: "Ingliz tili", question: "Letters in the English alphabet?", answer: "26", options: ["24", "26", "28", "30"] },
    { subject: "Ingliz tili", question: "Capital of England?", answer: "London", options: ["Paris", "London", "Madrid", "Berlin"] },
  ],
};

const milliySubjects = Object.keys(milliySubjectBank);
const MILLIY_PRICE = 39000;
const MILLIY_DURATION_SEC = 3 * 60 * 60;

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
  uz: {
    greeting: "Xush kelibsiz", guest: "Mehmon", login: "Kirish", register: "Ro‘yxatdan o‘tish", search: "Qidirish",
    settings: "Sozlamalar", theme: "Mavzu", language: "Til",
    heroTitle: "Sizning", heroBrand: "Muvaffaqiyat", heroTail: "Yo‘lingiz",
    heroSub: "SAT, OTM va xalqaro imtihonlarga premium tayyorlaning.",
  },
  en: {
    greeting: "Welcome", guest: "Guest", login: "Login", register: "Sign up", search: "Search",
    settings: "Settings", theme: "Theme", language: "Language",
    heroTitle: "Your", heroBrand: "Success", heroTail: "Path",
    heroSub: "Premium prep for SAT, university and international exams.",
  },
  ru: {
    greeting: "Добро пожаловать", guest: "Гость", login: "Войти", register: "Регистрация", search: "Поиск",
    settings: "Настройки", theme: "Тема", language: "Язык",
    heroTitle: "Ваш", heroBrand: "Успех", heroTail: "Путь",
    heroSub: "Премиум подготовка к SAT, ВУЗам и международным экзаменам.",
  },
};

type ThemeId = "violet" | "ocean" | "sunset" | "forest" | "rose";
const themeOptions: Array<{ id: ThemeId; label: string; swatch: string }> = [
  { id: "violet", label: "Violet Dream", swatch: "linear-gradient(135deg,#7C5CFF,#3BA3FF)" },
  { id: "ocean", label: "Deep Ocean", swatch: "linear-gradient(135deg,#22D3EE,#0EA5E9)" },
  { id: "sunset", label: "Sunset", swatch: "linear-gradient(135deg,#F472B6,#FB923C)" },
  { id: "forest", label: "Forest", swatch: "linear-gradient(135deg,#34D399,#14B8A6)" },
  { id: "rose", label: "Rose Gold", swatch: "linear-gradient(135deg,#F472B6,#A855F7)" },
];

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
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("edusat:dark");
    return saved === null ? true : saved === "1";
  });
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "uz";
    return (localStorage.getItem("edusat:lang") as Lang) || "uz";
  });
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "violet";
    return (localStorage.getItem("edusat:theme") as ThemeId) || "violet";
  });
  const [coins, setCoins] = useState(1280);
  const [pdfViewer, setPdfViewer] = useState<{ url: string; title: string } | null>(null);
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
  const [userAvatars, setUserAvatars] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("edusat:avatars") || "{}"); } catch { return {}; }
  });
  const [profileName, setProfileName] = useState("Mehmon");
  const [profileEmail, setProfileEmail] = useState("demo@edusat.uz");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Array<{ id: string; title: string; category: string; section: SectionId }>>([]);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [submittedTests, setSubmittedTests] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [active3dSubject, setActive3dSubject] = useState("Hammasi");
  const [activeLevelTest, setActiveLevelTest] = useState<string | null>(null);
  const [proctoredExam, setProctoredExam] = useState<string | null>(null);
  const [proctoredResult, setProctoredResult] = useState<Record<string, { score: number; total: number; valid: boolean }>>({});
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
  const [introMuted, setIntroMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("edusat:introMuted") === "1";
  });
  const [introEnabled, setIntroEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("edusat:introEnabled") !== "0";
  });
  const [introVisible, setIntroVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    if (localStorage.getItem("edusat:introEnabled") === "0") return false;
    return sessionStorage.getItem("edusat:introSeen") !== "1";
  });
  const introAudioRef = useRef<HTMLAudioElement | null>(null);

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
    try { localStorage.setItem("edusat:dark", dark ? "1" : "0"); } catch { /* ignore */ }
  }, [dark]);

  // Apply + persist theme (works in both light & dark mode)
  useEffect(() => {
    const root = document.documentElement;
    ["theme-violet", "theme-ocean", "theme-sunset", "theme-forest", "theme-rose"].forEach((c) => root.classList.remove(c));
    root.classList.add(`theme-${theme}`);
    try { localStorage.setItem("edusat:theme", theme); } catch { /* ignore */ }
  }, [theme]);

  // Persist language
  useEffect(() => {
    try { localStorage.setItem("edusat:lang", lang); } catch { /* ignore */ }
  }, [lang]);

  // Persist registered users
  useEffect(() => {
    try { localStorage.setItem("edusat:users", JSON.stringify(registeredUsers)); } catch { /* ignore */ }
  }, [registeredUsers]);

  // Persist user avatars (per email)
  useEffect(() => {
    try { localStorage.setItem("edusat:avatars", JSON.stringify(userAvatars)); } catch { /* ignore */ }
  }, [userAvatars]);

  // Persist intro mute preference
  useEffect(() => {
    try { localStorage.setItem("edusat:introMuted", introMuted ? "1" : "0"); } catch { /* ignore */ }
    if (introAudioRef.current) {
      introAudioRef.current.muted = introMuted;
      if (!introMuted && introVisible) {
        introAudioRef.current.play().catch(() => { /* ignore */ });
      }
    }
  }, [introMuted, introVisible]);

  // Try to autoplay intro audio; fallback to first user gesture
  useEffect(() => {
    if (!introVisible) return;
    const el = introAudioRef.current;
    if (!el) return;
    el.muted = introMuted;
    el.volume = 0.6;
    const tryPlay = () => el.play().catch(() => { /* blocked */ });
    tryPlay();
    const onGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [introVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist intro enabled preference
  useEffect(() => {
    try { localStorage.setItem("edusat:introEnabled", introEnabled ? "1" : "0"); } catch { /* ignore */ }
    if (!introEnabled && introVisible) {
      setIntroVisible(false);
      if (introAudioRef.current) {
        try { introAudioRef.current.pause(); } catch { /* ignore */ }
      }
    }
  }, [introEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeIntro = () => {
    try { sessionStorage.setItem("edusat:introSeen", "1"); } catch { /* ignore */ }
    if (introAudioRef.current) {
      try { introAudioRef.current.pause(); } catch { /* ignore */ }
    }
    setIntroVisible(false);
  };

  // Restore session + avatar on first mount
  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("edusat:session") || "null");
      if (session?.email && session?.name) {
        setUserName(session.name);
        setProfileName(session.name);
        setProfileEmail(session.email);
        setIsAuthenticated(true);
        const savedAvatars = JSON.parse(localStorage.getItem("edusat:avatars") || "{}");
        if (savedAvatars[session.email]) setAvatar(savedAvatars[session.email]);
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todayQuote = useMemo(() => {
    const weekday = new Date().getDay(); // 0..6
    return quotes[weekday % quotes.length];
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
  const Flag = ({ iso, className = "h-4 w-6" }: { iso: string; className?: string }) => (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
      alt={`${iso} flag`}
      className={`${className} inline-block rounded-sm object-cover shadow-sm ring-1 ring-white/10`}
      loading="lazy"
    />
  );
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
  const favoriteCategoryOrder = ["Shior", "Kurs", "Free test", "Fan testi", "Kitob", "3D qo‘llanma", "Bepul dars", "Edu market"];
  const groupedFavorites = favoriteCategoryOrder
    .map((category) => ({ category, items: favorites.filter((item) => item.category === category) }))
    .filter((group) => group.items.length > 0);
  const normalizeAnswer = (value: string) => value.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ");
  const getTestScore = (testId: string, questions: typeof sampleQuestions) => questions.filter((q, i) => normalizeAnswer(testAnswers[`${testId}-${q.subject}-${i}`] || "") === normalizeAnswer(q.answer)).length;

  const completeActivity = (reward = 25) => setCoins((current) => current + reward);

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setAvatar(dataUrl);
      if (isAuthenticated && profileEmail) {
        setUserAvatars((prev) => ({ ...prev, [profileEmail]: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const aiScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    aiScrollRef.current?.scrollTo({ top: aiScrollRef.current.scrollHeight, behavior: "smooth" });
  }, [aiMessages, aiLoading]);

  const sendAiMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || aiLoading) return;
    setAiError("");
    const userMsg = { role: "user" as const, content: trimmed };
    const nextMessages = [...aiMessages, userMsg];
    setAiMessages(nextMessages);
    setAiInput("");
    setAiLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!resp.ok) {
        if (resp.status === 429) throw new Error("So‘rovlar limiti oshib ketdi, biroz kuting.");
        if (resp.status === 402) throw new Error("AI kreditlari tugadi. Workspace > Usage’dan to‘ldiring.");
        throw new Error("AI bilan bog‘lanishda xatolik");
      }
      if (!resp.body) throw new Error("Stream mavjud emas");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantSoFar = "";
      let started = false;
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, nl);
          textBuffer = textBuffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setAiMessages((prev) => {
                if (!started) {
                  started = true;
                  return [...prev, { role: "assistant", content: assistantSoFar }];
                }
                return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "Noma‘lum xatolik");
    } finally {
      setAiLoading(false);
    }
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
      setAvatar(userAvatars[email] || null);
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

  // Deterministic shuffle (seedable so options stay stable per question)
  const seededShuffle = <T,>(arr: T[], seed: number): T[] => {
    const a = [...arr];
    let s = seed || 1;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const hashString = (str: string) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h) || 1;
  };

  const buildOptionsFor = (
    q: { question: string; answer: string; options?: string[] },
    pool: Array<{ answer: string }>,
    testId: string,
  ): string[] => {
    if (q.options && q.options.length >= 2) {
      return seededShuffle(q.options, hashString(testId + q.question));
    }
    const correct = q.answer;
    const distractorsAll = Array.from(
      new Set(
        pool
          .map((p) => p.answer)
          .filter((a) => normalizeAnswer(a) !== normalizeAnswer(correct)),
      ),
    );
    const shuffled = seededShuffle(distractorsAll, hashString(testId + q.question));
    const picked = shuffled.slice(0, 3);
    while (picked.length < 3) picked.push(`Variant ${picked.length + 1}`);
    return seededShuffle([correct, ...picked], hashString(testId + q.question + "x"));
  };

  const TestRunner = ({ testId, questions }: { testId: string; questions: typeof sampleQuestions }) => {
    const submitted = submittedTests[testId];
    const score = getTestScore(testId, questions);
    const optionLabels = ["A", "B", "C", "D", "E"];

    return (
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {questions.map((q, index) => {
          const answerKey = `${testId}-${q.subject}-${index}`;
          const userAnswer = testAnswers[answerKey] || "";
          const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(q.answer);
          const options = buildOptionsFor(q, questions, testId);
          return (
            <div key={`${testId}-${q.subject}-${index}`} className="rounded-3xl border border-border/60 bg-card/70 p-5 transition-all hover:border-primary/40">
              <Pill>{q.subject}</Pill>
              <p className="mt-4 font-black text-foreground">{q.question}</p>
              <div className="mt-4 space-y-2">
                {options.map((opt, oi) => {
                  const selected = userAnswer === opt;
                  const optionCorrect = normalizeAnswer(opt) === normalizeAnswer(q.answer);
                  let stateCls = "border-border/60 bg-background/40 hover:border-primary/40 hover:bg-primary/5";
                  if (submitted) {
                    if (optionCorrect) stateCls = "border-primary/70 bg-primary/15 text-foreground";
                    else if (selected && !optionCorrect) stateCls = "border-destructive/60 bg-destructive/10 text-foreground";
                    else stateCls = "border-border/40 bg-background/30 opacity-70";
                  } else if (selected) {
                    stateCls = "border-primary bg-primary/15 text-foreground shadow-glow";
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => setTestAnswers({ ...testAnswers, [answerKey]: opt })}
                      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold text-foreground transition-all disabled:cursor-not-allowed ${stateCls}`}
                    >
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl text-xs font-black ${selected || (submitted && optionCorrect) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{optionLabels[oi]}</span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`mt-3 text-sm font-black ${isCorrect ? "text-primary" : "text-destructive"}`}>
                  {isCorrect ? "✓ To‘g‘ri javob" : `✗ Noto‘g‘ri. To‘g‘ri javob: ${q.answer}`}
                </p>
              )}
            </div>
          );
        })}
        <GlassCard className="md:col-span-2 xl:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-black text-foreground">Test natijasi</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {submitted
                  ? `${score}/${questions.length} ta to‘g‘ri javob • ${Math.round((score / questions.length) * 100)}%`
                  : "Variantlardan birini tanlang va tekshirish tugmasini bosing."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {submitted && (
                <button
                  className="rounded-2xl border border-border px-5 py-3 font-black text-foreground transition-all hover:bg-accent"
                  onClick={() => {
                    const next = { ...submittedTests };
                    delete next[testId];
                    setSubmittedTests(next);
                    const cleared = { ...testAnswers };
                    questions.forEach((_, i) => { delete cleared[`${testId}-${questions[i].subject}-${i}`]; });
                    setTestAnswers(cleared);
                  }}
                >
                  Qayta urinish
                </button>
              )}
              {!submitted && (
                <button
                  className="premium-button rounded-2xl px-5 py-3 font-black"
                  onClick={() => { setSubmittedTests({ ...submittedTests, [testId]: true }); completeActivity(30); }}
                >
                  Tekshirish +30 coin
                </button>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    );
  };

  const navVisible = sidebarOpen || !sidebarHidden;
  const nav = (
    <aside
      className="fixed inset-y-3 left-3 z-40 flex w-[min(84vw,320px)] flex-col rounded-3xl border border-sidebar-border bg-sidebar p-4 shadow-premium backdrop-blur-xl transition-all duration-300 lg:sticky lg:top-3 lg:h-[calc(100vh-1.5rem)] lg:w-80 data-[open=true]:animate-slide-in-left data-[open=false]:-translate-x-[110%] data-[open=false]:opacity-0 data-[open=false]:lg:pointer-events-none data-[open=false]:lg:w-0 data-[open=false]:lg:p-0 data-[open=false]:lg:opacity-0"
      data-open={navVisible}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <button className="flex items-center gap-3 text-left" onClick={() => setActive("home")}>
          <span className="grid h-12 w-12 place-items-center rounded-2xl icon-bubble shadow-glow">
            <Rocket className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-xl font-black text-foreground">EduSAT</span>
            <span className="text-xs font-bold text-muted-foreground">Academy Premium</span>
          </span>
        </button>
        <button
          className="rounded-2xl p-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
          onClick={() => { setSidebarOpen(false); setSidebarHidden(true); }}
          aria-label="Yon panelni yopish"
        >
          <X />
        </button>
      </div>
      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/5 bg-background/60 p-2 transition-all focus-within:border-[hsl(var(--premium-blue,var(--premium-violet)))] focus-within:shadow-[0_0_0_3px_hsl(var(--premium-blue,var(--premium-violet))/0.2)]">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder={t.search} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      </div>
      {searchResults.length > 0 && (
        <div className="mb-4 space-y-1 rounded-3xl border border-white/5 bg-card/80 p-2 animate-fade-in-up">
          {searchResults.map((item) => (
            <button
              key={`${item.section}-${item.title}`}
              className="w-full rounded-2xl px-3 py-2 text-left transition-all hover:bg-primary/10 hover:text-primary"
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
        {filteredSections.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
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
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold ${isActive ? "nav-item-active" : "nav-item"}`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : ""}`} />
              <span>{label}</span>
            </button>
          );
        })}
        {filteredSections.length === 0 && <p className="px-3 py-4 text-sm font-bold text-muted-foreground">Natija topilmadi</p>}
      </nav>
    </aside>
  );

  const renderAi = () => {
    const suggestions = [
      "SAT matematika misolini tushuntirib bering",
      "IELTS Writing Task 2 uchun struktura bering",
      "Fotosintez jarayonini qisqacha tushuntiring",
      "Kvadrat tenglama formulasini misol bilan ko‘rsating",
    ];
    return (
      <div className="space-y-6 animate-fade-in-up">
        <SectionTitle
          kicker="AI Yordamchi"
          title="Har qanday savolingizga javob beradigan sun‘iy intellekt"
          text="SAT, IELTS, maktab fanlari va umumiy bilim — yozing va sekundlar ichida javob oling."
        />

        <div className="card-premium overflow-hidden p-0">
          <div className="flex items-center gap-3 border-b border-border/40 bg-gradient-to-r from-primary/10 to-transparent px-5 py-4">
            <div className="icon-bubble grid h-11 w-11 place-items-center rounded-2xl shadow-glow animate-glow-pulse">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-black text-foreground">EduSAT AI</p>
              <p className="text-xs text-muted-foreground">Onlayn • barcha tillarda javob beradi</p>
            </div>
            {aiMessages.length > 0 && (
              <button
                onClick={() => { setAiMessages([]); setAiError(""); }}
                className="ml-auto rounded-2xl border border-border/60 px-3 py-1.5 text-xs font-black text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              >
                Yangi suhbat
              </button>
            )}
          </div>

          <div ref={aiScrollRef} className="max-h-[55vh] min-h-[320px] space-y-4 overflow-y-auto px-5 py-6">
            {aiMessages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-3xl border border-border/40 bg-background/40 p-5 text-sm text-muted-foreground">
                  👋 Salom! Men <span className="font-black text-foreground">EduSAT AI</span> yordamchisiman. Quyidagi tayyor savollardan birini bosing yoki o‘zingizning savolingizni yozing.
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendAiMessage(s)}
                      className="rounded-2xl border border-border/60 bg-background/40 p-3 text-left text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {aiMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "premium-button rounded-br-md font-bold"
                      : "rounded-bl-md border border-border/60 bg-background/60 text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {aiLoading && aiMessages[aiMessages.length - 1]?.role === "user" && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-md border border-border/60 bg-background/60 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            )}

            {aiError && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
                {aiError}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); sendAiMessage(aiInput); }}
            className="flex items-end gap-2 border-t border-border/40 bg-background/40 p-3"
          >
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendAiMessage(aiInput);
                }
              }}
              rows={1}
              placeholder="Savolingizni yozing... (Enter — yuborish, Shift+Enter — yangi qator)"
              className="input-premium max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={aiLoading || !aiInput.trim()}
              className="premium-button grid h-12 w-12 shrink-0 place-items-center rounded-2xl disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Yuborish"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <>
      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <GlassCard className="relative min-h-[420px] overflow-hidden p-7 md:p-10">
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[hsl(var(--premium-violet)/0.35)] blur-3xl animate-orb" />
          <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-[hsl(var(--premium-blue,var(--premium-violet))/0.3)] blur-3xl animate-orb" style={{ animationDelay: "-4s" }} />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[hsl(var(--primary)/0.25)] blur-3xl animate-orb" style={{ animationDelay: "-8s" }} />
          <span className="pointer-events-none absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-primary animate-sparkle" />
          <span className="pointer-events-none absolute right-[20%] top-[32%] h-1.5 w-1.5 rounded-full bg-primary animate-sparkle" style={{ animationDelay: "0.6s" }} />
          <span className="pointer-events-none absolute left-[42%] bottom-[22%] h-2 w-2 rounded-full bg-primary animate-sparkle" style={{ animationDelay: "1.2s" }} />
          <span className="pointer-events-none absolute right-[8%] bottom-[14%] h-2.5 w-2.5 rounded-full bg-primary animate-sparkle" style={{ animationDelay: "1.8s" }} />
          <div className="relative z-10 flex h-full flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-primary backdrop-blur-md animate-fade-in-up">
              <span className="h-2 w-2 animate-ping rounded-full bg-primary" /> Premium ta’lim · 2026
            </span>
            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-foreground">EduSAT </span>
              <span className="animate-gradient-text">Academy</span>
              <br />
              <span className="text-foreground">{t.heroTitle} </span>
              <span className="animate-gradient-text">{t.heroBrand}</span>
              <span className="text-foreground"> {t.heroTail}</span>
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 bg-primary animate-cursor" />
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              {t.greeting}, <b className="text-foreground">{displayName === "Mehmon" ? t.guest : displayName}</b>! {t.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {["Daraja aniqlash", "Free Testlar", "3D qo‘llanmalar", "Bepul darslar"].map((item) => (
                <button key={item} className="premium-button relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-black transition-transform hover:scale-105" onClick={() => setActive(sections.find((s) => s.label === item)?.id ?? "level")}>
                  <span className="relative z-10">{item}</span>
                  <span className="shimmer-overlay absolute inset-0" />
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute -bottom-6 right-6 text-[200px] font-black leading-none text-primary/10 animate-floaty">”</div>
          </div>
        </GlassCard>
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[hsl(var(--premium-violet)/0.25)] blur-3xl animate-orb" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary animate-floaty">
                <Star />
              </div>
              <div>
                <p className="text-sm font-black text-primary">Bugungi shior · {todayQuote[2]}</p>
                <p className="text-xs text-muted-foreground">Har kuni avtomatik almashadi</p>
              </div>
            </div>
            <FavoriteButton item={{ id: `quote-${todayQuote[2]}`, title: `“${todayQuote[0]}” — ${todayQuote[1]}`, category: "Shior", section: "favorites" }} />
          </div>
          <blockquote className="mt-5 text-xl font-black leading-8 text-foreground animate-fade-in-up">“{todayQuote[0]}”</blockquote>
          <p className="mt-4 font-bold text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.15s" }}>— {todayQuote[1]}</p>
        </GlassCard>
      </section>
      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon }, i) => (
          <GlassCard key={label} className="group relative overflow-hidden transition-transform hover:-translate-y-1 animate-fade-in-up">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[hsl(var(--premium-violet)/0.18)] blur-2xl" />
            <div className="relative">
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl icon-bubble shadow-glow animate-glow-pulse" style={{ animationDelay: `${i * 0.4}s` }}>
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="text-sm font-bold text-muted-foreground">{label}</p>
              <p className="mt-1 text-3xl font-black text-foreground">{label === "Coin balans" ? coins : value}</p>
            </div>
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
              {avatar && <button className="rounded-2xl border border-border px-5 py-3 text-sm font-black text-foreground hover:bg-accent" onClick={() => { setAvatar(null); if (profileEmail) setUserAvatars((prev) => { const next = { ...prev }; delete next[profileEmail]; return next; }); }}>Rasmni olib tashlash</button>}
              <button className="rounded-2xl border border-border px-5 py-3 text-sm font-black text-foreground transition-all hover:bg-accent hover:text-accent-foreground" onClick={() => { setIsAuthenticated(false); setUserName("Mehmon"); setProfileName("Mehmon"); setAvatar(null); setAuthEmail(""); setAuthPassword(""); setActive("home"); try { localStorage.removeItem("edusat:session"); } catch { /* ignore */ } }}>Profildan chiqish</button>
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
        <GlassCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[hsl(var(--premium-violet)/0.2)] blur-3xl animate-orb" />
          <Pill>4-bosqich • {t.settings}</Pill>
          <h3 className="mt-3 text-2xl font-black text-foreground">{t.settings}</h3>
          <p className="mt-1 text-sm text-muted-foreground">Sayt mavzusini va tilini o‘zingizga moslang. Tanlovingiz avtomatik saqlanadi.</p>

          <div className="mt-6">
            <p className="mb-3 text-sm font-black text-foreground">{t.theme}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {themeOptions.map((opt) => {
                const selected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id)}
                    className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all hover:-translate-y-0.5 ${selected ? "border-primary shadow-glow" : "border-border/60 hover:border-primary/40"}`}
                  >
                    <div className="h-16 w-full rounded-xl shadow-inner transition-transform group-hover:scale-105" style={{ background: opt.swatch }} />
                    <p className="mt-3 text-sm font-black text-foreground">{opt.label}</p>
                    {selected && <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-black text-primary-foreground">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-black text-foreground">{t.language}</p>
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((opt) => {
                const selected = lang === opt.code;
                return (
                  <button
                    key={opt.code}
                    onClick={() => setLang(opt.code)}
                    className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-black transition-all hover:-translate-y-0.5 ${selected ? "nav-item-active border-transparent" : "border-border/60 text-foreground hover:border-primary/40 hover:bg-primary/10"}`}
                  >
                    <Flag iso={opt.iso} className="h-4 w-6" /> {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={() => setDark(!dark)} className="inline-flex items-center gap-2 rounded-2xl border border-border/60 px-4 py-2.5 text-sm font-black text-foreground transition-all hover:bg-primary/10 hover:text-primary">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {dark ? "Yorug‘ rejim" : "Tungi rejim"}
            </button>
            <button
              onClick={() => setIntroEnabled(!introEnabled)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-black transition-all hover:-translate-y-0.5 ${introEnabled ? "nav-item-active border-transparent" : "border-border/60 text-foreground hover:border-primary/40 hover:bg-primary/10"}`}
              aria-pressed={introEnabled}
            >
              <Rocket className="h-4 w-4" />
              Kirish animatsiyasi: {introEnabled ? "Yoqilgan" : "O‘chirilgan"}
            </button>
            <button
              onClick={() => setIntroMuted(!introMuted)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-black transition-all hover:-translate-y-0.5 ${introMuted ? "border-border/60 text-foreground hover:border-primary/40 hover:bg-primary/10" : "nav-item-active border-transparent"}`}
              aria-pressed={!introMuted}
              disabled={!introEnabled}
            >
              <Sparkles className="h-4 w-4" />
              Ovozli kutib olish: {introMuted ? "O‘chirilgan" : "Yoqilgan"}
            </button>
            <button
              onClick={() => { try { sessionStorage.removeItem("edusat:introSeen"); } catch { /* ignore */ } setIntroEnabled(true); setIntroVisible(true); }}
              className="inline-flex items-center gap-2 rounded-2xl border border-border/60 px-4 py-2.5 text-sm font-black text-foreground transition-all hover:bg-primary/10 hover:text-primary"
            >
              <PlayCircle className="h-4 w-4" /> Kirish animatsiyani ko‘rish
            </button>
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
        const testId = `quiz-${activeQuiz.subject}-${activeQuiz.mode}`;
        const baseQuestions = activeQuiz.mode === "Random" ? seededShuffle(bank, hashString(testId)) : bank;
        const questions: QA[] = baseQuestions.slice(0, count).map((q) => ({ subject: `${activeQuiz.subject} ${activeQuiz.mode}`, question: q.question, answer: q.answer }));
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
      <SectionTitle kicker="Daraja aniqlash" title="IELTS, Multi-level va Milliy sertifikat testlari" text="Birinchi sinab ko'rish bepul. Test kamera nazorati ostida o'tkaziladi — halol ishtirok eting." />
      <div className="grid gap-5 lg:grid-cols-3">
        {levelTests.map((test) => {
          const result = proctoredResult[test.title];
          return (
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
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                <ShieldCheck className="h-3.5 w-3.5" /> Kamera nazorati ostida o'tkaziladi
              </div>
              {result && (
                <p className={`mt-3 rounded-2xl border px-3 py-2 text-center text-xs font-black ${result.valid ? "border-primary/40 bg-primary/10 text-primary" : "border-destructive/40 bg-destructive/10 text-destructive"}`}>
                  {result.valid ? `Oxirgi natija: ${result.score}/${result.total}` : `Bekor qilingan urinish: ${result.score}/${result.total}`}
                </p>
              )}
              <button
                className="mt-5 premium-button w-full rounded-2xl px-4 py-3 font-black"
                onClick={() => {
                  if (!levelTestQuestions[test.title]) return;
                  setProctoredExam(test.title);
                  completeActivity(50);
                }}
              >
                Imtihonni boshlash +50 coin
              </button>
            </GlassCard>
          );
        })}
      </div>

      {proctoredExam && levelTestQuestions[proctoredExam] && (
        <ProctoredExam
          testTitle={proctoredExam}
          questions={levelTestQuestions[proctoredExam]}
          onClose={() => setProctoredExam(null)}
          onComplete={(score, total, valid) => {
            setProctoredResult((prev) => ({ ...prev, [proctoredExam!]: { score, total, valid } }));
          }}
        />
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
              {book.image ? (
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img src={book.image} alt={`${book.title} — ${book.author}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="grid aspect-[3/4] place-items-center bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.34),transparent_34%),linear-gradient(145deg,hsl(var(--card)),hsl(var(--secondary)))] p-5 text-center">
                  <div>
                    <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-primary text-3xl font-black text-primary-foreground">{book.cover}</div>
                    <p className="text-xs font-black uppercase text-primary">{book.scene}</p>
                    <h3 className="mt-3 text-2xl font-black leading-tight text-foreground">{book.title}</h3>
                    <p className="mt-2 text-sm font-bold text-muted-foreground">{book.author}</p>
                  </div>
                </div>
              )}
            </div>
            <Pill>{book.level}</Pill>
            <h3 className="mt-4 text-xl font-black text-foreground">{book.title}</h3>
            <p className="mt-1 text-sm font-bold text-muted-foreground">{book.author}</p>
            <div className="mt-4 flex flex-wrap gap-2">{book.formats.map((format) => <Pill key={format}>{format}</Pill>)}</div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <FavoriteButton item={{ id: `book-${book.title}`, title: book.title, category: "Kitob", section: "library" }} />
              {book.pdf && (
                <button type="button" onClick={() => setPdfViewer({ url: book.pdf!, title: `${book.title} — ${book.author}` })} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-black text-primary-foreground shadow-glow hover:opacity-90">
                  <BookOpen className="h-4 w-4" /> PDF o‘qish
                </button>
              )}
            </div>
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
              {item.cover ? (
                <img src={item.cover} alt={item.title} loading="lazy" className="h-24 w-20 shrink-0 rounded-2xl object-cover shadow-glow" />
              ) : (
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-primary/15 text-2xl font-black text-primary shadow-glow">{item.image}</div>
              )}
              <div>
                <Pill>{item.category}</Pill>
                <h3 className="mt-3 text-2xl font-black text-foreground">{item.title}</h3>
              </div>
            </div>
            <p className="text-muted-foreground">{item.description}</p>
            <p className="mt-4 text-2xl font-black text-primary">{item.price}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <FavoriteButton item={{ id: `market-${item.title}`, title: item.title, category: "Edu market", section: "market" }} />
              {item.pdf && (
                <button type="button" onClick={() => setPdfViewer({ url: item.pdf!, title: item.title })} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-black text-primary-foreground shadow-glow hover:opacity-90">
                  <BookOpen className="h-4 w-4" /> Ko‘rib chiqish
                </button>
              )}
            </div>
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
    ai: renderAi,
    speaking: () => <SpeakingTutor userName={profileName} />,
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-xl animate-fade-in-up">
      <form className="w-full max-w-md rounded-3xl border border-white/10 bg-card p-6 shadow-premium animate-scale-in" onSubmit={(event) => { event.preventDefault(); handleAuthSubmit(); }}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-foreground">{authMode === "login" ? t.login : t.register}</h3>
          <button type="button" className="rounded-2xl p-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary" onClick={() => setAuthOpen(false)}><X /></button>
        </div>
        <div className="mt-5 space-y-3 text-foreground">
          {authMode === "register" && <input className="input-premium h-12 w-full rounded-2xl px-4 text-foreground placeholder:text-muted-foreground" placeholder="Ismingiz" value={authName} onChange={(e) => setAuthName(e.target.value)} autoComplete="name" />}
          <input className="input-premium h-12 w-full rounded-2xl px-4 text-foreground placeholder:text-muted-foreground" placeholder="Email" type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} autoComplete="email" />
          <input className="input-premium h-12 w-full rounded-2xl px-4 text-foreground placeholder:text-muted-foreground" placeholder="Parol" type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} autoComplete={authMode === "login" ? "current-password" : "new-password"} />
          {authError && <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive animate-fade-in-up">{authError}</p>}
          <button type="submit" className="premium-button w-full rounded-2xl py-3 font-black">{authMode === "login" ? "Kirish" : "Ro‘yxatdan o‘tish"} +100 coin</button>
        </div>
        <button type="button" className="mt-4 text-sm font-bold text-primary transition-all hover:opacity-80" onClick={() => { setAuthError(""); setAuthMode(authMode === "login" ? "register" : "login"); }}>{authMode === "login" ? "Hisob yo‘qmi? Ro‘yxatdan o‘ting" : "Hisobingiz bormi? Kirish"}</button>
      </form>
    </div>
  ) : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-premium-radial" />
      <div className="flex min-h-screen gap-4 p-3">
        {nav}
        {sidebarOpen && <button className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden animate-fade-in-up" onClick={() => setSidebarOpen(false)} aria-label="Menyuni yopish" />}
        <div className="min-w-0 flex-1">
          <header className="sticky top-3 z-20 mb-5 flex items-center justify-between gap-3 rounded-3xl border-b border-white/5 bg-card/90 px-4 py-3 shadow-premium backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <button
                className="rounded-2xl p-3 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
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
                <p className="text-xs font-black uppercase tracking-wider text-primary">{sections.find((s) => s.id === active)?.label}</p>
                <p className="hidden text-sm text-muted-foreground sm:block">Bilim, test, 3D qo‘llanma va premium tayyorgarlik markazi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-2xl border border-white/5 bg-background/60 px-3 py-2 font-black text-foreground sm:flex"><Coins className="h-4 w-4 text-primary" />{coins}</div>
              <button className="rounded-2xl p-3 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary" onClick={() => setDark(!dark)} aria-label="Theme almashtirish">{dark ? <Sun /> : <Moon />}</button>
              <div className="relative">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/5 bg-background/60 px-3 py-3 font-black text-foreground transition-all hover:bg-primary/10 hover:text-primary" onClick={() => setLangOpen(!langOpen)} aria-label="Til tanlash"><Flag iso={languageOptions.find((o) => o.code === lang)?.iso || "uz"} className="h-4 w-6" /><span className="text-xs uppercase">{lang}</span></button>
                {langOpen && <div className="absolute right-0 top-14 z-40 w-48 rounded-3xl border border-white/10 bg-card/95 p-2 shadow-premium backdrop-blur-xl animate-fade-in-up">{languageOptions.map((option) => <button key={option.code} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm font-black transition-all ${lang === option.code ? "nav-item-active" : "text-foreground hover:bg-primary/10 hover:text-primary"}`} onClick={() => { setLang(option.code); setLangOpen(false); }}><Flag iso={option.iso} className="h-4 w-6" />{option.label}</button>)}</div>}
              </div>
              <button className="hidden rounded-2xl premium-button px-4 py-3 font-black md:inline-flex" onClick={() => { if (isAuthenticated) { setActive("profile"); } else { setAuthMode("register"); setAuthOpen(true); } }}><LogIn className="mr-2 h-4 w-4" />{isAuthenticated ? "Profil" : t.register}</button>
              <button onClick={() => { if (isAuthenticated) { setActive("profile"); } else { setAuthMode("register"); setAuthOpen(true); } }} aria-label="Profilga o‘tish"><AvatarBlock size="sm" /></button>
            </div>
          </header>
          <div key={active} className="pb-8 animate-fade-in-up">{content()}</div>
        </div>
      </div>
      {authModal}
      <button className="fixed bottom-4 right-4 z-30 rounded-3xl bg-primary px-5 py-4 font-black text-primary-foreground shadow-glow md:hidden" onClick={() => { setAuthMode("login"); setAuthOpen(true); }}><Lock className="h-5 w-5" /></button>
      {introVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070b1a]">
          <audio ref={introAudioRef} src={introMusicSrc} autoPlay loop muted={introMuted} />
          {/* Animated gradient orbs */}
          <div className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--premium-violet)/0.45)] blur-3xl animate-orb" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-[hsl(var(--premium-blue)/0.4)] blur-3xl animate-orb" style={{ animationDelay: "1.2s" }} />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--premium-pink)/0.18)] blur-3xl animate-pulse-soft" />
          {/* Twinkling stars */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            {Array.from({ length: 60 }).map((_, i) => (
              <span key={i} className="absolute block rounded-full bg-white/90 animate-twinkle" style={{ top: `${(i * 53) % 100}%`, left: `${(i * 37) % 100}%`, width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`, animationDelay: `${(i % 10) * 0.25}s`, boxShadow: "0 0 6px rgba(255,255,255,0.85)" }} />
            ))}
          </div>
          {/* Shooting stars */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={`shoot-${i}`}
                className="absolute block h-px w-40 animate-shooting-star"
                style={{
                  top: `${10 + (i * 13) % 70}%`,
                  left: `-10%`,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), rgba(124,92,255,0.6), transparent)",
                  transform: "rotate(18deg)",
                  filter: "drop-shadow(0 0 6px rgba(180,200,255,0.8))",
                  animationDelay: `${i * 1.6}s`,
                  animationDuration: `${4 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
          {/* Floating particles */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={`p-${i}`}
                className="absolute block h-1.5 w-1.5 rounded-full animate-particle-float"
                style={{
                  bottom: `-5%`,
                  left: `${(i * 71) % 100}%`,
                  background: i % 2 === 0 ? "hsl(var(--premium-violet))" : "hsl(var(--premium-blue))",
                  boxShadow: "0 0 12px currentColor",
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${8 + (i % 5)}s`,
                }}
              />
            ))}
          </div>
          {/* Mute toggle */}
          <button
            onClick={() => setIntroMuted(!introMuted)}
            className="absolute right-5 top-5 z-10 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-black text-white/80 backdrop-blur-md transition-all hover:bg-white/10"
            aria-label={introMuted ? "Ovozni yoqish" : "Ovozni o‘chirish"}
          >
            {introMuted ? "🔇 Ovozsiz" : "🔊 Ovozli"}
          </button>
          {/* Skip */}
          <button
            onClick={closeIntro}
            className="absolute left-5 top-5 z-10 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-black text-white/70 backdrop-blur-md transition-all hover:bg-white/10"
          >
            O‘tkazib yuborish →
          </button>
          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Glowing logo (no rotating ring) */}
            <div className="relative mb-8 animate-logo-pop">
              <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-[hsl(var(--premium-violet))] via-[hsl(var(--premium-blue))] to-[hsl(var(--premium-pink))] opacity-50 blur-2xl animate-glow-pulse" />
              <div className="relative grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-[hsl(var(--premium-violet))] via-[hsl(var(--premium-blue))] to-[hsl(var(--premium-pink))] shadow-[0_20px_60px_-15px_hsl(var(--premium-violet)/0.9)]">
                <GraduationCap className="h-14 w-14 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" strokeWidth={2.4} />
                <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-white/90 animate-twinkle" />
                <Sparkles className="absolute -left-3 bottom-0 h-4 w-4 text-white/80 animate-twinkle" style={{ animationDelay: "0.6s" }} />
              </div>
            </div>
            {/* Brand title */}
            <div className="relative animate-title-rise">
              <h1 className="relative text-6xl font-black leading-[1.12] tracking-normal text-white sm:text-8xl drop-shadow-[0_8px_30px_rgba(124,92,255,0.4)]">
                <span className="inline-block">EduSAT</span>{" "}
                <span className="inline-block text-white">Academy</span>
              </h1>
              {/* Underline accent */}
              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--premium-blue))] to-transparent animate-underline-grow" />
            </div>
            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-base font-bold uppercase tracking-[0.25em] text-white/60 sm:text-lg animate-subtitle-rise">
              <span className="bg-gradient-to-r from-[hsl(var(--premium-violet))] via-white to-[hsl(var(--premium-blue))] bg-clip-text text-transparent">
                Muvaffaqiyat sari birinchi qadamni tashlang
              </span>
            </p>
            {/* CTA */}
            <button
              onClick={closeIntro}
              className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[hsl(var(--premium-violet))] via-[hsl(var(--premium-blue))] to-[hsl(var(--premium-pink))] px-12 py-5 text-base font-black uppercase tracking-wider text-white shadow-[0_15px_50px_-10px_hsl(var(--premium-violet)/0.8)] transition-all hover:scale-110 hover:shadow-[0_25px_70px_-10px_hsl(var(--premium-blue)/0.9)] animate-cta-rise"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <Rocket className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Boshlash
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
      {pdfViewer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm" onClick={() => setPdfViewer(null)}>
          <div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <div className="flex items-center gap-3 truncate">
                <BookOpen className="h-5 w-5 shrink-0 text-primary" />
                <h3 className="truncate text-base font-black text-foreground">{pdfViewer.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a href={pdfViewer.url} download className="rounded-2xl border border-border px-3 py-1.5 text-xs font-black text-foreground hover:bg-accent">Yuklab olish</a>
                <button onClick={() => setPdfViewer(null)} className="grid h-9 w-9 place-items-center rounded-2xl border border-border text-foreground hover:bg-accent" aria-label="Yopish">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe src={`${pdfViewer.url}#toolbar=1&navpanes=0`} title={pdfViewer.title} className="h-full w-full flex-1 bg-background" />
          </div>
        </div>
      )}
    </main>
  );
};

export default Index;
