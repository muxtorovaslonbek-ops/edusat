import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Tex } from "./Tex-DGOP6Une.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as topics } from "./topics-B_GhMlnW.mjs";
import { t as testByTopic } from "./tests-wbLTuZ5M.mjs";
import { t as Route } from "./library._id-D7HfFwnv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library._id-BzPmIWST.js
var import_jsx_runtime = require_jsx_runtime();
function TopicPage() {
	const { topic } = Route.useLoaderData();
	const idx = topics.findIndex((t) => t.id === topic.id);
	const prev = topics[idx - 1];
	const next = topics[idx + 1];
	const hasTest = !!testByTopic(topic.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "max-w-3xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/library",
				className: "text-sm text-muted-foreground hover:text-primary",
				children: "← Kutubxona"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-3 mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-mono px-2 py-1 rounded bg-secondary text-primary",
					children: topic.id
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-4xl font-bold",
					children: topic.title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-4 text-lg",
				children: topic.intro
			}),
			topic.sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card p-6 mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold neon-text mb-3",
						children: s.heading
					}),
					s.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/90 leading-relaxed",
						children: s.body
					}),
					s.formulas?.map((f, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "my-3 p-3 rounded-lg bg-secondary/40 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
							block: true,
							children: f
						})
					}, j))
				]
			}, i)),
			topic.examples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card p-6 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold neon-text mb-4",
					children: "Yechilgan misollar"
				}), topic.examples.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 last:mb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold mb-2",
							children: [
								"Misol ",
								i + 1,
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 rounded-lg bg-secondary/40 mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
								block: true,
								children: e.problem
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pl-4 border-l-2 border-primary/50 space-y-2",
							children: e.solution.map((step, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded bg-secondary/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
									block: true,
									children: step
								})
							}, j))
						})
					]
				}, i))]
			}),
			hasTest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/tests/$topic",
				params: { topic: topic.id },
				className: "glass-card p-5 mt-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold",
					children: "Bilimingizni sinang"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "Bu mavzu bo'yicha test"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-primary font-medium",
					children: "Testni boshlash →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between mt-8 gap-3",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/library/$id",
					params: { id: prev.id },
					className: "glass-card p-4 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "← Oldingi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium mt-1",
						children: [
							prev.id,
							". ",
							prev.title
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/library/$id",
					params: { id: next.id },
					className: "glass-card p-4 flex-1 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Keyingi →"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium mt-1",
						children: [
							next.id,
							". ",
							next.title
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" })]
			})
		]
	});
}
//#endregion
export { TopicPage as component };
