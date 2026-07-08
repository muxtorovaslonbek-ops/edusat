import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$8 } from "./lessons._id-BEf28pwx.mjs";
import { n as topics } from "./topics-B_GhMlnW.mjs";
import { n as tests } from "./tests-wbLTuZ5M.mjs";
import { t as Route$9 } from "./library._id-D7HfFwnv.mjs";
import { t as Route$10 } from "./tests._topic-DuDBWb6o.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CQUYoSfw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SYMBOLS = [
	"∫",
	"∑",
	"π",
	"∞",
	"√",
	"Δ",
	"∂",
	"∇",
	"∏",
	"∈",
	"θ",
	"λ",
	"Ω",
	"α",
	"β",
	"γ",
	"φ",
	"ψ",
	"ζ",
	"ε",
	"μ",
	"σ",
	"τ",
	"ρ"
];
var COLORS = [
	"var(--neon-pink)",
	"var(--neon-purple)",
	"var(--neon-blue)",
	"var(--neon-cyan)",
	"var(--neon-green)",
	"var(--neon-yellow)",
	"var(--neon-orange)"
];
function MathBackground() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "math-bg",
		"aria-hidden": "true",
		children: Array.from({ length: 22 }, (_, i) => {
			const s = SYMBOLS[i % SYMBOLS.length];
			const c = COLORS[i % COLORS.length];
			const top = i * 53 % 95;
			const left = (i * 37 + 7) % 95;
			const size = 24 + i * 13 % 60;
			const delay = i % 10 * .7;
			const dur = 10 + i % 8 * 1.4;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "floating-symbol",
				style: {
					top: `${top}%`,
					left: `${left}%`,
					color: c,
					fontSize: `${size}px`,
					animationDelay: `${delay}s`,
					animationDuration: `${dur}s`
				},
				children: s
			}, i);
		})
	});
}
var links = [
	{
		to: "/lessons",
		label: "Darslar",
		icon: "🎓"
	},
	{
		to: "/library",
		label: "Kutubxona",
		icon: "📚"
	},
	{
		to: "/formulas",
		label: "Formulalar",
		icon: "📐"
	},
	{
		to: "/tests",
		label: "Testlar",
		icon: "✅"
	},
	{
		to: "/graphics",
		label: "Grafika",
		icon: "📈"
	}
];
function Nav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 backdrop-blur-md bg-background/60 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 font-bold text-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl",
					children: "∫"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "neon-text",
					children: "MathHub"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex items-center gap-1 sm:gap-2 text-sm",
				children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: l.to,
					className: "px-3 py-2 rounded-lg hover:bg-secondary/60 transition-colors flex items-center gap-1.5",
					activeProps: { className: "px-3 py-2 rounded-lg bg-secondary/80 text-primary flex items-center gap-1.5" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: l.label
					})]
				}, l.to))
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t border-border py-8 text-center text-sm text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"© ",
			(/* @__PURE__ */ new Date()).getFullYear(),
			" MathHub — Matematikani osonlashtiring"
		] })
	});
}
var styles_default = "/courses/matematika/assets/styles-Bk8yr-gJ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "MathHub — Matematikani osonlashtiring" },
			{
				name: "description",
				content: "Interaktiv matematika platformasi: 18 mavzu, 174+ formula, testlar va grafik chizish vositasi."
			},
			{
				name: "author",
				content: "MathHub"
			},
			{
				property: "og:title",
				content: "MathHub — Matematikani osonlashtiring"
			},
			{
				property: "og:description",
				content: "Interaktiv matematika platformasi: 18 mavzu, 174+ formula, testlar va grafik chizish vositasi."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "MathHub — Matematikani osonlashtiring"
			},
			{
				name: "twitter:description",
				content: "Interaktiv matematika platformasi: 18 mavzu, 174+ formula, testlar va grafik chizish vositasi."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1ef3fd16-582b-47ae-9fc3-5ef972e38e63/id-preview-a4707caf--8b244bb5-463e-49d4-8691-afa47cb13e9e.lovable.app-1783441094128.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1ef3fd16-582b-47ae-9fc3-5ef972e38e63/id-preview-a4707caf--8b244bb5-463e-49d4-8691-afa47cb13e9e.lovable.app-1783441094128.png"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "max-w-6xl mx-auto px-4 py-8 min-h-[70vh]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var BASE_URL = "";
var Route$6 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		"/",
		"/library",
		"/formulas",
		"/tests",
		"/graphics",
		...topics.map((t) => `/library/${t.id}`),
		...tests.map((t) => `/tests/${t.topicId}`)
	].map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$5 = () => import("./graphics-B1YHaRea.mjs");
