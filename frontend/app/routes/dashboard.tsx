import type { Route } from "./+types/home";
import Dashboard from "~/modules/dashboard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "dashboard" },
        { name: "description", content: "Manage todo list" },
    ];
}

export default function Home() {
    return <Dashboard />;
}
