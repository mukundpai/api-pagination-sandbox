import type { MetaFunction } from "@remix-run/node";
import DemoPage from "./page";

export const meta: MetaFunction = () => {
  return [
    { title: "Random Content" },
    { name: "description", content: "Sandbox with Random Bad Responses and Pagination" },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <DemoPage />
    </div>
  );
}
