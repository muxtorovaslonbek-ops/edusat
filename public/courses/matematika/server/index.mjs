globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-08T19:22:43.459Z",
		"size": 20373,
		"path": "../client/favicon.ico"
	},
	"/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2": {
		"type": "font/woff2",
		"etag": "\"6dac-NElHQ3Nv2nVxl9FvzGpuGnkxfIY\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 28076,
		"path": "../client/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2"
	},
	"/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2": {
		"type": "font/woff2",
		"etag": "\"1b00-W/pJysRs0derE1E4jTfBGvWbphU\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 6912,
		"path": "../client/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2"
	},
	"/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf": {
		"type": "font/ttf",
		"etag": "\"3050-j6tziha6j7fnACoHXwNqRVpFxug\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 12368,
		"path": "../client/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf"
	},
	"/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff": {
		"type": "font/woff",
		"etag": "\"1de8-Gm85vXDJt0cTB431991hCPm604s\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 7656,
		"path": "../client/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff"
	},
	"/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2": {
		"type": "font/woff2",
		"etag": "\"1afc-n4B34LOKKQzZt7E2sKwpyDdegaY\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 6908,
		"path": "../client/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2"
	},
	"/assets/KaTeX_AMS-Regular-DRggAlZN.ttf": {
		"type": "font/ttf",
		"etag": "\"f890-Hf0O5uMPihwjmZ2dll24cAtany4\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 63632,
		"path": "../client/assets/KaTeX_AMS-Regular-DRggAlZN.ttf"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"2d-kbuBgZQOgmUxD/vfS/rlhoLOOOE\"",
		"mtime": "2026-07-08T19:22:43.459Z",
		"size": 45,
		"path": "../client/robots.txt"
	},
	"/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf": {
		"type": "font/ttf",
		"etag": "\"3038-JvJqE+an0KabSPYqzTGoGWvOf24\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 12344,
		"path": "../client/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf"
	},
	"/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf": {
		"type": "font/ttf",
		"etag": "\"4c80-TgjdADgxJOfNlpcMyw++NcnvqqM\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 19584,
		"path": "../client/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf"
	},
	"/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff": {
		"type": "font/woff",
		"etag": "\"33f0-W7r9UB8mIhlCavfyDBEDu0tzJZI\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 13296,
		"path": "../client/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff"
	},
	"/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2": {
		"type": "font/woff2",
		"etag": "\"2c54-+Y+JJy7KEa5BdnLFmg+qaoiAWok\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 11348,
		"path": "../client/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2"
	},
	"/assets/KaTeX_Fraktur-Regular-CB_wures.ttf": {
		"type": "font/ttf",
		"etag": "\"4c74-F9tAiC3V8UBiXyjdlMQwReGJPpg\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 19572,
		"path": "../client/assets/KaTeX_Fraktur-Regular-CB_wures.ttf"
	},
	"/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2": {
		"type": "font/woff2",
		"etag": "\"2c34-pXZMbieE0CggwLkECJ8/rHmL5Po\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 11316,
		"path": "../client/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2"
	},
	"/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff": {
		"type": "font/woff",
		"etag": "\"3398-b3VjdjYPCBW0SGL1f3let8HNTbI\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 13208,
		"path": "../client/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff"
	},
	"/assets/KaTeX_Main-Bold-Cx986IdX.woff2": {
		"type": "font/woff2",
		"etag": "\"62ec-MQUKGxsSP7LFnK0fdLff+Q3rj84\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 25324,
		"path": "../client/assets/KaTeX_Main-Bold-Cx986IdX.woff2"
	},
	"/assets/KaTeX_Main-Bold-Jm3AIy58.woff": {
		"type": "font/woff",
		"etag": "\"74d8-9po2JQ6ubooCFzqZCapihCi6IGA\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 29912,
		"path": "../client/assets/KaTeX_Main-Bold-Jm3AIy58.woff"
	},
	"/assets/KaTeX_Main-Bold-waoOVXN0.ttf": {
		"type": "font/ttf",
		"etag": "\"c888-QTqz3D/DpXUidbriyuZ+tY8rMvA\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 51336,
		"path": "../client/assets/KaTeX_Main-Bold-waoOVXN0.ttf"
	},
	"/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf": {
		"type": "font/ttf",
		"etag": "\"80c8-umRk5EL9UK73Z4kkug8tlYHruwc\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 32968,
		"path": "../client/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf"
	},
	"/assets/KaTeX_Main-Italic-BMLOBm91.woff": {
		"type": "font/woff",
		"etag": "\"4cdc-fIWJITvHAD4sIzS1HKQVKFiYer0\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 19676,
		"path": "../client/assets/KaTeX_Main-Italic-BMLOBm91.woff"
	},
	"/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2": {
		"type": "font/woff2",
		"etag": "\"418c-pKSQW4sSb5/9VT0hpyoMJOlIA0U\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 16780,
		"path": "../client/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2"
	},
	"/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff": {
		"type": "font/woff",
		"etag": "\"4bd4-A4u9yIh6lzCtlBR/xXxv9N+0hBE\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 19412,
		"path": "../client/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff"
	},
	"/assets/KaTeX_Main-Italic-3WenGoN9.ttf": {
		"type": "font/ttf",
		"etag": "\"832c-HVZoorlK59vu/dfNaNmP6dWCXgc\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 33580,
		"path": "../client/assets/KaTeX_Main-Italic-3WenGoN9.ttf"
	},
	"/assets/KaTeX_AMS-Regular-DMm9YOAa.woff": {
		"type": "font/woff",
		"etag": "\"82ec-ma2i3jIA55UUPWOSMsNESwgBgjU\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 33516,
		"path": "../client/assets/KaTeX_AMS-Regular-DMm9YOAa.woff"
	},
	"/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff": {
		"type": "font/woff",
		"etag": "\"1e24-3SOsD7CsRpsGJEhep41wD2NhQgM\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 7716,
		"path": "../client/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff"
	},
	"/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2": {
		"type": "font/woff2",
		"etag": "\"425c-ybK1/9LyeqXGtvm6QaeytOZhAtM\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 16988,
		"path": "../client/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2"
	},
	"/assets/KaTeX_Main-Regular-Dr94JaBh.woff": {
		"type": "font/woff",
		"etag": "\"7834-/crlS6HUY17oWlRizByX5SHP1RU\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 30772,
		"path": "../client/assets/KaTeX_Main-Regular-Dr94JaBh.woff"
	},
	"/assets/KaTeX_Main-Regular-B22Nviop.woff2": {
		"type": "font/woff2",
		"etag": "\"66a0-yIQIbCXOyFWBYLICb5Bu99o1cKw\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 26272,
		"path": "../client/assets/KaTeX_Main-Regular-B22Nviop.woff2"
	},
	"/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf": {
		"type": "font/ttf",
		"etag": "\"79dc-6AzEwjLSB192KlLUa+tP+9N6Xxo\"",
		"mtime": "2026-07-08T19:22:42.627Z",
		"size": 31196,
		"path": "../client/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf"
	},
	"/assets/KaTeX_Main-Regular-ypZvNtVU.ttf": {
		"type": "font/ttf",
		"etag": "\"d14c-h0TbbvjDCePchfG76YBSCti3v9Q\"",
		"mtime": "2026-07-08T19:22:42.627Z",
		"size": 53580,
		"path": "../client/assets/KaTeX_Main-Regular-ypZvNtVU.ttf"
	},
	"/assets/KaTeX_Math-Italic-DA0__PXp.woff": {
		"type": "font/woff",
		"etag": "\"493c-HBtIc54ctL4T3djAvCed3oUb26A\"",
		"mtime": "2026-07-08T19:22:42.627Z",
		"size": 18748,
		"path": "../client/assets/KaTeX_Math-Italic-DA0__PXp.woff"
	},
	"/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2": {
		"type": "font/woff2",
		"etag": "\"4010-j8udLeZaxxoMT92YYXPbcwWS7Yo\"",
		"mtime": "2026-07-08T19:22:42.627Z",
		"size": 16400,
		"path": "../client/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2"
	},
	"/assets/KaTeX_Math-Italic-flOr_0UB.ttf": {
		"type": "font/ttf",
		"etag": "\"7a4c-npoQ2Ppa2Iyez6SQKt3U2SWAsrw\"",
		"mtime": "2026-07-08T19:22:42.627Z",
		"size": 31308,
		"path": "../client/assets/KaTeX_Math-Italic-flOr_0UB.ttf"
	},
	"/assets/KaTeX_Math-Italic-t53AETM-.woff2": {
		"type": "font/woff2",
		"etag": "\"4038-20iD0M/5XstcA0EOMoOnN8Ue1gQ\"",
		"mtime": "2026-07-08T19:22:42.627Z",
		"size": 16440,
		"path": "../client/assets/KaTeX_Math-Italic-t53AETM-.woff2"
	},
	"/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff": {
		"type": "font/woff",
		"etag": "\"48ec-1U5kgNbUBGxqVhmqODuqWXH7igw\"",
		"mtime": "2026-07-08T19:22:42.627Z",
		"size": 18668,
		"path": "../client/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff"
	},
	"/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf": {
		"type": "font/ttf",
		"etag": "\"5fb8-ILRfU0a2htUsRFdFOT0XB7uI7B0\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 24504,
		"path": "../client/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf"
	},
	"/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2": {
		"type": "font/woff2",
		"etag": "\"2fb8-iG5heXpSXUqvzgqvV0FP366huHM\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 12216,
		"path": "../client/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2"
	},
	"/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff": {
		"type": "font/woff",
		"etag": "\"3848-or7dyKPU0IAo1wd3btvU0k8uwPw\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 14408,
		"path": "../client/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff"
	},
	"/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff": {
		"type": "font/woff",
		"etag": "\"3720-dWSjZrdv2DcEHCS+70xVgKWt1A4\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 14112,
		"path": "../client/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff"
	},
	"/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf": {
		"type": "font/ttf",
		"etag": "\"575c-mR+9wDFouxSkRHz6PlFfCabs/tw\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 22364,
		"path": "../client/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf"
	},
	"/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2": {
		"type": "font/woff2",
		"etag": "\"2efc-PV+jyzCfjYO03L3SdyXycPYPPus\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 12028,
		"path": "../client/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2"
	},
	"/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf": {
		"type": "font/ttf",
		"etag": "\"4bec-So4XoMtYqCKN1EF/vRuJnkHasEU\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 19436,
		"path": "../client/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf"
	},
	"/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2": {
		"type": "font/woff2",
		"etag": "\"2868-5F1fT0p/L/PcqfzMLxSOeB4j8pI\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 10344,
		"path": "../client/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2"
	},
	"/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff": {
		"type": "font/woff",
		"etag": "\"301c-gEYQ9MsuLq2WlLjaLshOzo0Jw40\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 12316,
		"path": "../client/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff"
	},
	"/assets/KaTeX_Script-Regular-C5JkGWo-.ttf": {
		"type": "font/ttf",
		"etag": "\"4108-xvZ12oGtKcvySyz3cPeVtNosZI4\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 16648,
		"path": "../client/assets/KaTeX_Script-Regular-C5JkGWo-.ttf"
	},
	"/assets/KaTeX_Script-Regular-D3wIWfF6.woff2": {
		"type": "font/woff2",
		"etag": "\"25ac-Y7gJWfH8Voma4hugy7zTmmywg5A\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 9644,
		"path": "../client/assets/KaTeX_Script-Regular-D3wIWfF6.woff2"
	},
	"/assets/KaTeX_Script-Regular-D5yQViql.woff": {
		"type": "font/woff",
		"etag": "\"295c-agXNyk8fcIXmB9w4vt71V1P4b9g\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 10588,
		"path": "../client/assets/KaTeX_Script-Regular-D5yQViql.woff"
	},
	"/assets/KaTeX_Size1-Regular-C195tn64.woff": {
		"type": "font/woff",
		"etag": "\"1960-rv5mdKVlM2J8c5zXiWOY8USH4Bw\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 6496,
		"path": "../client/assets/KaTeX_Size1-Regular-C195tn64.woff"
	},
	"/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf": {
		"type": "font/ttf",
		"etag": "\"2fc4-MoC6y8sSRZcf4BAXtHTHbDN8EMk\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 12228,
		"path": "../client/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf"
	},
	"/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2": {
		"type": "font/woff2",
		"etag": "\"155c-V/pZmXShvAs31fDlzIYCMC8CtXM\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 5468,
		"path": "../client/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2"
	},
	"/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf": {
		"type": "font/ttf",
		"etag": "\"2cf4-+vc/8+eVGE5UMWZv+v64qg4og00\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 11508,
		"path": "../client/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf"
	},
	"/assets/KaTeX_Size2-Regular-oD1tc_U0.woff": {
		"type": "font/woff",
		"etag": "\"182c-RmmP8YGb0ngm/V0txLpOH2PKzfQ\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 6188,
		"path": "../client/assets/KaTeX_Size2-Regular-oD1tc_U0.woff"
	},
	"/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2": {
		"type": "font/woff2",
		"etag": "\"1458-7hhxNjSjvoyZcnaAhVKrGVpZj0M\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 5208,
		"path": "../client/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2"
	},
	"/assets/KaTeX_Size4-Regular-BF-4gkZK.woff": {
		"type": "font/woff",
		"etag": "\"175c-j93bg1E+wiYjHr7gUHnsRfwBNXg\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 5980,
		"path": "../client/assets/KaTeX_Size4-Regular-BF-4gkZK.woff"
	},
	"/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf": {
		"type": "font/ttf",
		"etag": "\"1da4-MCphsuzfgtOeZ4D0K9B+5M5nuNU\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 7588,
		"path": "../client/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf"
	},
	"/assets/KaTeX_Size4-Regular-DWFBv043.ttf": {
		"type": "font/ttf",
		"etag": "\"287c-PY2d1YoDt6RtSX9XYeYNi4RKUZk\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 10364,
		"path": "../client/assets/KaTeX_Size4-Regular-DWFBv043.ttf"
	},
	"/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf": {
		"type": "font/ttf",
		"etag": "\"6ba4-YpuZ+vGNl1KfIaGxAYCT5gvNBY8\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 27556,
		"path": "../client/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf"
	},
	"/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2": {
		"type": "font/woff2",
		"etag": "\"1340-m+0X+5LyZQUB4imGLEDGQH4cVSg\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 4928,
		"path": "../client/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2"
	},
	"/assets/formulas-COfPQ7Nt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3536-U5L9wLTQ6l6pfrNqqJz9t5P1ukc\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 13622,
		"path": "../client/assets/formulas-COfPQ7Nt.js"
	},
	"/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff": {
		"type": "font/woff",
		"etag": "\"3e9c-9ecp+k/0ZvwH4MerGXmtcMRfpdU\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 16028,
		"path": "../client/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff"
	},
	"/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2": {
		"type": "font/woff2",
		"etag": "\"3500-egiIP//GlYxxzAGnWguZzKPktHU\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 13568,
		"path": "../client/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2"
	},
	"/assets/KaTeX_Size3-Regular-CTq5MqoE.woff": {
		"type": "font/woff",
		"etag": "\"1144-HaGQWm0dm8q5KwWd9ytSjepwi8s\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 4420,
		"path": "../client/assets/KaTeX_Size3-Regular-CTq5MqoE.woff"
	},
	"/assets/Tex-BYzcZSEz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ef4d-oHUUf2y4GmRBwaHSBV+83Eomzz0\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 257869,
		"path": "../client/assets/Tex-BYzcZSEz.js"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 939,
		"path": "../client/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/library._id-BdD8wqMI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-x21LK+GDxq3eWaJGWcusjjM4aEY\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 295,
		"path": "../client/assets/library._id-BdD8wqMI.js"
	},
	"/assets/lessons.index-Cj-0hG6h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f-XjBur55g9hFs76mLksMToZlyQtI\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 2159,
		"path": "../client/assets/lessons.index-Cj-0hG6h.js"
	},
	"/assets/library._id-CWAVhoq2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd9-VS2EjFVA0d5b8f2IfRRHeU82NEo\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 3033,
		"path": "../client/assets/library._id-CWAVhoq2.js"
	},
	"/assets/library._id-DFZ48JGI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"173-ULS6aGcfCSSDa7iMMWWTdCfkB1s\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 371,
		"path": "../client/assets/library._id-DFZ48JGI.js"
	},
	"/assets/lessons._id-D4uuVSoc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-5RZj6u1tLKpHRvGzDVeToSs8nyY\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 165,
		"path": "../client/assets/lessons._id-D4uuVSoc.js"
	},
	"/assets/library.index-BPJRLB3C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44d-da58lgGesOdzkMd+XF0OyGvnoS4\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 1101,
		"path": "../client/assets/library.index-BPJRLB3C.js"
	},
	"/assets/link-DfXvwZHU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"688f-uEKybG4cDAup3DjUN1xHzIVEhqc\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 26767,
		"path": "../client/assets/link-DfXvwZHU.js"
	},
	"/assets/lessons._id-CFtB9eg8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b7-zjKS+4feWnrCrCXBosmqzEnq02A\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 2231,
		"path": "../client/assets/lessons._id-CFtB9eg8.js"
	},
	"/assets/index-D_K6xt7m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59026-1uFNlBfmHZxLdI0IS9Tcw3FNQjw\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 364582,
		"path": "../client/assets/index-D_K6xt7m.js"
	},
	"/assets/lessons._id-Ds3dc0Kb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134-E5zVvxnhnBxjSCHNZ/V2EeB3hLk\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 308,
		"path": "../client/assets/lessons._id-Ds3dc0Kb.js"
	},
	"/assets/graphics-BJ9AXPEh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a00b1-O9+KKeT7IdMSQ9ho2SwbVXzsQHg\"",
		"mtime": "2026-07-08T19:22:42.625Z",
		"size": 655537,
		"path": "../client/assets/graphics-BJ9AXPEh.js"
	},
	"/assets/react-vt4WmSOl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-BPOYGZcDqVQtRgdRj1RwUcWBJwU\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 7527,
		"path": "../client/assets/react-vt4WmSOl.js"
	},
	"/assets/tests._topic-D4uuVSoc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-5RZj6u1tLKpHRvGzDVeToSs8nyY\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 165,
		"path": "../client/assets/tests._topic-D4uuVSoc.js"
	},
	"/assets/tests._topic-CkoGJErN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-HIIUPyF9PK/dj8DY5zmvKQP+UKQ\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 2306,
		"path": "../client/assets/tests._topic-CkoGJErN.js"
	},
	"/assets/tests.index-Bq2awd_f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"510-8J9qySMRVBL7vuYMfS7j7cAT9bA\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 1296,
		"path": "../client/assets/tests.index-Bq2awd_f.js"
	},
	"/assets/tests._topic-Dxc-0L32.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-/e9MXXda3UDBubr0xQdH3XeU2u4\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 306,
		"path": "../client/assets/tests._topic-Dxc-0L32.js"
	},
	"/assets/styles-Bk8yr-gJ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1b8fa-mhVXLUTDd3dwz4HgXWxEIzErkyc\"",
		"mtime": "2026-07-08T19:22:42.628Z",
		"size": 112890,
		"path": "../client/assets/styles-Bk8yr-gJ.css"
	},
	"/assets/routes-DsebR0Fr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1565-6at21Phd4PHeeayGgo54TBCGYnQ\"",
		"mtime": "2026-07-08T19:22:42.626Z",
		"size": 5477,
		"path": "../client/assets/routes-DsebR0Fr.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_AaNQMb = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_AaNQMb
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
