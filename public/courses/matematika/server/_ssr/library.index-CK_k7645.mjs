import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as topics } from "./topics-B_GhMlnW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library.index-CK_k7645.js
var import_jsx_runtime = require_jsx_runtime();
function Library() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center mb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-5xl mb-3",
				children: "📚"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold neon-text",
				children: "Kutubxona"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-2",
				children: "18 ta mavzu bo'yicha to'liq nazariy materiallar"
			})
		]
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
	})] });
}
//#endregion
export { Library as component };
