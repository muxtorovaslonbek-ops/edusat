import { A as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as topicById } from "./topics-B_GhMlnW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library._id-D7HfFwnv.js
var $$splitComponentImporter = () => import("./library._id-BzPmIWST.mjs");
var $$splitErrorComponentImporter = () => import("./library._id-CA3tZA5r.mjs");
var $$splitNotFoundComponentImporter = () => import("./library._id-ZXQhDACQ.mjs");
var Route = createFileRoute("/library/$id")({
	loader: ({ params }) => {
		const t = topicById(params.id);
		if (!t) throw notFound();
		return { topic: t };
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.topic.title} — MathHub` },
		{
			name: "description",
			content: loaderData.topic.short
		},
		{
			property: "og:title",
			content: `${loaderData.topic.title} — MathHub`
		},
		{
			property: "og:description",
			content: loaderData.topic.short
		}
	] : [] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
