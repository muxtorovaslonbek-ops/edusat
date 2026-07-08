import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as topics } from "./topics-B_GhMlnW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BwH-d4gU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Splash({ onDone }) {
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			setP((v) => {
				if (v >= 100) {
					clearInterval(t);
					setTimeout(onDone, 300);
					return 100;
				}
				return v + 2;
			});
		}, 40);
		return () => clearInterval(t);
	}, [onDone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-8xl mb-6 neon-text font-black",
				style: { filter: "drop-shadow(0 0 30px var(--neon-purple))" },
				children: "∫"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-5xl font-black neon-text mb-2",
				children: "MathHub"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground mb-8",
				children: "Matematikani osonlashtiring"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-72 h-2 rounded-full bg-secondary overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full transition-all",
					style: {
						width: `${p}%`,
						background: "linear-gradient(90deg, var(--neon-pink), var(--neon-cyan))"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 text-sm text-muted-foreground tabular-nums",
				children: [p, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onDone,
				className: "mt-6 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors",
				children: "O'tkazib yuborish →"
			})
		]
	});
}
var sections = [
	{
		to: "/lessons",
		icon: "🎓",
		title: "Darslar",
		desc: "30+ dars: algebra, geometriya, trigonometriya, analiz, chiziqli algebra. Har birida asosiy tushunchalar."
	},
	{
		to: "/library",
		icon: "📚",
		title: "Kutubxona",
		desc: "18 ta mavzu bo'yicha to'liq nazariy materiallar. Hosilalardan qatorgacha."
	},
	{
		to: "/formulas",
		icon: "📐",
		title: "Formulalar",
		desc: "174+ matematik formula. Algebra, geometriya, trigonometriya va boshqalar."
	},
	{
		to: "/tests",
		icon: "✅",
		title: "Test bo'limi",
		desc: "Mavzular bo'yicha testlar. Savollar va avtomatik natijalar."
	},
	{
		to: "/graphics",
		icon: "📈",
		title: "Grafika",
		desc: "Funksiya grafiklarini interaktiv tarzda chizing. Formuladan grafik."
	}
];
function Index() {
	const [splash, setSplash] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && sessionStorage.getItem("mh_splash_done")) setSplash(false);
	}, []);
	const finish = () => {
		setSplash(false);
		sessionStorage.setItem("mh_splash_done", "1");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		splash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, { onDone: finish }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "text-center py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-block px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-6",
					children: "Interaktiv matematika platformasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl sm:text-7xl font-black neon-text mb-4",
					children: "Matematikani osonlashtiring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg text-muted-foreground max-w-2xl mx-auto mb-8",
					children: "Hosilalar, integrallar, differensial tenglamalar va boshqa mavzularni interaktiv tarzda o'rganing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/library",
					className: "inline-flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold neon-glow",
					style: {
						background: "linear-gradient(90deg, var(--neon-pink), var(--neon-purple))",
						color: "white"
					},
					children: "Boshlash →"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16",
					children: [
						{
							icon: "📚",
							num: "18+",
							label: "Mavzular"
						},
						{
							icon: "📐",
							num: "174+",
							label: "Formulalar"
						},
						{
							icon: "🔢",
							num: "∞",
							label: "Misollar"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-card p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl mb-2",
								children: s.icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl font-bold neon-text",
								children: s.num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground mt-1",
								children: s.label
							})
						]
					}, s.label))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground uppercase tracking-wider",
						children: "Asosiy imkoniyatlar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-bold mt-2",
						children: "To'rtta kuchli bo'lim"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-2",
						children: "Matematikani o'rganish uchun zarur bo'lgan barcha vositalar bir joyda"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
				children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: s.to,
					className: "glass-card p-6 block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl mb-3",
							children: s.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-bold mb-1",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: s.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-sm font-medium text-primary",
							children: "Ko'rish →"
						})
					]
				}, s.to))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl font-bold",
					children: "Mavzular ro'yxati"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-2",
					children: "Matematik analiz va differensial tenglamalar bo'yicha 18 ta to'liq mavzu"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: topics.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/library/$id",
					params: { id: t.id },
					className: "glass-card p-5 block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-mono px-2 py-1 rounded bg-secondary text-primary",
							children: t.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold mb-1",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground line-clamp-2",
								children: t.short
							})]
						})]
					})
				}, t.id))
			})]
		})
	] });
}
//#endregion
export { Index as component };
