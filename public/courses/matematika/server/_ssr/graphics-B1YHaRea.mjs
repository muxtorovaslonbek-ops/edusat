import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as evaluate } from "../_libs/mathjs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/graphics-B1YHaRea.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"#ff4fb1",
	"#4fc3ff",
	"#5cf2a0",
	"#ffd85c",
	"#b967ff"
];
function Graphics() {
	const canvasRef = (0, import_react.useRef)(null);
	const [funcs, setFuncs] = (0, import_react.useState)(["sin(x)", "x^2/4"]);
	const [xMin, setXMin] = (0, import_react.useState)(-10);
	const [xMax, setXMax] = (0, import_react.useState)(10);
	const [yMin, setYMin] = (0, import_react.useState)(-5);
	const [yMax, setYMax] = (0, import_react.useState)(5);
	(0, import_react.useEffect)(() => {
		const c = canvasRef.current;
		if (!c) return;
		const dpr = window.devicePixelRatio || 1;
		const W = c.clientWidth, H = c.clientHeight;
		c.width = W * dpr;
		c.height = H * dpr;
		const ctx = c.getContext("2d");
		ctx.scale(dpr, dpr);
		ctx.clearRect(0, 0, W, H);
		const px = (x) => (x - xMin) / (xMax - xMin) * W;
		const py = (y) => H - (y - yMin) / (yMax - yMin) * H;
		ctx.strokeStyle = "rgba(120,130,180,0.18)";
		ctx.lineWidth = 1;
		for (let x = Math.ceil(xMin); x <= xMax; x++) {
			ctx.beginPath();
			ctx.moveTo(px(x), 0);
			ctx.lineTo(px(x), H);
			ctx.stroke();
		}
		for (let y = Math.ceil(yMin); y <= yMax; y++) {
			ctx.beginPath();
			ctx.moveTo(0, py(y));
			ctx.lineTo(W, py(y));
			ctx.stroke();
		}
		ctx.strokeStyle = "rgba(220,225,245,0.75)";
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(0, py(0));
		ctx.lineTo(W, py(0));
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(px(0), 0);
		ctx.lineTo(px(0), H);
		ctx.stroke();
		ctx.fillStyle = "rgba(180,190,220,0.9)";
		ctx.font = "11px sans-serif";
		for (let x = Math.ceil(xMin); x <= xMax; x++) if (x !== 0) ctx.fillText(String(x), px(x) + 2, py(0) + 12);
		for (let y = Math.ceil(yMin); y <= yMax; y++) if (y !== 0) ctx.fillText(String(y), px(0) + 4, py(y) - 2);
		funcs.forEach((expr, i) => {
			if (!expr.trim()) return;
			ctx.strokeStyle = COLORS[i % COLORS.length];
			ctx.shadowColor = COLORS[i % COLORS.length];
			ctx.shadowBlur = 8;
			ctx.lineWidth = 2;
			ctx.beginPath();
			let started = false;
			const step = (xMax - xMin) / W;
			for (let x = xMin; x <= xMax; x += step) try {
				const y = evaluate(expr, { x });
				if (typeof y !== "number" || !isFinite(y)) {
					started = false;
					continue;
				}
				if (!started) {
					ctx.moveTo(px(x), py(y));
					started = true;
				} else ctx.lineTo(px(x), py(y));
			} catch {
				started = false;
			}
			ctx.stroke();
			ctx.shadowBlur = 0;
		});
	}, [
		funcs,
		xMin,
		xMax,
		yMin,
		yMax
	]);
	const update = (i, v) => setFuncs((f) => f.map((x, j) => i === j ? v : x));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center mb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-5xl mb-3",
				children: "📈"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold neon-text",
				children: "Grafika"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-2",
				children: "Funksiyani kiriting va grafigini ko'ring"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-4 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold mb-2",
						children: "Funksiyalar"
					}),
					funcs.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-3 h-3 rounded-full",
								style: { background: COLORS[i % COLORS.length] }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "y ="
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: f,
								onChange: (e) => update(i, e.target.value),
								className: "flex-1 bg-secondary/60 border border-border rounded px-2 py-1 text-sm font-mono outline-none focus:border-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFuncs((fs) => fs.filter((_, j) => j !== i)),
								className: "text-muted-foreground hover:text-destructive",
								children: "×"
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFuncs((fs) => [...fs, ""]),
						className: "text-sm text-primary hover:underline",
						children: "+ Funksiya qo'shish"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold mb-2",
					children: "Oraliq"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground mb-0.5",
								children: "x min"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: xMin,
								onChange: (e) => setXMin(Number(e.target.value)),
								className: "w-full bg-secondary/60 border border-border rounded px-2 py-1 outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground mb-0.5",
								children: "x max"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: xMax,
								onChange: (e) => setXMax(Number(e.target.value)),
								className: "w-full bg-secondary/60 border border-border rounded px-2 py-1 outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground mb-0.5",
								children: "y min"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: yMin,
								onChange: (e) => setYMin(Number(e.target.value)),
								className: "w-full bg-secondary/60 border border-border rounded px-2 py-1 outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground mb-0.5",
								children: "y max"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: yMax,
								onChange: (e) => setYMax(Number(e.target.value)),
								className: "w-full bg-secondary/60 border border-border rounded px-2 py-1 outline-none focus:border-primary"
							})]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						"Namuna: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "sin(x)" }),
						", ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "x^2" }),
						", ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "1/x" }),
						", ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "exp(x)" }),
						", ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "log(x)" }),
						", ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "abs(x)" })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass-card p-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "w-full h-[500px] rounded-lg",
				style: { background: "#0b0d1c" }
			})
		})]
	})] });
}
//#endregion
export { Graphics as component };
