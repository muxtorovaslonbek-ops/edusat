import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as katex } from "../_libs/katex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Tex-DGOP6Une.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Tex({ children, block = false }) {
	const html = (0, import_react.useMemo)(() => {
		try {
			return katex.renderToString(children, {
				displayMode: block,
				throwOnError: false,
				output: "html"
			});
		} catch {
			return children;
		}
	}, [children, block]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(block ? "div" : "span", { dangerouslySetInnerHTML: { __html: html } });
}
//#endregion
export { Tex as t };
