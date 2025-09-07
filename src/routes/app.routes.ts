import type { Router } from "express";

import { csrfRouter } from "@/routes/csrf.route";

interface RouteConfig {
	path: string;
	router: Router;
}

export const routes: RouteConfig[] = [{ path: "/csrf-token", router: csrfRouter }];
