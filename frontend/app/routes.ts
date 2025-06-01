import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    layout("layouts/auth.tsx", [
        index("routes/auth.tsx"),
        route("register", "routes/register.tsx"),
    ]),
    route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
