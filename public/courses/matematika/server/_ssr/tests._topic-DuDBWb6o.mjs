import { A as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as testByTopic } from "./tests-wbLTuZ5M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tests._topic-DuDBWb6o.js
var $$splitComponentImporter = () => import("./tests._topic-CRTI9IbX.mjs");
var $$splitErrorComponentImporter = () => import("./tests._topic-DhkFnUV4.mjs");
var $$splitNotFoundComponentImporter = () => import("./tests._topic-B9vMbn_D.mjs");
var Route = createFileRoute("/tests/$topic")({
	loader: ({ params }) => {
		const t = testByTopic(params.topic);
		if (!t) throw notFound();
		return { test: t };
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `Test: ${loaderData.test.title} — MathHub` }, {
		name: "description",
		content: `${loaderData.test.title} — ${loaderData.test.questions.length} savol.`
	}] : [] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
