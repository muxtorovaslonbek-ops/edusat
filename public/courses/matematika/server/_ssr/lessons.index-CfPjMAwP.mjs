import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as lessonCategories, r as lessons } from "./lessons-B9ixdxHm.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons.index-CfPjMAwP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LessonsIndex() {
	const [cat, setCat] = (0, import_react.useState)("Hammasi");
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = lessons.filter((l) => (cat === "Hammasi" || l.category === cat) && (q === "" || l.title.toLowerCase().includes(q.toLowerCase())));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-5xl mb-3",
					children: "🎓"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold neon-text",
					children: "Darslar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-2",
					children: "Matematikaning turli sohalari bo'yicha tushunchalar va formulalar"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2 justify-center mb-4",
			children: ["Hammasi", ...lessonCategories].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setCat(c),
				className: `px-3 py-1.5 rounded-full text-sm border transition-colors ${cat === c ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`,
				children: c
			}, c))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Dars nomi bo'yicha qidirish…",
			className: "w-full max-w-md mx-auto block mb-8 px-4 py-2 rounded-full bg-secondary/60 border border-border focus:border-primary outline-none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: [filtered.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lessons/$id",
				params: { id: l.id },
				className: "glass-card p-5 block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-mono px-2 py-1 rounded bg-secondary text-primary",
						children: l.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-1",
								children: l.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold mb-1",
								children: l.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground line-clamp-2",
								children: l.intro
							})
						]
					})]
				})
			}, l.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full text-center text-muted-foreground py-8",
				children: "Hech narsa topilmadi"
			})]
		})
	] });
}
//#endregion
export { LessonsIndex as component };
