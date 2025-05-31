import type { Route } from "./+types/home";
import Register from "~/modules/register";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "registration" },
        { name: "description", content: "Registration to the todo list" },
    ];
}

export default function Home() {
    return <Register />;
}
