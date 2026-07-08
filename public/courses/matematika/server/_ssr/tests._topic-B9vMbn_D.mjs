import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tests._topic-B9vMbn_D.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "text-center py-16",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Test topilmadi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/tests",
		className: "text-primary",
		children: "← Testlar"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
