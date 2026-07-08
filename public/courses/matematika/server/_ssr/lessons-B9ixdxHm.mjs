//#region node_modules/.nitro/vite/services/ssr/assets/lessons-B9ixdxHm.js
var lessonCategories = [
	"Algebra",
	"Geometriya",
	"Trigonometriya",
	"Matematik analiz",
	"Ehtimollar va statistika",
	"Diskret matematika",
	"Chiziqli algebra"
];
var lessons = [
	{
		id: "L1",
		category: "Algebra",
		title: "Haqiqiy sonlar",
		intro: "Haqiqiy sonlar to'plami — ratsional va irratsional sonlarning birlashmasi. Ular sonlar o'qidagi barcha nuqtalarni to'ldiradi.",
		concepts: [
			{
				term: "Natural sonlar (ℕ)",
				explanation: "Sanoq sonlari: 1, 2, 3, …"
			},
			{
				term: "Butun sonlar (ℤ)",
				explanation: "Musbat, manfiy va nol."
			},
			{
				term: "Ratsional sonlar (ℚ)",
				explanation: "p/q ko'rinishdagi sonlar, q≠0."
			},
			{
				term: "Irratsional sonlar",
				explanation: "√2, π, e kabi — ratsional emas."
			},
			{
				term: "Modul",
				explanation: "Sonning o'q boshidan uzoqligi.",
				formula: "|a| = a\\text{ agar }a\\geq 0;\\; -a\\text{ agar }a<0"
			}
		],
		example: {
			problem: "|3-7| ni hisoblang",
			solution: "|3-7|=|-4|=4"
		}
	},
	{
		id: "L2",
		category: "Algebra",
		title: "Ko'phadlar va ularni ko'paytuvchilarga ajratish",
		intro: "Ko'phad — o'zgaruvchilarning butun manfiy bo'lmagan darajalari yig'indisi. Ajratish tenglamalarni yechishda muhim.",
		concepts: [
			{
				term: "Monom",
				explanation: "Bir hadli ifoda: 3x²."
			},
			{
				term: "Ko'phad darajasi",
				explanation: "Eng katta had darajasi."
			},
			{
				term: "Qisqa ko'paytirish",
				explanation: "Yig'indi kvadrati, ayirma kvadrati.",
				formula: "(a\\pm b)^2 = a^2\\pm 2ab + b^2"
			},
			{
				term: "Kvadratlar ayirmasi",
				explanation: "a² − b² = (a−b)(a+b).",
				formula: "a^2-b^2=(a-b)(a+b)"
			},
			{
				term: "Guruhlash usuli",
				explanation: "Hadlarni guruhlarga ajratib, umumiy ko'paytuvchini chiqarish."
			}
		],
		example: {
			problem: "x²−9 ni ajrating",
			solution: "x²−9 = (x−3)(x+3)"
		}
	},
	{
		id: "L3",
		category: "Algebra",
		title: "Kvadrat tenglama",
		intro: "ax² + bx + c = 0 (a≠0) ko'rinishdagi tenglama. Diskriminant va Vyet teoremasi orqali yechiladi.",
		concepts: [
			{
				term: "Diskriminant",
				explanation: "Ildizlar sonini aniqlaydi.",
				formula: "D=b^2-4ac"
			},
			{
				term: "Ildizlar formulasi",
				explanation: "D≥0 bo'lganda ikkita haqiqiy ildiz.",
				formula: "x_{1,2}=\\frac{-b\\pm\\sqrt{D}}{2a}"
			},
			{
				term: "Vyet teoremasi",
				explanation: "Ildizlar yig'indisi va ko'paytmasi.",
				formula: "x_1+x_2=-\\tfrac{b}{a},\\; x_1x_2=\\tfrac{c}{a}"
			},
			{
				term: "D<0 holi",
				explanation: "Haqiqiy ildizlar yo'q, kompleks ildizlar mavjud."
			}
		],
		example: {
			problem: "x²−5x+6=0",
			solution: "D=25−24=1, x₁=3, x₂=2"
		}
	},
	{
		id: "L4",
		category: "Algebra",
		title: "Tengsizliklar",
		intro: "Ikki ifoda orasidagi <, >, ≤, ≥ munosabatlar. Interval usuli asosiy vositalardan biri.",
		concepts: [
			{
				term: "Chiziqli tengsizlik",
				explanation: "ax + b > 0 shaklda; ikkala tomonni manfiy songa ko'paytirganda ishora o'zgaradi."
			},
			{
				term: "Kvadrat tengsizlik",
				explanation: "Parabola grafigi orqali yechiladi."
			},
			{
				term: "Interval usuli",
				explanation: "Ildizlarni sonlar o'qiga qo'yib, oraliqlar ishorasini aniqlash."
			},
			{
				term: "Modul tengsizligi",
				explanation: "|x|<a ⇔ −a<x<a; |x|>a ⇔ x<−a yoki x>a."
			}
		]
	},
	{
		id: "L5",
		category: "Algebra",
		title: "Ko'rsatkichli va logarifmik funksiyalar",
		intro: "Ko'rsatkichli funksiya y = aˣ va uning teskarisi y = log_a x — o'sish, so'nish jarayonlarini tavsiflaydi.",
		concepts: [
			{
				term: "Daraja xossalari",
				explanation: "aᵐ·aⁿ=aᵐ⁺ⁿ, (aᵐ)ⁿ=aᵐⁿ",
				formula: "a^m\\cdot a^n=a^{m+n}"
			},
			{
				term: "Logarifm ta'rifi",
				explanation: "log_a b = c ⇔ aᶜ = b.",
				formula: "\\log_a b = c \\iff a^c=b"
			},
			{
				term: "Logarifm xossalari",
				explanation: "Ko'paytma, bo'linma, daraja.",
				formula: "\\log(xy)=\\log x+\\log y"
			},
			{
				term: "Natural logarifm",
				explanation: "ln x = log_e x, bu yerda e≈2.718."
			}
		],
		example: {
			problem: "log₂ 8 = ?",
			solution: "2³=8 ⇒ log₂8 = 3"
		}
	},
	{
		id: "L6",
		category: "Algebra",
		title: "Progressiyalar",
		intro: "Arifmetik va geometrik progressiyalar — ma'lum qonuniyatga ko'ra tuzilgan sonlar ketma-ketligi.",
		concepts: [
			{
				term: "Arifmetik progressiya",
				explanation: "Har bir keyingi had oldingisidan doimiy d ga farq qiladi.",
				formula: "a_n=a_1+(n-1)d"
			},
			{
				term: "AP yig'indi",
				explanation: "n ta hadning yig'indisi.",
				formula: "S_n=\\tfrac{n}{2}(a_1+a_n)"
			},
			{
				term: "Geometrik progressiya",
				explanation: "Har bir had oldingisi q ga ko'paytmasi.",
				formula: "b_n=b_1 q^{n-1}"
			},
			{
				term: "Cheksiz GP yig'indisi",
				explanation: "|q|<1 bo'lganda.",
				formula: "S=\\tfrac{b_1}{1-q}"
			}
		]
	},
	{
		id: "L7",
		category: "Algebra",
		title: "Kompleks sonlar",
		intro: "Kompleks son z = a + bi, bu yerda i² = −1. Haqiqiy sonlar to'plamining kengaytmasi.",
		concepts: [
			{
				term: "Algebraik shakl",
				explanation: "z = a + bi, a — haqiqiy qism, b — mavhum qism."
			},
			{
				term: "Moduli",
				explanation: "z ning uzunligi.",
				formula: "|z|=\\sqrt{a^2+b^2}"
			},
			{
				term: "Qo'shma son",
				explanation: "z̄ = a − bi. z·z̄ = |z|²."
			},
			{
				term: "Trigonometrik shakl",
				explanation: "z = r(cos φ + i sin φ).",
				formula: "z=r(\\cos\\varphi+i\\sin\\varphi)"
			},
			{
				term: "Muavr formulasi",
				explanation: "Darajaga oshirish.",
				formula: "z^n=r^n(\\cos n\\varphi+i\\sin n\\varphi)"
			}
		]
	},
	{
		id: "L8",
		category: "Geometriya",
		title: "Uchburchak va uning xossalari",
		intro: "Uchburchak — uch nuqta va ularni tutashtiruvchi kesmalardan iborat eng oddiy ko'pburchak.",
		concepts: [
			{
				term: "Burchaklar yig'indisi",
				explanation: "Har qanday uchburchakda ichki burchaklar yig'indisi 180°."
			},
			{
				term: "Uchburchak turlari",
				explanation: "Tomonlariga ko'ra: teng tomonli, teng yonli, turli tomonli."
			},
			{
				term: "Pifagor teoremasi",
				explanation: "To'g'ri burchakli uchburchakda.",
				formula: "a^2+b^2=c^2"
			},
			{
				term: "Sinuslar teoremasi",
				explanation: "Har qanday uchburchak uchun.",
				formula: "\\tfrac{a}{\\sin A}=\\tfrac{b}{\\sin B}=\\tfrac{c}{\\sin C}=2R"
			},
			{
				term: "Kosinuslar teoremasi",
				explanation: "Tomonlar va burchak orasidagi bog'liqlik.",
				formula: "c^2=a^2+b^2-2ab\\cos C"
			},
			{
				term: "Yuza formulalari",
				explanation: "S = ½·a·h; S = ½·a·b·sin C; Geron formulasi."
			}
		]
	},
	{
		id: "L9",
		category: "Geometriya",
		title: "Aylana va doira",
		intro: "Aylana — tekislikda bir nuqtadan teng masofada joylashgan nuqtalar to'plami. Doira — aylana bilan chegaralangan yuza.",
		concepts: [
			{
				term: "Uzunlik",
				explanation: "L = 2πr",
				formula: "L=2\\pi r"
			},
			{
				term: "Yuza",
				explanation: "S = πr²",
				formula: "S=\\pi r^2"
			},
			{
				term: "Sektor yuzasi",
				explanation: "Markaziy burchakka mos bo'lakning yuzasi.",
				formula: "S_{\\text{sek}}=\\tfrac{\\alpha}{360°}\\pi r^2"
			},
			{
				term: "Yozilgan burchak",
				explanation: "Yozilgan burchak markaziy burchakning yarmiga teng."
			}
		]
	},
	{
		id: "L10",
		category: "Geometriya",
		title: "Ko'pburchaklar va ularning yuzalari",
		intro: "Ko'pburchak — yopiq siniq chiziq bilan chegaralangan tekislik qismi. Muntazam va nomuntazam bo'lishi mumkin.",
		concepts: [
			{
				term: "Parallelogramm",
				explanation: "S = a·h = a·b·sin α"
			},
			{
				term: "Trapetsiya",
				explanation: "S = ½(a+b)·h"
			},
			{
				term: "Romb",
				explanation: "S = ½·d₁·d₂"
			},
			{
				term: "Muntazam n-burchak",
				explanation: "Ichki burchaklar yig'indisi (n−2)·180°."
			}
		]
	},
	{
		id: "L11",
		category: "Geometriya",
		title: "Fazoviy jismlar",
		intro: "Uch o'lchamli fazodagi jismlar: prizma, piramida, silindr, konus, shar.",
		concepts: [
			{
				term: "Prizma hajmi",
				explanation: "V = S_asos · h"
			},
			{
				term: "Piramida hajmi",
				explanation: "V = ⅓·S_asos·h",
				formula: "V=\\tfrac{1}{3}S_{\\text{asos}}\\cdot h"
			},
			{
				term: "Silindr",
				explanation: "V = πr²h, S_yon = 2πrh"
			},
			{
				term: "Konus",
				explanation: "V = ⅓πr²h",
				formula: "V=\\tfrac{1}{3}\\pi r^2 h"
			},
			{
				term: "Shar",
				explanation: "V = 4/3·πr³, S = 4πr²",
				formula: "V=\\tfrac{4}{3}\\pi r^3"
			}
		]
	},
	{
		id: "L12",
		category: "Geometriya",
		title: "Koordinatalar va vektorlar",
		intro: "Dekart koordinatalar sistemasi va vektor tushunchasi — geometriya va fizikaning asosi.",
		concepts: [
			{
				term: "Ikki nuqta orasidagi masofa",
				explanation: "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"
			},
			{
				term: "Vektor moduli",
				explanation: "|a| = √(x²+y²+z²)"
			},
			{
				term: "Skalyar ko'paytma",
				explanation: "a·b = |a||b|cos φ",
				formula: "\\vec a\\cdot\\vec b=x_1x_2+y_1y_2+z_1z_2"
			},
			{
				term: "Vektor ko'paytma",
				explanation: "Faqat 3D fazoda; |a×b| = |a||b|sin φ."
			}
		]
	},
	{
		id: "L13",
		category: "Trigonometriya",
		title: "Trigonometrik funksiyalar",
		intro: "sin, cos, tan, cot — burchak va uchburchak tomonlari orasidagi bog'liqlik. Aylana orqali kengaytiriladi.",
		concepts: [
			{
				term: "Birlik aylana",
				explanation: "Radius 1 bo'lgan aylana; sin va cos qiymatlari."
			},
			{
				term: "Asosiy ayniyat",
				explanation: "sin²α + cos²α = 1",
				formula: "\\sin^2\\alpha+\\cos^2\\alpha=1"
			},
			{
				term: "Davri",
				explanation: "sin va cos — 2π, tan va cot — π."
			},
			{
				term: "Muhim qiymatlar",
				explanation: "sin 30°=½, sin 45°=√2/2, sin 60°=√3/2."
			}
		]
	},
	{
		id: "L14",
		category: "Trigonometriya",
		title: "Trigonometrik ayniyat va formulalar",
		intro: "Yig'indi, ayirma, ikkilangan burchak formulalari — trigonometriyaning kaliti.",
		concepts: [
			{
				term: "Yig'indi sinusi",
				explanation: "sin(α+β) = sin α cos β + cos α sin β",
				formula: "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
			},
			{
				term: "Yig'indi kosinusi",
				explanation: "cos(α+β) = cos α cos β − sin α sin β"
			},
			{
				term: "Ikkilangan burchak",
				explanation: "sin 2α = 2 sin α cos α",
				formula: "\\cos 2\\alpha=\\cos^2\\alpha-\\sin^2\\alpha"
			},
			{
				term: "Pasaytirish",
				explanation: "sin²α = (1−cos 2α)/2."
			}
		]
	},
	{
		id: "L15",
		category: "Trigonometriya",
		title: "Trigonometrik tenglamalar",
		intro: "sin x = a, cos x = a, tan x = a tenglamalarining umumiy yechimlari.",
		concepts: [
			{
				term: "sin x = a",
				explanation: "|a|≤1 bo'lganda x=(−1)ⁿ arcsin a + πn.",
				formula: "x=(-1)^n\\arcsin a+\\pi n"
			},
			{
				term: "cos x = a",
				explanation: "x = ±arccos a + 2πn."
			},
			{
				term: "tan x = a",
				explanation: "x = arctan a + πn."
			},
			{
				term: "Bir jinsli tenglama",
				explanation: "a sin x + b cos x = 0 ⇔ tan x = −b/a."
			}
		]
	},
	{
		id: "L16",
		category: "Matematik analiz",
		title: "Ketma-ketlik va limit",
		intro: "Ketma-ketlik — natural sonlar bo'yicha aniqlangan funksiya. Limit — hadlarning cheksizlikda intiladigan qiymati.",
		concepts: [
			{
				term: "Ketma-ketlik",
				explanation: "a₁, a₂, …, aₙ, … — sonlar tartibi."
			},
			{
				term: "Limit ta'rifi",
				explanation: "Har qanday ε>0 uchun N mavjudki, n>N da |aₙ−a|<ε."
			},
			{
				term: "Muhim limit",
				explanation: "e soni.",
				formula: "\\lim_{n\\to\\infty}\\left(1+\\tfrac{1}{n}\\right)^n=e"
			},
			{
				term: "Yaqinlashuvchi ketma-ketlik",
				explanation: "Chekli limitga ega bo'lgan ketma-ketlik."
			}
		]
	},
	{
		id: "L17",
		category: "Matematik analiz",
		title: "Funksiya limiti va uzluksizlik",
		intro: "Funksiyaning nuqtada limiti va uzluksizligi — matematik analizning asosi.",
		concepts: [
			{
				term: "Limit ta'rifi",
				explanation: "lim_{x→a} f(x) = L: x→a ga yaqinlashsa, f(x)→L."
			},
			{
				term: "Ajoyib limit 1",
				explanation: "sin x/x → 1.",
				formula: "\\lim_{x\\to 0}\\tfrac{\\sin x}{x}=1"
			},
			{
				term: "Ajoyib limit 2",
				explanation: "(1+1/x)^x → e"
			},
			{
				term: "Uzluksizlik",
				explanation: "f x=a da uzluksiz ⇔ lim f = f(a)."
			},
			{
				term: "Uzilish nuqtalari",
				explanation: "1-tur (chekli sakrash), 2-tur (cheksiz)."
			}
		]
	},
	{
		id: "L18",
		category: "Matematik analiz",
		title: "Hosila tushunchasi",
		intro: "Hosila — funksiyaning nuqtadagi o'zgarish tezligi; grafik urinmaning burchak koeffitsienti.",
		concepts: [
			{
				term: "Ta'rif",
				explanation: "Farqlar nisbatining limiti.",
				formula: "f'(x)=\\lim_{\\Delta x\\to 0}\\tfrac{f(x+\\Delta x)-f(x)}{\\Delta x}"
			},
			{
				term: "Geometrik ma'no",
				explanation: "Urinma burchagining tangensi."
			},
			{
				term: "Fizik ma'no",
				explanation: "Tezlik = yo'lning vaqt bo'yicha hosilasi."
			},
			{
				term: "Hosila jadvali",
				explanation: "(xⁿ)′=nxⁿ⁻¹, (sin x)′=cos x, (eˣ)′=eˣ."
			},
			{
				term: "Ko'paytma qoidasi",
				explanation: "(uv)′ = u′v + uv′"
			}
		],
		example: {
			problem: "y = x³ + 2x da y'(1)",
			solution: "y' = 3x²+2 ⇒ y'(1) = 5"
		}
	},
	{
		id: "L19",
		category: "Matematik analiz",
		title: "Hosilaning tadbiqlari",
		intro: "Hosila yordamida ekstremum, urinma, taqribiy hisoblash va tezlik masalalari yechiladi.",
		concepts: [
			{
				term: "Urinma tenglamasi",
				explanation: "y − y₀ = f'(x₀)(x − x₀)"
			},
			{
				term: "Monotonlik",
				explanation: "f'>0 — o'sadi; f'<0 — kamayadi."
			},
			{
				term: "Ekstremum",
				explanation: "f'(x₀)=0 bo'lganda tekshiriladi."
			},
			{
				term: "Lopital qoidasi",
				explanation: "0/0 yoki ∞/∞ ko'rinishlarda.",
				formula: "\\lim\\tfrac{f}{g}=\\lim\\tfrac{f'}{g'}"
			}
		]
	},
	{
		id: "L20",
		category: "Matematik analiz",
		title: "Boshlang'ich funksiya va integral",
		intro: "Integrallash — differensiallashga teskari amal. Boshlang'ich funksiya F(x): F'(x) = f(x).",
		concepts: [
			{
				term: "Aniqmas integral",
				explanation: "Barcha boshlang'ich funksiyalar to'plami.",
				formula: "\\int f(x)dx=F(x)+C"
			},
			{
				term: "Jadval integrallari",
				explanation: "∫xⁿdx = xⁿ⁺¹/(n+1)+C"
			},
			{
				term: "Aniq integral",
				explanation: "Nyuton–Leybnits formulasi.",
				formula: "\\int_a^b f\\,dx=F(b)-F(a)"
			},
			{
				term: "Geometrik ma'no",
				explanation: "Grafik ostidagi yuza."
			}
		]
	},
	{
		id: "L21",
		category: "Ehtimollar va statistika",
		title: "Kombinatorika asoslari",
		intro: "Kombinatorika — chekli to'plamlar elementlarini tanlash va tartiblash usullarini o'rganadi.",
		concepts: [
			{
				term: "Faktorial",
				explanation: "n! = 1·2·…·n"
			},
			{
				term: "O'rin almashtirish",
				explanation: "n elementdan Pₙ = n! ta tartib."
			},
			{
				term: "O'rinlashtirish",
				explanation: "n dan k ta.",
				formula: "A_n^k=\\tfrac{n!}{(n-k)!}"
			},
			{
				term: "Guruhlash",
				explanation: "Tartibga bog'liq emas.",
				formula: "C_n^k=\\tfrac{n!}{k!(n-k)!}"
			}
		]
	},
	{
		id: "L22",
		category: "Ehtimollar va statistika",
		title: "Ehtimollik nazariyasi",
		intro: "Hodisaning ro'y berish imkoniyatini son bilan ifodalash usuli.",
		concepts: [
			{
				term: "Klassik ta'rif",
				explanation: "P(A) = m/n; m — qulay hollar, n — barcha hollar.",
				formula: "P(A)=\\tfrac{m}{n}"
			},
			{
				term: "Ehtimol xossalari",
				explanation: "0 ≤ P(A) ≤ 1; P(Ω)=1; P(∅)=0."
			},
			{
				term: "Yig'indi qoidasi",
				explanation: "P(A∪B) = P(A) + P(B) − P(A∩B)."
			},
			{
				term: "Shartli ehtimol",
				explanation: "P(A|B) = P(A∩B)/P(B)."
			},
			{
				term: "Bernulli sxemasi",
				explanation: "n ta bog'liqmas sinov, ehtimol p."
			}
		],
		example: {
			problem: "Kubik tashlandi. 4 dan katta son tushish ehtimoli?",
			solution: "Qulay hollar: 5, 6 ⇒ P = 2/6 = 1/3."
		}
	},
	{
		id: "L23",
		category: "Ehtimollar va statistika",
		title: "Matematik statistika",
		intro: "Ma'lumotlar to'plamini tahlil qilish va tavsiflash usullari.",
		concepts: [
			{
				term: "O'rta arifmetik",
				explanation: "x̄ = (x₁+…+xₙ)/n"
			},
			{
				term: "Mediana",
				explanation: "Tartiblangan qatorning o'rtacha qiymati."
			},
			{
				term: "Moda",
				explanation: "Eng ko'p uchraydigan qiymat."
			},
			{
				term: "Dispersiya",
				explanation: "Tarqalganlik o'lchovi.",
				formula: "D=\\tfrac{1}{n}\\sum (x_i-\\bar x)^2"
			},
			{
				term: "Standart chetlanish",
				explanation: "σ = √D."
			}
		]
	},
	{
		id: "L24",
		category: "Diskret matematika",
		title: "To'plamlar nazariyasi",
		intro: "To'plam — bir xil turdagi ob'ektlar majmui. Diskret matematikaning asosi.",
		concepts: [
			{
				term: "Birlashma",
				explanation: "A ∪ B — A yoki B da bor elementlar."
			},
			{
				term: "Kesishma",
				explanation: "A ∩ B — ikkalasida ham bor elementlar."
			},
			{
				term: "Ayirma",
				explanation: "A \\ B — A da bor, B da yo'q."
			},
			{
				term: "Quvvat",
				explanation: "|A| — elementlar soni. |A∪B|=|A|+|B|−|A∩B|."
			},
			{
				term: "Dekart ko'paytma",
				explanation: "A × B — barcha (a,b) juftlik."
			}
		]
	},
	{
		id: "L25",
		category: "Diskret matematika",
		title: "Mantiq elementlari",
		intro: "Mulohaza mantiqi — rost/yolg'on qiymatlari bilan ishlaydigan mantiq turi.",
		concepts: [
			{
				term: "Konyunksiya",
				explanation: "A ∧ B — ikkalasi ham rost bo'lganda rost."
			},
			{
				term: "Disyunksiya",
				explanation: "A ∨ B — kamida bittasi rost bo'lsa rost."
			},
			{
				term: "Inkor",
				explanation: "¬A — A ning teskarisi."
			},
			{
				term: "Implikatsiya",
				explanation: "A ⇒ B — A rost va B yolg'on bo'lgandagina yolg'on."
			},
			{
				term: "De Morgan qonuni",
				explanation: "¬(A∧B) = ¬A ∨ ¬B"
			}
		]
	},
	{
		id: "L26",
		category: "Diskret matematika",
		title: "Graflar nazariyasi",
		intro: "Graf — cho'qqilar va ularni bog'lovchi qirralardan iborat obyekt. Aloqalarni modellashda ishlatiladi.",
		concepts: [
			{
				term: "Yo'naltirilgan graf",
				explanation: "Qirralar strelka bilan."
			},
			{
				term: "Cho'qqi darajasi",
				explanation: "Unga tegib turgan qirralar soni."
			},
			{
				term: "Eyler yo'li",
				explanation: "Har bir qirradan aynan bir marta o'tuvchi yo'l."
			},
			{
				term: "Daraxt",
				explanation: "Bog'langan, sikllari bo'lmagan graf. n cho'qqida n−1 qirra."
			}
		]
	},
	{
		id: "L27",
		category: "Chiziqli algebra",
		title: "Matritsalar",
		intro: "Matritsa — sonlarning to'g'ri burchakli jadvali. Chiziqli algebraning asosiy obyekti.",
		concepts: [
			{
				term: "Qo'shish",
				explanation: "Bir xil o'lchamdagi matritsalar element bo'yicha qo'shiladi."
			},
			{
				term: "Ko'paytirish",
				explanation: "A(m×n)·B(n×p) = C(m×p); qatordan ustunga skalyar ko'paytma."
			},
			{
				term: "Birlik matritsa",
				explanation: "Bosh diagonalda 1 lar, qolganida 0."
			},
			{
				term: "Transponirlangan",
				explanation: "Aᵀ — qator va ustun almashadi."
			},
			{
				term: "Teskari matritsa",
				explanation: "A·A⁻¹ = E; faqat det A ≠ 0 bo'lganda mavjud."
			}
		]
	},
	{
		id: "L28",
		category: "Chiziqli algebra",
		title: "Determinantlar",
		intro: "Determinant — kvadrat matritsaga mos son; matritsaning aylanuvchanligini aniqlaydi.",
		concepts: [
			{
				term: "2×2 determinant",
				explanation: "|a b; c d| = ad − bc.",
				formula: "\\det=ad-bc"
			},
			{
				term: "3×3 determinant",
				explanation: "Sarrus qoidasi yoki qator bo'yicha yoyish."
			},
			{
				term: "Xossalar",
				explanation: "Qator o'zaro almashsa ishora o'zgaradi; nol qatorli det = 0."
			},
			{
				term: "Kramer qoidasi",
				explanation: "Chiziqli sistema yechimi.",
				formula: "x_i=\\tfrac{\\Delta_i}{\\Delta}"
			}
		]
	},
	{
		id: "L29",
		category: "Chiziqli algebra",
		title: "Chiziqli tenglamalar sistemasi",
		intro: "Bir nechta chiziqli tenglamalarni birgalikda yechish. Gauss, Kramer, matritsa usullari mavjud.",
		concepts: [
			{
				term: "Bir jinsli sistema",
				explanation: "Ax = 0; har doim trivial yechim mavjud."
			},
			{
				term: "Bir jinsli emas",
				explanation: "Ax = b; det A ≠ 0 ⇒ yagona yechim."
			},
			{
				term: "Gauss usuli",
				explanation: "Ekvivalent almashtirishlar bilan pog'onasimon ko'rinishga keltirish."
			},
			{
				term: "Kroneker–Kapelli",
				explanation: "rank A = rank(A|b) — sistema birgalikda."
			}
		]
	},
	{
		id: "L30",
		category: "Chiziqli algebra",
		title: "Vektor fazolar va bazis",
		intro: "Vektor fazo — ma'lum aksiomalarni qanoatlantiruvchi to'plam; bazis — chiziqli erkli vektorlar to'plami.",
		concepts: [
			{
				term: "Chiziqli erklilik",
				explanation: "α₁v₁+…+αₙvₙ=0 ⇔ hamma αᵢ=0."
			},
			{
				term: "Bazis",
				explanation: "Chiziqli erkli va fazoni yopadi."
			},
			{
				term: "Fazo o'lchami",
				explanation: "Bazisdagi vektorlar soni."
			},
			{
				term: "Xos qiymat",
				explanation: "Av = λv; λ — xos son, v — xos vektor."
			}
		]
	}
];
var lessonById = (id) => lessons.find((l) => l.id === id);
//#endregion
export { lessonCategories as n, lessons as r, lessonById as t };
