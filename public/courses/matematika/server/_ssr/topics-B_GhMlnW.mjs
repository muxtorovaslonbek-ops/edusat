//#region node_modules/.nitro/vite/services/ssr/assets/topics-B_GhMlnW.js
var topics = [
	{
		id: "M1",
		title: "Yuqori tartibli hosilalar",
		short: "Ikkinchi tartibli hosilaning mexanik ma'nosi, hosilaning tadbiqlari, funksiyaning differensiali.",
		intro: "Funksiyaning birinchi hosilasidan yana hosila olish natijasida yuqori tartibli hosilalar hosil bo'ladi. Bu hosilalar fizikada tezlanish, egrilik va boshqa tushunchalarni ifodalashda ishlatiladi.",
		sections: [
			{
				heading: "Ta'rif",
				body: "f(x) funksiyaning n-tartibli hosilasi — bu (n-1)-tartibli hosilasidan olingan hosiladir.",
				formulas: ["f^{(n)}(x) = \\frac{d}{dx}\\left[f^{(n-1)}(x)\\right]", "f''(x) = \\frac{d^2 f}{dx^2}"]
			},
			{
				heading: "Mexanik ma'nosi",
				body: "Agar s(t) — jismning t vaqtdagi yo'li bo'lsa, s'(t) tezlik, s''(t) esa tezlanishdir.",
				formulas: ["v(t) = s'(t)", "a(t) = s''(t)"]
			},
			{
				heading: "Leybnits formulasi",
				body: "Ikki funksiya ko'paytmasining n-tartibli hosilasi.",
				formulas: ["(uv)^{(n)} = \\sum_{k=0}^{n} \\binom{n}{k} u^{(n-k)} v^{(k)}"]
			},
			{
				heading: "Differensial",
				body: "Funksiya differensiali — argumentning kichik o'zgarishida funksiyaning chiziqli qismidir.",
				formulas: ["dy = f'(x)\\,dx", "d^n y = f^{(n)}(x)\\,dx^n"]
			}
		],
		examples: [{
			problem: "y = x^4 - 3x^2 + 5, y''' = ?",
			solution: [
				"y' = 4x^3 - 6x",
				"y'' = 12x^2 - 6",
				"y''' = 24x"
			]
		}, {
			problem: "y = \\sin x uchun y^{(n)} = ?",
			solution: [
				"y' = \\cos x = \\sin(x + \\pi/2)",
				"y'' = -\\sin x = \\sin(x + \\pi)",
				"y^{(n)} = \\sin(x + n\\pi/2)"
			]
		}]
	},
	{
		id: "M2",
		title: "Funksiyaning monotonligi va ekstremumi",
		short: "O'suvchi va kamayuvchi funksiyalar, lokal maksimum va minimum nuqtalari.",
		intro: "Hosila yordamida funksiyaning o'suvchi yoki kamayuvchi bo'lishini va ekstremum nuqtalarini aniqlash mumkin.",
		sections: [
			{
				heading: "Monotonlik alomati",
				body: "Agar (a,b) oraliqda f'(x) > 0 bo'lsa, funksiya o'sadi; f'(x) < 0 bo'lsa, kamayadi.",
				formulas: ["f'(x) > 0 \\Rightarrow f \\uparrow", "f'(x) < 0 \\Rightarrow f \\downarrow"]
			},
			{
				heading: "Ekstremumning zaruriy sharti",
				body: "Agar x₀ nuqta ekstremum bo'lsa, u yerda f'(x₀) = 0 yoki f'(x₀) mavjud emas.",
				formulas: ["f'(x_0) = 0"]
			},
			{
				heading: "Ekstremumning yetarli sharti",
				body: "Hosila ishorasi + dan – ga o'zgarsa — maksimum; – dan + ga — minimum.",
				formulas: ["f''(x_0) < 0 \\Rightarrow \\max", "f''(x_0) > 0 \\Rightarrow \\min"]
			}
		],
		examples: [{
			problem: "y = x^3 - 3x ekstremumini toping",
			solution: [
				"y' = 3x^2 - 3 = 0",
				"x = \\pm 1",
				"y''(1) = 6 > 0 \\Rightarrow \\min, y_{\\min} = -2",
				"y''(-1) = -6 < 0 \\Rightarrow \\max, y_{\\max} = 2"
			]
		}]
	},
	{
		id: "M3",
		title: "Funksiya grafigining qavariqligi va burilish nuqtalari",
		short: "Ikkinchi tartibli hosila yordamida grafik shakli.",
		intro: "Grafikning yuqoriga yoki pastga qavariqligi ikkinchi hosila ishorasi bilan aniqlanadi.",
		sections: [{
			heading: "Qavariqlik alomati",
			body: "f''(x) > 0 bo'lsa, grafik pastga qavariq (∪); f''(x) < 0 bo'lsa, yuqoriga qavariq (∩).",
			formulas: ["f''(x) > 0 \\Rightarrow \\cup", "f''(x) < 0 \\Rightarrow \\cap"]
		}, {
			heading: "Burilish nuqtasi",
			body: "Qavariqlik o'zgargan nuqta — burilish nuqtasi. Bu nuqtada f''(x) = 0 yoki mavjud emas.",
			formulas: ["f''(x_0) = 0"]
		}],
		examples: [{
			problem: "y = x^3 - 6x^2 burilish nuqtasi",
			solution: [
				"y'' = 6x - 12 = 0",
				"x = 2, \\; y(2) = -16",
				"Burilish: (2, -16)"
			]
		}]
	},
	{
		id: "M4",
		title: "Funksiya grafigining asimptotalari",
		short: "Vertikal, gorizontal va og'ma asimptotalar.",
		intro: "Asimptota — funksiya grafigi cheksizlikda unga yaqinlashib boradigan to'g'ri chiziq.",
		sections: [
			{
				heading: "Vertikal asimptota",
				body: "x = a nuqtada funksiya cheksizlikka teng bo'lsa.",
				formulas: ["\\lim_{x \\to a} f(x) = \\pm\\infty"]
			},
			{
				heading: "Gorizontal asimptota",
				body: "Cheksizlikdagi chekli limit.",
				formulas: ["\\lim_{x \\to \\pm\\infty} f(x) = b"]
			},
			{
				heading: "Og'ma asimptota",
				body: "y = kx + b ko'rinishida.",
				formulas: ["k = \\lim_{x \\to \\infty} \\frac{f(x)}{x}", "b = \\lim_{x \\to \\infty}(f(x) - kx)"]
			}
		],
		examples: [{
			problem: "y = \\frac{x^2+1}{x} asimptotalari",
			solution: [
				"x = 0 — vertikal",
				"k = \\lim \\frac{x^2+1}{x^2} = 1",
				"b = \\lim(\\frac{x^2+1}{x} - x) = 0",
				"y = x — og'ma asimptota"
			]
		}]
	},
	{
		id: "M5",
		title: "Funksiyani to'liq tekshirish va grafigini yasash",
		short: "Aniqlanish sohasi, ekstremum, qavariqlik, asimptota bo'yicha grafik.",
		intro: "Funksiyani to'liq o'rganish quyidagi qadamlar ketma-ketligidan iborat.",
		sections: [{
			heading: "Tekshirish sxemasi",
			body: "1) Aniqlanish sohasi; 2) Juftlik/toqlik; 3) Kesishish nuqtalari; 4) Uzilish nuqtalari va asimptotalar; 5) f'(x) — monotonlik, ekstremum; 6) f''(x) — qavariqlik, burilish; 7) Grafikni yasash."
		}],
		examples: [{
			problem: "y = x^3 - 3x + 2 grafigini yasang",
			solution: [
				"D(y) = \\mathbb{R}",
				"y' = 3x^2 - 3, \\; x = \\pm 1",
				"\\max = (−1, 4), \\; \\min = (1, 0)",
				"y'' = 6x, \\; burilish: (0, 2)"
			]
		}]
	},
	{
		id: "M6",
		title: "Aniqmas integral",
		short: "Boshlang'ich funksiya va uning xossalari, jadval integrallar.",
		intro: "F'(x) = f(x) shartni qanoatlantiruvchi F(x) — f(x) funksiyaning boshlang'ich funksiyasidir. Barcha boshlang'ich funksiyalar to'plami aniqmas integral deyiladi.",
		sections: [
			{
				heading: "Ta'rif",
				body: "Aniqmas integral — barcha boshlang'ich funksiyalar to'plami.",
				formulas: ["\\int f(x)\\,dx = F(x) + C"]
			},
			{
				heading: "Asosiy xossalar",
				body: "Chiziqlilik xossasi.",
				formulas: ["\\int (af(x) + bg(x))dx = a\\int f(x)dx + b\\int g(x)dx", "\\left(\\int f(x)dx\\right)' = f(x)"]
			},
			{
				heading: "Jadval integrallar",
				body: "Muhim integrallar.",
				formulas: [
					"\\int x^n dx = \\frac{x^{n+1}}{n+1} + C",
					"\\int \\frac{dx}{x} = \\ln|x| + C",
					"\\int e^x dx = e^x + C",
					"\\int \\sin x\\,dx = -\\cos x + C",
					"\\int \\cos x\\,dx = \\sin x + C"
				]
			}
		],
		examples: [{
			problem: "\\int (3x^2 - 2x + 5)dx",
			solution: ["= x^3 - x^2 + 5x + C"]
		}]
	},
	{
		id: "M7",
		title: "Integrallash usullari",
		short: "O'zgaruvchini almashtirish va bo'laklab integrallash.",
		intro: "Integrallashning ikki asosiy usuli — o'zgaruvchini almashtirish va bo'laklab integrallashdir.",
		sections: [{
			heading: "O'zgaruvchini almashtirish",
			body: "t = φ(x) almashtirish orqali.",
			formulas: ["\\int f(\\varphi(x))\\varphi'(x)\\,dx = \\int f(t)\\,dt"]
		}, {
			heading: "Bo'laklab integrallash",
			body: "u va v — differensiallanuvchi funksiyalar.",
			formulas: ["\\int u\\,dv = uv - \\int v\\,du"]
		}],
		examples: [{
			problem: "\\int x e^x dx",
			solution: [
				"u = x, \\; dv = e^x dx",
				"du = dx, \\; v = e^x",
				"= xe^x - \\int e^x dx = xe^x - e^x + C"
			]
		}, {
			problem: "\\int \\sin(2x)dx",
			solution: ["t = 2x, dt = 2dx", "= \\frac{1}{2}\\int \\sin t\\,dt = -\\frac{1}{2}\\cos(2x) + C"]
		}]
	},
	{
		id: "M8",
		title: "Ratsional funksiyalarni integrallash",
		short: "Sodda kasrlarga ajratish usuli.",
		intro: "Har qanday ratsional funksiya sodda kasrlar yig'indisi sifatida yozilishi mumkin.",
		sections: [{
			heading: "Sodda kasrlar",
			body: "To'rt turdagi sodda kasrlar mavjud.",
			formulas: ["\\frac{A}{x-a}, \\; \\frac{A}{(x-a)^k}, \\; \\frac{Mx+N}{x^2+px+q}, \\; \\frac{Mx+N}{(x^2+px+q)^k}"]
		}],
		examples: [{
			problem: "\\int \\frac{dx}{x^2-1}",
			solution: ["\\frac{1}{x^2-1} = \\frac{1}{2}\\left(\\frac{1}{x-1} - \\frac{1}{x+1}\\right)", "= \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C"]
		}]
	},
	{
		id: "M9",
		title: "Trigonometrik funksiyalarni integrallash",
		short: "Universal almashtirish va maxsus formulalar.",
		intro: "Trigonometrik integrallarni yechishda t = tan(x/2) universal almashtirishdan foydalaniladi.",
		sections: [{
			heading: "Universal almashtirish",
			body: "t = tan(x/2)",
			formulas: [
				"\\sin x = \\frac{2t}{1+t^2}",
				"\\cos x = \\frac{1-t^2}{1+t^2}",
				"dx = \\frac{2\\,dt}{1+t^2}"
			]
		}],
		examples: [{
			problem: "\\int \\sin^2 x\\,dx",
			solution: ["\\sin^2 x = \\frac{1-\\cos 2x}{2}", "= \\frac{x}{2} - \\frac{\\sin 2x}{4} + C"]
		}]
	},
	{
		id: "M10",
		title: "Aniq integral",
		short: "Nyuton-Leybnits formulasi va xossalari.",
		intro: "Aniq integral — integrallash yig'indisining limitidir va yopiq oraliqdagi soha yuzasini ifodalaydi.",
		sections: [{
			heading: "Nyuton-Leybnits formulasi",
			body: "F(x) — f(x)ning boshlang'ich funksiyasi.",
			formulas: ["\\int_a^b f(x)\\,dx = F(b) - F(a)"]
		}, {
			heading: "Xossalari",
			body: "Chegaralarni almashtirish, additivlik.",
			formulas: ["\\int_a^b f = -\\int_b^a f", "\\int_a^b f = \\int_a^c f + \\int_c^b f"]
		}],
		examples: [{
			problem: "\\int_0^1 x^2 dx",
			solution: ["= \\left.\\frac{x^3}{3}\\right|_0^1 = \\frac{1}{3}"]
		}]
	},
	{
		id: "M11",
		title: "Aniq integralning tadbiqlari",
		short: "Yuza, hajm, yoy uzunligi va aylanma sirt.",
		intro: "Aniq integral yordamida geometriya va fizikaning ko'plab masalalari yechiladi.",
		sections: [
			{
				heading: "Egri chiziqli trapetsiya yuzasi",
				body: "",
				formulas: ["S = \\int_a^b f(x)\\,dx"]
			},
			{
				heading: "Aylanma jism hajmi",
				body: "Ox o'qi atrofida.",
				formulas: ["V = \\pi\\int_a^b f^2(x)\\,dx"]
			},
			{
				heading: "Yoy uzunligi",
				body: "",
				formulas: ["L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\,dx"]
			}
		],
		examples: [{
			problem: "y = x^2, y=0, x=1 chegaralangan yuza",
			solution: ["S = \\int_0^1 x^2 dx = \\frac{1}{3}"]
		}]
	},
	{
		id: "M12",
		title: "Xosmas integrallar",
		short: "Cheksiz chegarali va uzilish nuqtali integrallar.",
		intro: "Xosmas integral — chegaralari cheksiz yoki integralanuvchi funksiya uzilishga ega bo'lgan integraldir.",
		sections: [{
			heading: "1-tur xosmas integral",
			body: "Chegaralar cheksiz.",
			formulas: ["\\int_a^\\infty f(x)dx = \\lim_{b \\to \\infty}\\int_a^b f(x)dx"]
		}, {
			heading: "2-tur xosmas integral",
			body: "Uzilish nuqtasi.",
			formulas: ["\\int_a^b f dx = \\lim_{\\varepsilon \\to 0}\\int_a^{b-\\varepsilon} f dx"]
		}],
		examples: [{
			problem: "\\int_1^\\infty \\frac{dx}{x^2}",
			solution: ["= \\lim_{b \\to \\infty}\\left(-\\frac{1}{x}\\right)\\Big|_1^b = 1"]
		}]
	},
	{
		id: "M13",
		title: "Differensial tenglamalar. Umumiy tushunchalar",
		short: "Tenglama tartibi, umumiy va xususiy yechim, Koshi masalasi.",
		intro: "Differensial tenglama — noma'lum funksiya va uning hosilalarini bog'lovchi tenglama.",
		sections: [{
			heading: "Ta'rif",
			body: "n-tartibli DT.",
			formulas: ["F(x, y, y', y'', \\ldots, y^{(n)}) = 0"]
		}, {
			heading: "Koshi masalasi",
			body: "Boshlang'ich shart bilan yechim topish.",
			formulas: ["y(x_0) = y_0"]
		}],
		examples: [{
			problem: "y' = 2x, \\; y(0)=1",
			solution: [
				"y = x^2 + C",
				"1 = 0 + C \\Rightarrow C=1",
				"y = x^2 + 1"
			]
		}]
	},
	{
		id: "M14",
		title: "1-tartibli differensial tenglamalar",
		short: "O'zgaruvchilari ajraladigan va bir jinsli tenglamalar.",
		intro: "1-tartibli DTning turli ko'rinishlari va ularni yechish usullari.",
		sections: [{
			heading: "O'zgaruvchilari ajraladigan",
			body: "",
			formulas: ["\\frac{dy}{dx} = f(x)g(y)", "\\int \\frac{dy}{g(y)} = \\int f(x)dx"]
		}, {
			heading: "Chiziqli DT",
			body: "Bernulli usuli yoki integrallovchi ko'paytuvchi.",
			formulas: ["y' + P(x)y = Q(x)", "y = e^{-\\int P dx}\\left(\\int Q e^{\\int P dx}dx + C\\right)"]
		}],
		examples: [{
			problem: "y' = xy",
			solution: [
				"\\frac{dy}{y} = x\\,dx",
				"\\ln|y| = \\frac{x^2}{2} + C_1",
				"y = Ce^{x^2/2}"
			]
		}]
	},
	{
		id: "M15",
		title: "2-tartibli o'zgarmas koeffitsientli chiziqli DT",
		short: "Xarakteristik tenglama va yechimning ko'rinishi.",
		intro: "y'' + py' + qy = 0 ko'rinishdagi DTni xarakteristik tenglama orqali yechamiz.",
		sections: [{
			heading: "Xarakteristik tenglama",
			body: "",
			formulas: ["k^2 + pk + q = 0"]
		}, {
			heading: "Uch hol",
			body: "Diskriminantga qarab.",
			formulas: [
				"D>0: y = C_1 e^{k_1 x} + C_2 e^{k_2 x}",
				"D=0: y = (C_1 + C_2 x)e^{kx}",
				"D<0: y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)"
			]
		}],
		examples: [{
			problem: "y'' - 5y' + 6y = 0",
			solution: [
				"k^2 - 5k + 6 = 0",
				"k_1 = 2, k_2 = 3",
				"y = C_1 e^{2x} + C_2 e^{3x}"
			]
		}]
	},
	{
		id: "M16",
		title: "Sonli qatorlar",
		short: "Qatorning yaqinlashishi va Dalamber, Koshi belgilari.",
		intro: "Sonli qator — cheksiz sonli hadlar yig'indisi. Uning yaqinlashishi qismiy yig'indi limitiga bog'liq.",
		sections: [
			{
				heading: "Yaqinlashish",
				body: "",
				formulas: ["\\sum_{n=1}^\\infty a_n = \\lim_{N \\to \\infty}\\sum_{n=1}^N a_n"]
			},
			{
				heading: "Dalamber belgisi",
				body: "",
				formulas: ["\\lim_{n \\to \\infty}\\left|\\frac{a_{n+1}}{a_n}\\right| = L", "L<1: \\text{yaqinlashadi}, \\; L>1: \\text{uzoqlashadi}"]
			},
			{
				heading: "Koshi belgisi",
				body: "",
				formulas: ["\\lim_{n \\to \\infty}\\sqrt[n]{|a_n|} = L"]
			}
		],
		examples: [{
			problem: "\\sum \\frac{n}{2^n} yaqinlashadimi?",
			solution: ["\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{n+1}{2n} \\to \\frac{1}{2} < 1", "Yaqinlashadi"]
		}]
	},
	{
		id: "M17",
		title: "Darajali qatorlar",
		short: "Yaqinlashish radiusi va oralig'i.",
		intro: "Darajali qator ∑aₙ(x - x₀)ⁿ ko'rinishida bo'lib, o'z yaqinlashish oralig'iga ega.",
		sections: [{
			heading: "Yaqinlashish radiusi",
			body: "Koshi-Adamar formulasi.",
			formulas: ["R = \\frac{1}{\\limsup \\sqrt[n]{|a_n|}}", "R = \\lim\\left|\\frac{a_n}{a_{n+1}}\\right|"]
		}],
		examples: [{
			problem: "\\sum \\frac{x^n}{n!} radiusi",
			solution: ["R = \\lim\\frac{(n+1)!}{n!} = \\infty", "Barcha x uchun yaqinlashadi"]
		}]
	},
	{
		id: "M18",
		title: "Teylor va Makloren qatorlari",
		short: "Funksiyani darajali qatorga yoyish.",
		intro: "Analitik funksiyani nuqta atrofida darajali qator sifatida yozish mumkin.",
		sections: [{
			heading: "Teylor qatori",
			body: "x₀ nuqta atrofida.",
			formulas: ["f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n"]
		}, {
			heading: "Muhim yoyilmalar",
			body: "",
			formulas: [
				"e^x = \\sum \\frac{x^n}{n!}",
				"\\sin x = \\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}",
				"\\cos x = \\sum \\frac{(-1)^n x^{2n}}{(2n)!}",
				"\\ln(1+x) = \\sum \\frac{(-1)^{n+1} x^n}{n}"
			]
		}],
		examples: [{
			problem: "e^x ni Makloren qatoriga yoying",
			solution: ["f^{(n)}(0) = 1", "e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\ldots"]
		}]
	}
];
var topicById = (id) => topics.find((t) => t.id === id);
//#endregion
export { topics as n, topicById as t };
