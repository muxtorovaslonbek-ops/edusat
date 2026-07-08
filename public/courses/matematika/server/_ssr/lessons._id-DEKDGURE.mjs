import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Tex } from "./Tex-DGOP6Une.mjs";
import { r as lessons } from "./lessons-B9ixdxHm.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./lessons._id-BEf28pwx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons._id-DEKDGURE.js
var import_jsx_runtime = require_jsx_runtime();
function LessonView() {
	const { lesson } = Route.useLoaderData();
	const idx = lessons.findIndex((l) => l.id === lesson.id);
	const prev = idx > 0 ? lessons[idx - 1] : null;
	const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "max-w-3xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lessons",
				className: "text-sm text-muted-foreground hover:text-primary",
				children: "← Darslar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-xs uppercase tracking-wider text-primary",
				children: lesson.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold neon-text mt-1 mb-4",
				children: lesson.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-lg leading-relaxed",
				children: lesson.intro
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold mt-10 mb-4",
				children: "Asosiy tushunchalar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: lesson.concepts.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-primary mb-1",
							children: c.term
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: c.explanation
						}),
						c.formula && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-lg overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
								block: true,
								children: c.formula
							})
						})
					]
				}, i))
			}),
			lesson.example && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold mt-10 mb-4",
				children: "Yechilgan misol"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground mb-1",
						children: "Masala"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, { children: lesson.example.problem })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground mb-1",
						children: "Yechim"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, { children: lesson.example.solution }) })
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex justify-between text-sm",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lessons/$id",
					params: { id: prev.id },
					className: "text-muted-foreground hover:text-primary",
					children: ["← ", prev.title]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lessons/$id",
					params: { id: next.id },
					className: "text-muted-foreground hover:text-primary text-right",
					children: [next.title, " →"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
			})
		]
	});
}
//#endregion
export { LessonView as component };
