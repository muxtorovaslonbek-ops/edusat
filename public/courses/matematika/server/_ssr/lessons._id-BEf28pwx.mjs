import { t as lessonById } from "./lessons-B9ixdxHm.mjs";
import { A as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons._id-BEf28pwx.js
var $$splitComponentImporter = () => import("./lessons._id-DEKDGURE.mjs");
var $$splitErrorComponentImporter = () => import("./lessons._id-Bt5vHTGu.mjs");
var $$splitNotFoundComponentImporter = () => import("./lessons._id-m9Iy1SUC.mjs");
var Route = createFileRoute("/lessons/$id")({
	loader: ({ params }) => {
		const l = lessonById(params.id);
		if (!l) throw notFound();
		return { lesson: l };
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.lesson.title} — Darslar — MathHub` },
		{
			name: "description",
			content: loaderData.lesson.intro.slice(0, 155)
		},
		{
			property: "og:title",
			content: `${loaderData.lesson.title} — MathHub`
		},
		{
			property: "og:description",
			content: loaderData.lesson.intro.slice(0, 155)
		}
	] : [{ title: "Dars topilmadi — MathHub" }, {
		name: "robots",
		content: "noindex"
	}] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
