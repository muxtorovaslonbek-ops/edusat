import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Tex } from "./Tex-DGOP6Une.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/formulas-j5YT39BW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var id = 0;
var F = (category, name, tex) => ({
	id: ++id,
	category,
	name,
	tex
});
var formulas = [
	F("Algebra", "Kvadrat tenglama yechimi", "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"),
	F("Algebra", "Diskriminant", "D = b^2 - 4ac"),
	F("Algebra", "Vyet teoremasi", "x_1 + x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}"),
	F("Algebra", "Kvadratlar ayirmasi", "a^2 - b^2 = (a-b)(a+b)"),
	F("Algebra", "Kublar yig'indisi", "a^3 + b^3 = (a+b)(a^2 - ab + b^2)"),
	F("Algebra", "Kublar ayirmasi", "a^3 - b^3 = (a-b)(a^2 + ab + b^2)"),
	F("Algebra", "Yig'indi kvadrati", "(a+b)^2 = a^2 + 2ab + b^2"),
	F("Algebra", "Ayirma kvadrati", "(a-b)^2 = a^2 - 2ab + b^2"),
	F("Algebra", "Yig'indi kubi", "(a+b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3"),
	F("Algebra", "Ayirma kubi", "(a-b)^3 = a^3 - 3a^2 b + 3ab^2 - b^3"),
	F("Algebra", "Nyuton binomi", "(a+b)^n = \\sum_{k=0}^n \\binom{n}{k} a^{n-k} b^k"),
	F("Algebra", "Binomial koeffitsient", "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}"),
	F("Algebra", "Daraja qoidasi 1", "a^m \\cdot a^n = a^{m+n}"),
	F("Algebra", "Daraja qoidasi 2", "\\frac{a^m}{a^n} = a^{m-n}"),
	F("Algebra", "Daraja qoidasi 3", "(a^m)^n = a^{mn}"),
	F("Algebra", "Daraja qoidasi 4", "(ab)^n = a^n b^n"),
	F("Algebra", "Manfiy daraja", "a^{-n} = \\frac{1}{a^n}"),
	F("Algebra", "Kasr daraja", "a^{m/n} = \\sqrt[n]{a^m}"),
	F("Algebra", "Logarifm ta'rifi", "\\log_a b = c \\iff a^c = b"),
	F("Algebra", "Log yig'indi", "\\log_a(xy) = \\log_a x + \\log_a y"),
	F("Algebra", "Log ayirma", "\\log_a\\frac{x}{y} = \\log_a x - \\log_a y"),
	F("Algebra", "Log daraja", "\\log_a x^n = n\\log_a x"),
	F("Algebra", "Log asos almashtirish", "\\log_a b = \\frac{\\log_c b}{\\log_c a}"),
	F("Algebra", "Natural logarifm", "\\ln x = \\log_e x"),
	F("Algebra", "Arifmetik progressiya", "a_n = a_1 + (n-1)d"),
	F("Algebra", "AP yig'indisi", "S_n = \\frac{n(a_1 + a_n)}{2}"),
	F("Algebra", "Geometrik progressiya", "b_n = b_1 q^{n-1}"),
	F("Algebra", "GP yig'indisi", "S_n = \\frac{b_1(q^n - 1)}{q-1}"),
	F("Algebra", "Cheksiz GP yig'indisi", "S = \\frac{b_1}{1-q}, \\; |q|<1"),
	F("Algebra", "Faktorial", "n! = 1 \\cdot 2 \\cdot 3 \\cdots n"),
	F("Trigonometriya", "Asosiy ayniyat", "\\sin^2 x + \\cos^2 x = 1"),
	F("Trigonometriya", "Tangens", "\\tan x = \\frac{\\sin x}{\\cos x}"),
	F("Trigonometriya", "Kotangens", "\\cot x = \\frac{\\cos x}{\\sin x}"),
	F("Trigonometriya", "1 + tan²", "1 + \\tan^2 x = \\frac{1}{\\cos^2 x}"),
	F("Trigonometriya", "1 + cot²", "1 + \\cot^2 x = \\frac{1}{\\sin^2 x}"),
	F("Trigonometriya", "sin yig'indi", "\\sin(a+b) = \\sin a\\cos b + \\cos a\\sin b"),
	F("Trigonometriya", "sin ayirma", "\\sin(a-b) = \\sin a\\cos b - \\cos a\\sin b"),
	F("Trigonometriya", "cos yig'indi", "\\cos(a+b) = \\cos a\\cos b - \\sin a\\sin b"),
	F("Trigonometriya", "cos ayirma", "\\cos(a-b) = \\cos a\\cos b + \\sin a\\sin b"),
	F("Trigonometriya", "tan yig'indi", "\\tan(a+b) = \\frac{\\tan a + \\tan b}{1 - \\tan a\\tan b}"),
	F("Trigonometriya", "Ikkilangan burchak sin", "\\sin 2x = 2\\sin x\\cos x"),
	F("Trigonometriya", "Ikkilangan burchak cos", "\\cos 2x = \\cos^2 x - \\sin^2 x"),
	F("Trigonometriya", "Ikkilangan burchak tan", "\\tan 2x = \\frac{2\\tan x}{1-\\tan^2 x}"),
	F("Trigonometriya", "Yarim burchak sin", "\\sin^2\\frac{x}{2} = \\frac{1-\\cos x}{2}"),
	F("Trigonometriya", "Yarim burchak cos", "\\cos^2\\frac{x}{2} = \\frac{1+\\cos x}{2}"),
	F("Trigonometriya", "sin+sin", "\\sin a + \\sin b = 2\\sin\\frac{a+b}{2}\\cos\\frac{a-b}{2}"),
	F("Trigonometriya", "sin-sin", "\\sin a - \\sin b = 2\\cos\\frac{a+b}{2}\\sin\\frac{a-b}{2}"),
	F("Trigonometriya", "cos+cos", "\\cos a + \\cos b = 2\\cos\\frac{a+b}{2}\\cos\\frac{a-b}{2}"),
	F("Trigonometriya", "cos-cos", "\\cos a - \\cos b = -2\\sin\\frac{a+b}{2}\\sin\\frac{a-b}{2}"),
	F("Trigonometriya", "sin·cos", "\\sin a\\cos b = \\frac{1}{2}[\\sin(a+b)+\\sin(a-b)]"),
	F("Trigonometriya", "cos·cos", "\\cos a\\cos b = \\frac{1}{2}[\\cos(a-b)+\\cos(a+b)]"),
	F("Trigonometriya", "sin·sin", "\\sin a\\sin b = \\frac{1}{2}[\\cos(a-b)-\\cos(a+b)]"),
	F("Trigonometriya", "Sinuslar teoremasi", "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R"),
	F("Trigonometriya", "Kosinuslar teoremasi", "c^2 = a^2 + b^2 - 2ab\\cos C"),
	F("Trigonometriya", "arcsin xossasi", "\\sin(\\arcsin x) = x"),
	F("Trigonometriya", "arccos xossasi", "\\cos(\\arccos x) = x"),
	F("Trigonometriya", "arctan xossasi", "\\tan(\\arctan x) = x"),
	F("Trigonometriya", "Radian-daraja", "1^{\\circ} = \\frac{\\pi}{180} \\text{ rad}"),
	F("Trigonometriya", "Eyler formulasi", "e^{ix} = \\cos x + i\\sin x"),
	F("Trigonometriya", "Muhim qiymatlar", "\\sin\\frac{\\pi}{6}=\\frac{1}{2}, \\; \\cos\\frac{\\pi}{6}=\\frac{\\sqrt{3}}{2}"),
	F("Geometriya", "Uchburchak yuzasi", "S = \\frac{1}{2}ah"),
	F("Geometriya", "Uchburchak (Heron)", "S = \\sqrt{p(p-a)(p-b)(p-c)}"),
	F("Geometriya", "Uchburchak (sin)", "S = \\frac{1}{2}ab\\sin C"),
	F("Geometriya", "To'g'ri to'rtburchak", "S = ab"),
	F("Geometriya", "Kvadrat", "S = a^2, \\; P = 4a"),
	F("Geometriya", "Parallelogramm", "S = ah"),
	F("Geometriya", "Romb", "S = \\frac{1}{2} d_1 d_2"),
	F("Geometriya", "Trapetsiya", "S = \\frac{a+b}{2} \\cdot h"),
	F("Geometriya", "Doira yuzasi", "S = \\pi r^2"),
	F("Geometriya", "Doira uzunligi", "L = 2\\pi r"),
	F("Geometriya", "Doira sektori", "S = \\frac{1}{2} r^2 \\alpha"),
	F("Geometriya", "Kub hajmi", "V = a^3"),
	F("Geometriya", "Parallelepiped", "V = abc"),
	F("Geometriya", "Prizma hajmi", "V = S_{osn} \\cdot h"),
	F("Geometriya", "Piramida hajmi", "V = \\frac{1}{3} S_{osn} \\cdot h"),
	F("Geometriya", "Silindr hajmi", "V = \\pi r^2 h"),
	F("Geometriya", "Silindr yon sirti", "S_{yon} = 2\\pi r h"),
	F("Geometriya", "Konus hajmi", "V = \\frac{1}{3}\\pi r^2 h"),
	F("Geometriya", "Konus yon sirti", "S_{yon} = \\pi r l"),
	F("Geometriya", "Shar hajmi", "V = \\frac{4}{3}\\pi r^3"),
	F("Geometriya", "Shar sirti", "S = 4\\pi r^2"),
	F("Geometriya", "Pifagor teoremasi", "a^2 + b^2 = c^2"),
	F("Geometriya", "Ikki nuqta orasi", "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}"),
	F("Geometriya", "To'g'ri chiziq", "y = kx + b"),
	F("Geometriya", "Aylana tenglamasi", "(x-a)^2 + (y-b)^2 = R^2"),
	F("Hosila", "Ta'rifi", "f'(x) = \\lim_{\\Delta x \\to 0}\\frac{f(x+\\Delta x)-f(x)}{\\Delta x}"),
	F("Hosila", "O'zgarmas", "(C)' = 0"),
	F("Hosila", "Daraja", "(x^n)' = n x^{n-1}"),
	F("Hosila", "Yig'indi", "(u+v)' = u' + v'"),
	F("Hosila", "Ko'paytma", "(uv)' = u'v + uv'"),
	F("Hosila", "Bo'linma", "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}"),
	F("Hosila", "Murakkab funksiya", "(f(g(x)))' = f'(g(x)) \\cdot g'(x)"),
	F("Hosila", "sin", "(\\sin x)' = \\cos x"),
	F("Hosila", "cos", "(\\cos x)' = -\\sin x"),
	F("Hosila", "tan", "(\\tan x)' = \\frac{1}{\\cos^2 x}"),
	F("Hosila", "cot", "(\\cot x)' = -\\frac{1}{\\sin^2 x}"),
	F("Hosila", "e^x", "(e^x)' = e^x"),
	F("Hosila", "a^x", "(a^x)' = a^x \\ln a"),
	F("Hosila", "ln", "(\\ln x)' = \\frac{1}{x}"),
	F("Hosila", "log_a", "(\\log_a x)' = \\frac{1}{x\\ln a}"),
	F("Hosila", "arcsin", "(\\arcsin x)' = \\frac{1}{\\sqrt{1-x^2}}"),
	F("Hosila", "arccos", "(\\arccos x)' = -\\frac{1}{\\sqrt{1-x^2}}"),
	F("Hosila", "arctan", "(\\arctan x)' = \\frac{1}{1+x^2}"),
	F("Hosila", "arccot", "(\\text{arccot }x)' = -\\frac{1}{1+x^2}"),
	F("Hosila", "sqrt", "(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}"),
	F("Hosila", "1/x", "\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2}"),
	F("Hosila", "sh", "(\\sinh x)' = \\cosh x"),
	F("Hosila", "ch", "(\\cosh x)' = \\sinh x"),
	F("Hosila", "Leybnits", "(uv)^{(n)} = \\sum_{k=0}^n \\binom{n}{k} u^{(n-k)} v^{(k)}"),
	F("Hosila", "Differensial", "dy = f'(x)dx"),
	F("Integral", "Aniqmas ta'rif", "\\int f(x)dx = F(x) + C"),
	F("Integral", "Chiziqlilik", "\\int (af+bg)dx = a\\int f + b\\int g"),
	F("Integral", "Daraja", "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C, \\; n \\neq -1"),
	F("Integral", "1/x", "\\int \\frac{dx}{x} = \\ln|x| + C"),
	F("Integral", "e^x", "\\int e^x dx = e^x + C"),
	F("Integral", "a^x", "\\int a^x dx = \\frac{a^x}{\\ln a} + C"),
	F("Integral", "sin", "\\int \\sin x\\,dx = -\\cos x + C"),
	F("Integral", "cos", "\\int \\cos x\\,dx = \\sin x + C"),
	F("Integral", "1/cos²", "\\int \\frac{dx}{\\cos^2 x} = \\tan x + C"),
	F("Integral", "1/sin²", "\\int \\frac{dx}{\\sin^2 x} = -\\cot x + C"),
	F("Integral", "1/(1+x²)", "\\int \\frac{dx}{1+x^2} = \\arctan x + C"),
	F("Integral", "1/√(1-x²)", "\\int \\frac{dx}{\\sqrt{1-x^2}} = \\arcsin x + C"),
	F("Integral", "1/(x²-a²)", "\\int \\frac{dx}{x^2-a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right| + C"),
	F("Integral", "1/√(x²±a²)", "\\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\ln|x+\\sqrt{x^2\\pm a^2}| + C"),
	F("Integral", "sh", "\\int \\sinh x\\,dx = \\cosh x + C"),
	F("Integral", "ch", "\\int \\cosh x\\,dx = \\sinh x + C"),
	F("Integral", "tan", "\\int \\tan x\\,dx = -\\ln|\\cos x| + C"),
	F("Integral", "cot", "\\int \\cot x\\,dx = \\ln|\\sin x| + C"),
	F("Integral", "Nyuton-Leybnits", "\\int_a^b f(x)dx = F(b)-F(a)"),
	F("Integral", "Chegara almashtirish", "\\int_a^b f = -\\int_b^a f"),
	F("Integral", "Additivlik", "\\int_a^b = \\int_a^c + \\int_c^b"),
	F("Integral", "Bo'laklab", "\\int u\\,dv = uv - \\int v\\,du"),
	F("Integral", "Almashtirish", "\\int f(\\varphi(x))\\varphi'(x)dx = \\int f(t)dt"),
	F("Integral", "Egri trapetsiya", "S = \\int_a^b f(x)dx"),
	F("Integral", "Aylanma hajm", "V = \\pi \\int_a^b f^2(x) dx"),
	F("Integral", "Yoy uzunligi", "L = \\int_a^b \\sqrt{1+(f')^2}\\,dx"),
	F("Integral", "Sirt yuzasi", "S = 2\\pi \\int_a^b f(x)\\sqrt{1+(f')^2}\\,dx"),
	F("Integral", "Xosmas 1-tur", "\\int_a^\\infty f\\,dx = \\lim_{b\\to\\infty}\\int_a^b f\\,dx"),
	F("Integral", "Gauss integral", "\\int_{-\\infty}^\\infty e^{-x^2}dx = \\sqrt{\\pi}"),
	F("Integral", "Beta funksiya", "B(p,q) = \\int_0^1 x^{p-1}(1-x)^{q-1}dx"),
	F("Integral", "Gamma funksiya", "\\Gamma(n) = \\int_0^\\infty x^{n-1} e^{-x} dx"),
	F("Integral", "Ikki karrali", "\\iint_D f(x,y)\\,dx\\,dy"),
	F("Integral", "Uch karrali", "\\iiint_V f(x,y,z)\\,dV"),
	F("Integral", "Chiziqli", "\\int_L f\\,dl"),
	F("Integral", "Sirt integrali", "\\iint_S f\\,dS"),
	F("Limit", "Ta'rif", "\\lim_{x \\to a} f(x) = L"),
	F("Limit", "Birinchi ajoyib", "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1"),
	F("Limit", "Ikkinchi ajoyib", "\\lim_{x\\to\\infty}\\left(1+\\frac{1}{x}\\right)^x = e"),
	F("Limit", "Ekvivalent 1", "\\lim_{x\\to 0}\\frac{\\tan x}{x} = 1"),
	F("Limit", "Ekvivalent 2", "\\lim_{x\\to 0}\\frac{\\ln(1+x)}{x} = 1"),
	F("Limit", "Ekvivalent 3", "\\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1"),
	F("Limit", "Ekvivalent 4", "\\lim_{x\\to 0}\\frac{1-\\cos x}{x^2} = \\frac{1}{2}"),
	F("Limit", "L'Opital", "\\lim \\frac{f}{g} = \\lim \\frac{f'}{g'}"),
	F("Limit", "Uzluksizlik", "\\lim_{x\\to a} f(x) = f(a)"),
	F("Limit", "Yig'indi", "\\lim(f+g) = \\lim f + \\lim g"),
	F("Limit", "Ko'paytma", "\\lim(fg) = \\lim f \\cdot \\lim g"),
	F("Limit", "Bo'linma", "\\lim\\frac{f}{g} = \\frac{\\lim f}{\\lim g}"),
	F("Limit", "Ketma-ketlik limiti", "\\lim_{n\\to\\infty} a_n = L"),
	F("Limit", "Cheksizlik", "\\lim_{x\\to\\infty}\\frac{1}{x} = 0"),
	F("Limit", "Eksponensial o'sish", "\\lim_{x\\to\\infty}\\frac{x^n}{e^x} = 0"),
	F("Qatorlar", "Sonli qator", "\\sum_{n=1}^\\infty a_n"),
	F("Qatorlar", "Geometrik qator", "\\sum_{n=0}^\\infty q^n = \\frac{1}{1-q}, \\; |q|<1"),
	F("Qatorlar", "Garmonik", "\\sum \\frac{1}{n} \\to \\infty"),
	F("Qatorlar", "p-qator", "\\sum \\frac{1}{n^p}, \\; p>1 \\text{ yaqinlashadi}"),
	F("Qatorlar", "Dalamber", "\\lim\\left|\\frac{a_{n+1}}{a_n}\\right| < 1"),
	F("Qatorlar", "Koshi", "\\lim\\sqrt[n]{|a_n|} < 1"),
	F("Qatorlar", "Integral belgi", "\\int_1^\\infty f(x)dx \\text{ va } \\sum f(n)"),
	F("Qatorlar", "Leybnits", "\\sum (-1)^n a_n, \\; a_n \\downarrow 0"),
	F("Qatorlar", "Teylor", "f(x) = \\sum \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n"),
	F("Qatorlar", "Makloren e^x", "e^x = \\sum \\frac{x^n}{n!}"),
	F("Qatorlar", "Makloren sin", "\\sin x = \\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}"),
	F("Qatorlar", "Makloren cos", "\\cos x = \\sum \\frac{(-1)^n x^{2n}}{(2n)!}"),
	F("Qatorlar", "Makloren ln", "\\ln(1+x) = \\sum \\frac{(-1)^{n+1} x^n}{n}"),
	F("Qatorlar", "Yaqinlashish radiusi", "R = \\lim\\left|\\frac{a_n}{a_{n+1}}\\right|"),
	F("Qatorlar", "Furye qatori", "f(x) = \\frac{a_0}{2} + \\sum(a_n\\cos nx + b_n\\sin nx)")
];
var categories = Array.from(new Set(formulas.map((f) => f.category)));
function FormulasPage() {
	const [cat, setCat] = (0, import_react.useState)("Barchasi");
	const [q, setQ] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		return formulas.filter((f) => (cat === "Barchasi" || f.category === cat) && (q === "" || f.name.toLowerCase().includes(q.toLowerCase()) || f.tex.toLowerCase().includes(q.toLowerCase())));
	}, [cat, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-5xl mb-3",
					children: "📐"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold neon-text",
					children: "Formulalar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground mt-2",
					children: [formulas.length, "+ matematik formula"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-4 mb-6 sticky top-16 z-30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Formula qidirish...",
				className: "w-full bg-secondary/60 border border-border rounded-lg px-4 py-2 outline-none focus:border-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 mt-3",
				children: ["Barchasi", ...categories].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(c),
					className: `px-3 py-1 rounded-full text-sm border transition-colors ${cat === c ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"}`,
					children: c
				}, c))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
			children: [list.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: f.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground",
						children: f.category
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 rounded-lg bg-secondary/40 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
						block: true,
						children: f.tex
					})
				})]
			}, f.id)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full text-center text-muted-foreground py-12",
				children: "Hech narsa topilmadi"
			})]
		})
	] });
}
//#endregion
export { FormulasPage as component };
