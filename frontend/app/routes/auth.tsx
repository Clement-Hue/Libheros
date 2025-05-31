import type { Route } from "./+types/home";
import Auth from "~/modules/auth";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "authentication" },
        { name: "description", content: "Authentication to the todo list" },
    ];
}

export default function Home() {
    return <Auth />;
}
