import { IHTTPMethods, Router } from "itty-router";
import { HttpException } from "src/exceptions";
import { indexHandlers, mealHandlers } from "./handlers";

const initializeRoutes = (router: Router<Request, IHTTPMethods>) => {
	router.get("/", indexHandlers.getIndex);
	router.get("/meals/:schoolName?", mealHandlers.getMeal);
	router.all("*", () => {
		throw new HttpException(404, "요청하신 데이터를 찾을 수 없어요");
	});
};

const handlerError = (error: HttpException): Response => {
	const { status = 500, message = "일시적인 오류가 발생했어요" } = error;
	return new Response(JSON.stringify({ status, message }), { status });
};

addEventListener("fetch", (event: FetchEvent) => {
	const router = Router<Request, IHTTPMethods>();
	initializeRoutes(router);

	event.respondWith(router.handle(event.request).catch(handlerError));
});