var Route$5 = createFileRoute("/graphics")({
	head: () => ({ meta: [
		{ title: "Grafika — MathHub" },
		{
			name: "description",
			content: "Funksiya grafiklarini interaktiv chizish. Formuladan grafik."
		},
		{
			property: "og:title",
			content: "Grafika — MathHub"
		},
		{
			property: "og:description",
			content: "Interaktiv funksiya grafik quruvchisi."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./formulas-j5YT39BW.mjs");
var Route$4 = createFileRoute("/formulas")({
	head: () => ({ meta: [
		{ title: "Formulalar — MathHub" },
		{
			name: "description",
			content: "174+ matematik formula: algebra, geometriya, trigonometriya, hosila, integral, limit, qatorlar."
		},
		{
			property: "og:title",
			content: "Formulalar — MathHub"
		},
		{
			property: "og:description",
			content: "174+ formula bir joyda, KaTeX bilan render qilingan."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./routes-BwH-d4gU.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./tests.index-CZSTBJ9o.mjs");
var Route$2 = createFileRoute("/tests/")({
	head: () => ({ meta: [
		{ title: "Testlar — MathHub" },
		{
			name: "description",
			content: "Matematika mavzulari bo'yicha testlar va avtomatik natijalar."
		},
		{
			property: "og:title",
			content: "Testlar — MathHub"
		},
		{
			property: "og:description",
			content: "Mavzular bo'yicha testlar, avtomatik natijalar."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./library.index-CK_k7645.mjs");
var Route$1 = createFileRoute("/library/")({
	head: () => ({ meta: [
		{ title: "Kutubxona — MathHub" },
		{
			name: "description",
			content: "18 ta to'liq matematika mavzusi: hosila, integral, differensial tenglamalar, qatorlar."
		},
		{
			property: "og:title",
			content: "Kutubxona — MathHub"
		},
		{
			property: "og:description",
			content: "18 mavzu bo'yicha to'liq nazariy materiallar."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./lessons.index-CfPjMAwP.mjs");
var Route = createFileRoute("/lessons/")({
	head: () => ({ meta: [
		{ title: "Darslar — MathHub" },
		{
			name: "description",
			content: "Matematika bo'yicha 30+ darslar: algebra, geometriya, trigonometriya, matematik analiz, chiziqli algebra va boshqalar."
		},
		{
			property: "og:title",
			content: "Darslar — MathHub"
		},
		{
			property: "og:description",
			content: "Har bir dars ichida asosiy tushunchalar va formulalar tushuntirilgan."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SitemapDotxmlRoute = Route$6.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$7
});
var GraphicsRoute = Route$5.update({
	id: "/graphics",
	path: "/graphics",
	getParentRoute: () => Route$7
});
var FormulasRoute = Route$4.update({
	id: "/formulas",
	path: "/formulas",
	getParentRoute: () => Route$7
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var TestsIndexRoute = Route$2.update({
	id: "/tests/",
	path: "/tests/",
	getParentRoute: () => Route$7
});
var LibraryIndexRoute = Route$1.update({
	id: "/library/",
	path: "/library/",
	getParentRoute: () => Route$7
});
var LessonsIndexRoute = Route.update({
	id: "/lessons/",
	path: "/lessons/",
	getParentRoute: () => Route$7
});
var TestsTopicRoute = Route$10.update({
	id: "/tests/$topic",
	path: "/tests/$topic",
	getParentRoute: () => Route$7
});
var LibraryIdRoute = Route$9.update({
	id: "/library/$id",
	path: "/library/$id",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	FormulasRoute,
	GraphicsRoute,
	SitemapDotxmlRoute,
	LessonsIdRoute: Route$8.update({
		id: "/lessons/$id",
		path: "/lessons/$id",
		getParentRoute: () => Route$7
	}),
	LibraryIdRoute,
	TestsTopicRoute,
	LessonsIndexRoute,
	LibraryIndexRoute,
	TestsIndexRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
