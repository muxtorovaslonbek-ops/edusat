import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Tex } from "./Tex-DGOP6Une.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./tests._topic-DuDBWb6o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tests._topic-CRTI9IbX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TestRun() {
	const { test } = Route.useLoaderData();
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const score = Object.entries(answers).filter(([i, v]) => test.questions[+i].answer === v).length;
	const pct = Math.round(score / test.questions.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tests",
				className: "text-sm text-muted-foreground hover:text-primary",
				children: "← Testlar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold mt-3 mb-6",
				children: test.title
			}),
			submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-6 mb-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl mb-2",
						children: pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-3xl font-bold neon-text",
						children: [
							score,
							" / ",
							test.questions.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted-foreground mt-1",
						children: [pct, "% to'g'ri"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setAnswers({});
							setSubmitted(false);
						},
						className: "mt-4 px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary/10",
						children: "Qaytadan urinish"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: test.questions.map((qq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-semibold mb-3",
						children: [
							i + 1,
							". ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, { children: qq.q })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: qq.options.map((o, j) => {
							const chosen = answers[i] === j;
							const correct = submitted && qq.answer === j;
							const wrong = submitted && chosen && qq.answer !== j;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: submitted,
								onClick: () => setAnswers((a) => ({
									...a,
									[i]: j
								})),
								className: `w-full text-left px-4 py-2 rounded-lg border transition-colors ${correct ? "border-neon-green bg-neon-green/10" : wrong ? "border-destructive bg-destructive/10" : chosen ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, { children: o })
							}, j);
						})
					})]
				}, i))
			}),
			!submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setSubmitted(true),
				disabled: Object.keys(answers).length !== test.questions.length,
				className: "w-full mt-6 py-3 rounded-full font-semibold neon-glow disabled:opacity-50 disabled:cursor-not-allowed",
				style: {
					background: "linear-gradient(90deg, var(--neon-pink), var(--neon-purple))",
					color: "white"
				},
				children: [
					"Tekshirish (",
					Object.keys(answers).length,
					"/",
					test.questions.length,
					")"
				]
			})
		]
	});
}
//#endregion
export { TestRun as component };
